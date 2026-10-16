/**
 * NEO GAME CAFE & LOUNGE — Production-Hardened HTTP Static Server
 * Features:
 * - Anti-path-traversal jail security
 * - Robust HTTP 206 Partial Content Range streaming with bounds validation
 * - Uncaught exception & unhandled rejection crash prevention
 * - Stream lifecycle error management & client abort cleanup
 * - Modern security headers (nosniff, SAMEORIGIN, Referrer-Policy, CORS)
 * - Safe MIME mapping and static caching policies
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3456;
const ROOT_DIR = path.resolve(__dirname);

// Crash prevention hooks
process.on('uncaughtException', (err) => {
  console.error('[CRITICAL] Uncaught exception caught by guard:', err.message);
});

process.on('unhandledRejection', (reason) => {
  console.error('[CRITICAL] Unhandled promise rejection caught by guard:', reason);
});

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.txt': 'text/plain; charset=utf-8'
};

const server = http.createServer((req, res) => {
  // Error handling on request & response
  req.on('error', (err) => {
    console.warn('[HTTP] Request stream error:', err.message);
  });
  res.on('error', (err) => {
    console.warn('[HTTP] Response stream error:', err.message);
  });

  // Only allow GET and HEAD methods for static file serving
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.writeHead(405, {
      'Content-Type': 'text/plain',
      'Allow': 'GET, HEAD',
      'X-Content-Type-Options': 'nosniff'
    });
    return res.end('405 Method Not Allowed');
  }

  // 1. Safe Path Parsing & Traversal Protection
  let cleanPath = '';
  try {
    cleanPath = decodeURIComponent(req.url.split('?')[0]);
  } catch (e) {
    res.writeHead(400, { 'Content-Type': 'text/plain', 'X-Content-Type-Options': 'nosniff' });
    return res.end('400 Bad Request: Malformed URI');
  }

  if (cleanPath === '/' || cleanPath === '') {
    cleanPath = '/index.html';
  }

  // Resolve and strictly verify that targetPath is contained within ROOT_DIR
  const targetPath = path.resolve(ROOT_DIR, '.' + cleanPath);
  if (!targetPath.startsWith(ROOT_DIR)) {
    res.writeHead(403, { 'Content-Type': 'text/plain', 'X-Content-Type-Options': 'nosniff' });
    return res.end('403 Forbidden: Access Denied');
  }

  // 2. Stat file safely
  fs.stat(targetPath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, {
        'Content-Type': 'text/plain; charset=utf-8',
        'X-Content-Type-Options': 'nosniff'
      });
      return res.end('404 Not Found');
    }

    const ext = path.extname(targetPath).toLowerCase();
    const contentType = MIME[ext] || 'application/octet-stream';

    // Base Security Headers
    const headers = {
      'Content-Type': contentType,
      'Accept-Ranges': 'bytes',
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'SAMEORIGIN',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Access-Control-Allow-Origin': '*'
    };

    // Cache Control Policy
    if (ext === '.html') {
      headers['Cache-Control'] = 'no-cache, must-revalidate';
    } else {
      headers['Cache-Control'] = 'public, max-age=86400';
    }

    // If HEAD request, return headers only
    if (req.method === 'HEAD') {
      headers['Content-Length'] = stats.size;
      res.writeHead(200, headers);
      return res.end();
    }

    // 3. HTTP 206 Partial Content Range Streaming for Media
    const range = req.headers.range;
    if (range && (ext === '.mp4' || ext === '.webm')) {
      const match = range.match(/bytes=(\d*)-(\d*)/);
      if (!match) {
        res.writeHead(416, {
          'Content-Range': `bytes */${stats.size}`,
          'Content-Type': 'text/plain; charset=utf-8',
          'X-Content-Type-Options': 'nosniff'
        });
        return res.end('416 Range Not Satisfiable');
      }

      let start = match[1] ? parseInt(match[1], 10) : 0;
      let end = match[2] ? parseInt(match[2], 10) : stats.size - 1;

      // Validate bounds
      if (isNaN(start) || isNaN(end) || start > end || start >= stats.size || start < 0) {
        res.writeHead(416, {
          'Content-Range': `bytes */${stats.size}`,
          'Content-Type': 'text/plain; charset=utf-8',
          'X-Content-Type-Options': 'nosniff'
        });
        return res.end('416 Range Not Satisfiable');
      }

      if (end >= stats.size) end = stats.size - 1;
      const chunkSize = (end - start) + 1;

      headers['Content-Range'] = `bytes ${start}-${end}/${stats.size}`;
      headers['Content-Length'] = chunkSize;

      res.writeHead(206, headers);

      const fileStream = fs.createReadStream(targetPath, { start, end });
      fileStream.on('error', (streamErr) => {
        console.warn('[HTTP Stream Range Error]:', streamErr.message);
        if (!res.headersSent) {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('500 Internal Server Error');
        } else {
          res.destroy();
        }
      });

      // Cleanup if client disconnects early
      req.on('close', () => {
        fileStream.destroy();
      });

      fileStream.pipe(res);
    } else {
      // 4. Standard 200 OK delivery
      headers['Content-Length'] = stats.size;
      res.writeHead(200, headers);

      const fileStream = fs.createReadStream(targetPath);
      fileStream.on('error', (streamErr) => {
        console.warn('[HTTP Stream Error]:', streamErr.message);
        if (!res.headersSent) {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('500 Internal Server Error');
        } else {
          res.destroy();
        }
      });

      req.on('close', () => {
        fileStream.destroy();
      });

      fileStream.pipe(res);
    }
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`[SECURE SERVER] Listening on http://0.0.0.0:${PORT} (Local: http://127.0.0.1:${PORT})`);
});
