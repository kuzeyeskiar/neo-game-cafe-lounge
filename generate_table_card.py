import os
from PIL import Image, ImageDraw, ImageFont

WIN_FONTS = os.path.join(os.environ.get('WINDIR', 'C:\\Windows'), 'Fonts')
FONT_BRAND = ImageFont.truetype(os.path.join(WIN_FONTS, 'segoeuib.ttf'), 50)
FONT_INDEX = ImageFont.truetype(os.path.join(WIN_FONTS, 'consola.ttf'), 20)
FONT_LOCATION = ImageFont.truetype(os.path.join(WIN_FONTS, 'consola.ttf'), 18)

FONT_QR_CTA = ImageFont.truetype(os.path.join(WIN_FONTS, 'segoeuib.ttf'), 26)
FONT_QR_SUB = ImageFont.truetype(os.path.join(WIN_FONTS, 'consola.ttf'), 17)
FONT_QR_URL = ImageFont.truetype(os.path.join(WIN_FONTS, 'consola.ttf'), 22)

FONT_OFFER_TAG = ImageFont.truetype(os.path.join(WIN_FONTS, 'segoeuib.ttf'), 22)
FONT_OFFER_PRE = ImageFont.truetype(os.path.join(WIN_FONTS, 'segoeuib.ttf'), 28)
FONT_OFFER_MAIN = ImageFont.truetype(os.path.join(WIN_FONTS, 'segoeuib.ttf'), 38)
FONT_OFFER_FREE = ImageFont.truetype(os.path.join(WIN_FONTS, 'segoeuib.ttf'), 42)
FONT_OFFER_NOTE = ImageFont.truetype(os.path.join(WIN_FONTS, 'segoeui.ttf'), 20)

FONT_TICKER = ImageFont.truetype(os.path.join(WIN_FONTS, 'consola.ttf'), 20)
FONT_FOOTER_WIFI = ImageFont.truetype(os.path.join(WIN_FONTS, 'segoeuib.ttf'), 22)
FONT_FOOTER_ADDR = ImageFont.truetype(os.path.join(WIN_FONTS, 'segoeui.ttf'), 20)
FONT_FOOTER_CONTACT = ImageFont.truetype(os.path.join(WIN_FONTS, 'segoeuib.ttf'), 28)

WIDTH = 1240
HEIGHT = 1748

def draw_crop_marks(draw, m=50):
    # Standard print crop marks at corners
    c_len = 30
    c_col = '#666666'
    # Top-Left
    draw.line([(m - 15, m), (m - 15 - c_len, m)], fill=c_col, width=1)
    draw.line([(m, m - 15), (m, m - 15 - c_len)], fill=c_col, width=1)
    # Top-Right
    draw.line([(WIDTH - m + 15, m), (WIDTH - m + 15 + c_len, m)], fill=c_col, width=1)
    draw.line([(WIDTH - m, m - 15), (WIDTH - m, m - 15 - c_len)], fill=c_col, width=1)
    # Bottom-Left
    draw.line([(m - 15, HEIGHT - m), (m - 15 - c_len, HEIGHT - m)], fill=c_col, width=1)
    draw.line([(m, HEIGHT - m + 15), (m, HEIGHT - m + 15 + c_len)], fill=c_col, width=1)
    # Bottom-Right
    draw.line([(WIDTH - m + 15, HEIGHT - m), (WIDTH - m + 15 + c_len, HEIGHT - m)], fill=c_col, width=1)
    draw.line([(WIDTH - m, HEIGHT - m + 15), (WIDTH - m, HEIGHT - m + 15 + c_len)], fill=c_col, width=1)

