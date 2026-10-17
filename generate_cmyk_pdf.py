import os
from reportlab.lib.pagesizes import A6
from reportlab.lib.units import mm
from reportlab.pdfgen import canvas
from reportlab.lib.colors import CMYKColor, HexColor
from PIL import Image

def generate_pdf():
    pdf_path = "neo_game_cafe_masa_karti_a6_cmyk.pdf"
    c = canvas.Canvas(pdf_path, pagesize=A6)
    w, h = A6  # 105mm x 148mm (in points)

    # CMYK Color Definitions
    RICH_BLACK = CMYKColor(0.50, 0.40, 0.40, 1.0)
    BLOOD_RED = CMYKColor(0.15, 1.00, 1.00, 0.10)
    PURE_WHITE = CMYKColor(0, 0, 0, 0)
    GOLD_AMBER = CMYKColor(0, 0.35, 1.0, 0.05)
    MUTED_GREY = CMYKColor(0.1, 0.1, 0.1, 0.4)

    # Page 1: Dark Edition (High-res 300 DPI composite)
    if os.path.exists('print_card_a6_dark_300dpi.png'):
        c.drawImage('print_card_a6_dark_300dpi.png', 0, 0, width=w, height=h)
        c.showPage()

    # Page 2: Light Edition
    if os.path.exists('print_card_a6_light_300dpi.png'):
        c.drawImage('print_card_a6_light_300dpi.png', 0, 0, width=w, height=h)
        c.showPage()

    c.save()
    print(f"Generated PDF: {pdf_path}")

if __name__ == '__main__':
    generate_pdf()
