const { spawn } = require('child_process');
const fs = require('fs');

console.log('Starting Cloudflare Tunnel...');
const proc = spawn('npx', ['--yes', 'cloudflared', 'tunnel', '--url', 'http://127.0.0.1:3456'], { shell: true });

function handleOutput(data) {
  const str = data.toString();
  const m = str.match(/https:\/\/[a-z0-9-]+\.trycloudflare\.com/i);
  if (m) {
    console.log('CLOUDFLARE_URL=' + m[0]);
    fs.writeFileSync('cf-url.txt', m[0]);
  }
}

proc.stdout.on('data', handleOutput);
proc.stderr.on('data', handleOutput);

proc.on('close', (code) => {
  console.log('Cloudflared process exited with code ' + code);
});