def create_dark_card():
    img = Image.new('RGB', (WIDTH, HEIGHT), color='#111111')
    draw = ImageDraw.Draw(img)

    margin = 55
    draw_crop_marks(draw, margin)

    # Outer Decorative Frame
    draw.rectangle([margin, margin, WIDTH - margin, HEIGHT - margin], outline='#2A2A2A', width=2)
    draw.rectangle([margin + 8, margin + 8, WIDTH - margin - 8, HEIGHT - margin - 8], outline='#1A1A1A', width=1)

    # Red Geometric Corner Brackets
    b_len = 32
    b_col = '#AA0001'
    b_w = 4
    draw.line([(margin, margin), (margin + b_len, margin)], fill=b_col, width=b_w)
    draw.line([(margin, margin), (margin, margin + b_len)], fill=b_col, width=b_w)
    draw.line([(WIDTH - margin, margin), (WIDTH - margin - b_len, margin)], fill=b_col, width=b_w)
    draw.line([(WIDTH - margin, margin), (WIDTH - margin, margin + b_len)], fill=b_col, width=b_w)
    draw.line([(margin, HEIGHT - margin), (margin + b_len, HEIGHT - margin)], fill=b_col, width=b_w)
    draw.line([(margin, HEIGHT - margin), (margin, HEIGHT - margin - b_len)], fill=b_col, width=b_w)
    draw.line([(WIDTH - margin, HEIGHT - margin), (WIDTH - margin - b_len, HEIGHT - margin)], fill=b_col, width=b_w)
    draw.line([(WIDTH - margin, HEIGHT - margin), (WIDTH - margin, HEIGHT - margin - b_len)], fill=b_col, width=b_w)

    # 1. Header Section
    y = 85
    draw.text((WIDTH // 2, y), "[000 // SOCIAL LOUNGE & ESPORTS ARENA]", font=FONT_INDEX, fill='#AA0001', anchor='mt')
    y += 38
    draw.text((WIDTH // 2, y), "NEO GAME CAFE & LOUNGE", font=FONT_BRAND, fill='#FFFFFF', anchor='mt')
    y += 62
    draw.text((WIDTH // 2, y), "BEYLİKDÜZÜ / İSTANBUL", font=FONT_LOCATION, fill='#888888', anchor='mt')
    y += 32

    # Red accent center line
    draw.line([(WIDTH // 2 - 180, y), (WIDTH // 2 + 180, y)], fill='#AA0001', width=3)
    y += 38

    # 2. QR Code Stage (White card with generous padding)
    qr_box_w = 580
    qr_box_h = 610
    qr_x0 = (WIDTH - qr_box_w) // 2
    qr_y0 = y
    qr_x1 = qr_x0 + qr_box_w
    qr_y1 = qr_y0 + qr_box_h

    # Card border with red accent
    draw.rectangle([qr_x0 - 5, qr_y0 - 5, qr_x1 + 5, qr_y1 + 5], outline='#AA0001', width=2)
    draw.rectangle([qr_x0, qr_y0, qr_x1, qr_y1], fill='#FFFFFF')

    # Load high-res QR code
    qr_img = Image.open('assets/images/qr-menu-print-hires.png').convert('RGBA')
    qr_size = 430
    qr_img = qr_img.resize((qr_size, qr_size), Image.Resampling.LANCZOS)
    img.paste(qr_img, ((WIDTH - qr_size) // 2, qr_y0 + 20), qr_img)

    # Text inside white QR card
    draw.text((WIDTH // 2, qr_y0 + 465), "KAMERANIZLA OKUTUN", font=FONT_QR_CTA, fill='#111111', anchor='mt')
    draw.text((WIDTH // 2, qr_y0 + 505), "DİJİTAL MENÜ & KAFE BAR", font=FONT_QR_SUB, fill='#AA0001', anchor='mt')
    draw.text((WIDTH // 2, qr_y0 + 540), "beylikduzugamecafe.com.tr", font=FONT_QR_URL, fill='#333333', anchor='mt')

    y = qr_y1 + 45

    # 3. Campaign Feature Box
    box_w = WIDTH - 170
    box_h = 265
    box_x0 = (WIDTH - box_w) // 2
    box_y0 = y
    box_x1 = box_x0 + box_w
    box_y1 = box_y0 + box_h

    # Crimson-tinted background card
    draw.rectangle([box_x0, box_y0, box_x1, box_y1], fill='#1E0E0E', outline='#AA0001', width=2)
    # Header badge on box border
    tag_w = 320
    draw.rectangle([(WIDTH - tag_w) // 2, box_y0 - 18, (WIDTH + tag_w) // 2, box_y0 + 18], fill='#AA0001')
    draw.text((WIDTH // 2, box_y0), "[ MASAYA ÜCRETSİZ İKRAM ]", font=FONT_OFFER_TAG, fill='#FFFFFF', anchor='mm')

    # Offer texts inside box
    draw.text((WIDTH // 2, box_y0 + 42), "2 SAAT OYUN OYNAYANA", font=FONT_OFFER_PRE, fill='#F59E0B', anchor='mt')
    draw.text((WIDTH // 2, box_y0 + 82), "PATLAMIŞ MISIR & KOLA", font=FONT_OFFER_MAIN, fill='#FFFFFF', anchor='mt')
    draw.text((WIDTH // 2, box_y0 + 135), "TAMAMEN ÜCRETSİZ!", font=FONT_OFFER_FREE, fill='#AA0001', anchor='mt')
    draw.text((WIDTH // 2, box_y0 + 200), "PlayStation veya masa oyunlarında geçerlidir", font=FONT_OFFER_NOTE, fill='#999999', anchor='mt')

    # Place transparent popcorn & cola icons
    try:
        pop = Image.open('assets/images/menu/popcorn.png').convert('RGBA')
        pop_w = 125
        pop_h = int(pop_w * pop.size[1] / pop.size[0])
        pop = pop.resize((pop_w, pop_h), Image.Resampling.LANCZOS)
        img.paste(pop, (box_x0 + 25, box_y0 + 65), pop)

        cola = Image.open('assets/images/menu/coca-cola.png').convert('RGBA')
        cola_w = 85
        cola_h = int(cola_w * cola.size[1] / cola.size[0])
        cola = cola.resize((cola_w, cola_h), Image.Resampling.LANCZOS)
        img.paste(cola, (box_x1 - 110, box_y0 + 80), cola)
    except Exception as e:
        print("Icon paste error:", e)

    y = box_y1 + 40

    # 4. Service Features Badges
    badges = ["[ PS5 VIP LOCALAR ]", "[ BİLARDO SALONU ]", "[ KUTU OYUNLARI ]", "[ ARTİSAN KAFE ]"]
    draw.text((WIDTH // 2, y), "   •   ".join(badges), font=FONT_TICKER, fill='#D1D5DB', anchor='mt')
    y += 45

    draw.line([(margin + 50, y), (WIDTH - margin - 50, y)], fill='#2A2A2A', width=1)
    y += 25

    # 5. Footer Credentials
    draw.text((WIDTH // 2, y), "Wi-Fi: NEO-GAME-LOUNGE   |   Şifre: Masadaki Görevliye Sorunuz", font=FONT_FOOTER_WIFI, fill='#E5E5E5', anchor='mt')
    y += 35
    draw.text((WIDTH // 2, y), "Barış Mah. Samsun Cad. Kır Sk. Prestij Konak Apt. No: 21 Dükkan: 8, Beylikdüzü", font=FONT_FOOTER_ADDR, fill='#888888', anchor='mt')
    y += 32
    draw.text((WIDTH // 2, y), "TEL: 0531 586 99 66    •    INSTAGRAM: @neogamecafe", font=FONT_FOOTER_CONTACT, fill='#FFFFFF', anchor='mt')

    out_png = 'print_card_a6_dark_300dpi.png'
    img.save(out_png, 'PNG', dpi=(300, 300))
    print(f"Saved: {out_png}")

def create_light_card():
    img = Image.new('RGB', (WIDTH, HEIGHT), color='#FFFFFF')
    draw = ImageDraw.Draw(img)

    margin = 55
    draw_crop_marks(draw, margin)

    draw.rectangle([margin, margin, WIDTH - margin, HEIGHT - margin], outline='#D1D5DB', width=2)
    draw.rectangle([margin + 8, margin + 8, WIDTH - margin - 8, HEIGHT - margin - 8], outline='#F3F4F6', width=1)

    b_len = 32
    b_col = '#AA0001'
    b_w = 4
    draw.line([(margin, margin), (margin + b_len, margin)], fill=b_col, width=b_w)
    draw.line([(margin, margin), (margin, margin + b_len)], fill=b_col, width=b_w)
    draw.line([(WIDTH - margin, margin), (WIDTH - margin - b_len, margin)], fill=b_col, width=b_w)
    draw.line([(WIDTH - margin, margin), (WIDTH - margin, margin + b_len)], fill=b_col, width=b_w)
    draw.line([(margin, HEIGHT - margin), (margin + b_len, HEIGHT - margin)], fill=b_col, width=b_w)
    draw.line([(margin, HEIGHT - margin), (margin, HEIGHT - margin - b_len)], fill=b_col, width=b_w)
    draw.line([(WIDTH - margin, HEIGHT - margin), (WIDTH - margin - b_len, HEIGHT - margin)], fill=b_col, width=b_w)
    draw.line([(WIDTH - margin, HEIGHT - margin), (WIDTH - margin, HEIGHT - margin - b_len)], fill=b_col, width=b_w)

    y = 85
    draw.text((WIDTH // 2, y), "[000 // SOCIAL LOUNGE & ESPORTS ARENA]", font=FONT_INDEX, fill='#AA0001', anchor='mt')
    y += 38
    draw.text((WIDTH // 2, y), "NEO GAME CAFE & LOUNGE", font=FONT_BRAND, fill='#111111', anchor='mt')
    y += 62
    draw.text((WIDTH // 2, y), "BEYLİKDÜZÜ / İSTANBUL", font=FONT_LOCATION, fill='#666666', anchor='mt')
    y += 32

    draw.line([(WIDTH // 2 - 180, y), (WIDTH // 2 + 180, y)], fill='#AA0001', width=3)
    y += 38

    qr_box_w = 580
    qr_box_h = 610
    qr_x0 = (WIDTH - qr_box_w) // 2
    qr_y0 = y
    qr_x1 = qr_x0 + qr_box_w
    qr_y1 = qr_y0 + qr_box_h

    draw.rectangle([qr_x0 - 5, qr_y0 - 5, qr_x1 + 5, qr_y1 + 5], outline='#AA0001', width=2)
    draw.rectangle([qr_x0, qr_y0, qr_x1, qr_y1], fill='#F9FAFB', outline='#E5E7EB', width=1)

    qr_img = Image.open('assets/images/qr-menu-print-hires.png').convert('RGBA')
    qr_size = 430
    qr_img = qr_img.resize((qr_size, qr_size), Image.Resampling.LANCZOS)
    img.paste(qr_img, ((WIDTH - qr_size) // 2, qr_y0 + 20), qr_img)

    draw.text((WIDTH // 2, qr_y0 + 465), "KAMERANIZLA OKUTUN", font=FONT_QR_CTA, fill='#111111', anchor='mt')
    draw.text((WIDTH // 2, qr_y0 + 505), "DİJİTAL MENÜ & KAFE BAR", font=FONT_QR_SUB, fill='#AA0001', anchor='mt')
    draw.text((WIDTH // 2, qr_y0 + 540), "beylikduzugamecafe.com.tr", font=FONT_QR_URL, fill='#4B5563', anchor='mt')

    y = qr_y1 + 45

    box_w = WIDTH - 170
    box_h = 265
    box_x0 = (WIDTH - box_w) // 2
    box_y0 = y
    box_x1 = box_x0 + box_w
    box_y1 = box_y0 + box_h

    draw.rectangle([box_x0, box_y0, box_x1, box_y1], fill='#FEF2F2', outline='#AA0001', width=2)
    tag_w = 320
    draw.rectangle([(WIDTH - tag_w) // 2, box_y0 - 18, (WIDTH + tag_w) // 2, box_y0 + 18], fill='#AA0001')
    draw.text((WIDTH // 2, box_y0), "[ MASAYA ÜCRETSİZ İKRAM ]", font=FONT_OFFER_TAG, fill='#FFFFFF', anchor='mm')

    draw.text((WIDTH // 2, box_y0 + 42), "2 SAAT OYUN OYNAYANA", font=FONT_OFFER_PRE, fill='#B45309', anchor='mt')
    draw.text((WIDTH // 2, box_y0 + 82), "PATLAMIŞ MISIR & KOLA", font=FONT_OFFER_MAIN, fill='#111111', anchor='mt')
    draw.text((WIDTH // 2, box_y0 + 135), "TAMAMEN ÜCRETSİZ!", font=FONT_OFFER_FREE, fill='#AA0001', anchor='mt')
    draw.text((WIDTH // 2, box_y0 + 200), "PlayStation veya masa oyunlarında geçerlidir", font=FONT_OFFER_NOTE, fill='#6B7280', anchor='mt')

    try:
        pop = Image.open('assets/images/menu/popcorn.png').convert('RGBA')
        pop_w = 125
        pop_h = int(pop_w * pop.size[1] / pop.size[0])
        pop = pop.resize((pop_w, pop_h), Image.Resampling.LANCZOS)
        img.paste(pop, (box_x0 + 25, box_y0 + 65), pop)

        cola = Image.open('assets/images/menu/coca-cola.png').convert('RGBA')
        cola_w = 85
        cola_h = int(cola_w * cola.size[1] / cola.size[0])
        cola = cola.resize((cola_w, cola_h), Image.Resampling.LANCZOS)
        img.paste(cola, (box_x1 - 110, box_y0 + 80), cola)
    except Exception as e:
        print("Icon paste error:", e)

    y = box_y1 + 40

    badges = ["[ PS5 VIP LOCALAR ]", "[ BİLARDO SALONU ]", "[ KUTU OYUNLARI ]", "[ ARTİSAN KAFE ]"]
    draw.text((WIDTH // 2, y), "   •   ".join(badges), font=FONT_TICKER, fill='#374151', anchor='mt')
    y += 45

    draw.line([(margin + 50, y), (WIDTH - margin - 50, y)], fill='#E5E7EB', width=1)
    y += 25

    draw.text((WIDTH // 2, y), "Wi-Fi: NEO-GAME-LOUNGE   |   Şifre: Masadaki Görevliye Sorunuz", font=FONT_FOOTER_WIFI, fill='#1F2937', anchor='mt')
    y += 35
    draw.text((WIDTH // 2, y), "Barış Mah. Samsun Cad. Kır Sk. Prestij Konak Apt. No: 21 Dükkan: 8, Beylikdüzü", font=FONT_FOOTER_ADDR, fill='#6B7280', anchor='mt')
    y += 32
    draw.text((WIDTH // 2, y), "TEL: 0531 586 99 66    •    INSTAGRAM: @neogamecafe", font=FONT_FOOTER_CONTACT, fill='#111111', anchor='mt')

    out_png = 'print_card_a6_light_300dpi.png'
    img.save(out_png, 'PNG', dpi=(300, 300))
    print(f"Saved: {out_png}")

if __name__ == '__main__':
    create_dark_card()
    create_light_card()
