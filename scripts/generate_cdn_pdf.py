from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    PageBreak,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "output" / "pdf" / "cdn-concepts-and-deep-dive.pdf"
FONT_PATHS = [
    Path("/System/Library/Fonts/Supplemental/AppleGothic.ttf"),
    Path("/System/Library/Fonts/AppleSDGothicNeo.ttc"),
]


def register_fonts():
    for font_path in FONT_PATHS:
        if font_path.exists():
            pdfmetrics.registerFont(TTFont("StudySans", str(font_path)))
            return "StudySans"
    return "Helvetica"


FONT = register_fonts()
BLUE = colors.HexColor("#1d4ed8")
NAVY = colors.HexColor("#172554")
MINT = colors.HexColor("#0f766e")
SLATE = colors.HexColor("#334155")
LIGHT_BLUE = colors.HexColor("#eff6ff")
LIGHT_MINT = colors.HexColor("#ecfdf5")
LIGHT_YELLOW = colors.HexColor("#fefce8")
BORDER = colors.HexColor("#cbd5e1")


styles = {
    "title": ParagraphStyle(
        "title",
        fontName=FONT,
        fontSize=24,
        leading=30,
        textColor=NAVY,
        spaceAfter=8,
    ),
    "subtitle": ParagraphStyle(
        "subtitle",
        fontName=FONT,
        fontSize=9,
        leading=13,
        textColor=MINT,
        spaceAfter=10,
    ),
    "h2": ParagraphStyle(
        "h2",
        fontName=FONT,
        fontSize=14,
        leading=18,
        textColor=BLUE,
        spaceBefore=6,
        spaceAfter=6,
    ),
    "body": ParagraphStyle(
        "body",
        fontName=FONT,
        fontSize=9.4,
        leading=14,
        textColor=SLATE,
        spaceAfter=5,
    ),
    "small": ParagraphStyle(
        "small",
        fontName=FONT,
        fontSize=7.4,
        leading=10,
        textColor=colors.HexColor("#64748b"),
    ),
    "callout": ParagraphStyle(
        "callout",
        fontName=FONT,
        fontSize=9,
        leading=13,
        textColor=colors.HexColor("#0f172a"),
    ),
    "center": ParagraphStyle(
        "center",
        fontName=FONT,
        fontSize=8.5,
        leading=12,
        textColor=colors.HexColor("#475569"),
        alignment=TA_CENTER,
    ),
}


def p(text, style="body"):
    return Paragraph(text, styles[style])


def bullet(text):
    return Paragraph(f"- {text}", styles["body"])


def box(content, bg=LIGHT_BLUE):
    table = Table([[content]], colWidths=[174 * mm])
    table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), bg),
                ("BOX", (0, 0), (-1, -1), 0.6, BORDER),
                ("LEFTPADDING", (0, 0), (-1, -1), 8),
                ("RIGHTPADDING", (0, 0), (-1, -1), 8),
                ("TOPPADDING", (0, 0), (-1, -1), 7),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 7),
            ]
        )
    )
    return table


def flow_table():
    rows = [
        ["1", "사용자", "서비스 도메인에 접근하고 DNS 조회를 시작합니다."],
        ["2", "DNS", "위치와 상태를 고려해 가까운 CDN 엣지로 안내합니다."],
        ["3", "Edge", "캐시가 있으면 바로 응답하고, 없으면 origin으로 요청합니다."],
        ["4", "Origin", "원본 응답을 반환하고, 캐시 가능한 응답은 edge에 저장됩니다."],
    ]
    table = Table(rows, colWidths=[12 * mm, 24 * mm, 136 * mm])
    table.setStyle(
        TableStyle(
            [
                ("FONTNAME", (0, 0), (-1, -1), FONT),
                ("FONTSIZE", (0, 0), (-1, -1), 8.4),
                ("LEADING", (0, 0), (-1, -1), 11),
                ("TEXTCOLOR", (0, 0), (-1, -1), SLATE),
                ("BACKGROUND", (0, 0), (-1, -1), colors.white),
                ("BOX", (0, 0), (-1, -1), 0.6, BORDER),
                ("INNERGRID", (0, 0), (-1, -1), 0.3, colors.HexColor("#e2e8f0")),
                ("BACKGROUND", (0, 0), (1, -1), LIGHT_BLUE),
                ("TEXTCOLOR", (0, 0), (1, -1), NAVY),
                ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
                ("LEFTPADDING", (0, 0), (-1, -1), 6),
                ("RIGHTPADDING", (0, 0), (-1, -1), 6),
                ("TOPPADDING", (0, 0), (-1, -1), 6),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
            ]
        )
    )
    return table


def component_table():
    rows = [
        ["Origin server", "콘텐츠와 API의 기준 데이터가 있는 원본 서버입니다."],
        ["Edge server", "사용자 가까이에서 캐시, 프록시, 보안 처리를 수행하는 서버입니다."],
        ["DNS server", "요청을 어느 CDN 엣지로 보낼지 안내하는 진입점입니다."],
    ]
    table = Table(rows, colWidths=[42 * mm, 130 * mm])
    table.setStyle(
        TableStyle(
            [
                ("FONTNAME", (0, 0), (-1, -1), FONT),
                ("FONTSIZE", (0, 0), (-1, -1), 8.6),
                ("LEADING", (0, 0), (-1, -1), 11.5),
                ("TEXTCOLOR", (0, 0), (-1, -1), SLATE),
                ("BACKGROUND", (0, 0), (0, -1), LIGHT_MINT),
                ("TEXTCOLOR", (0, 0), (0, -1), colors.HexColor("#064e3b")),
                ("BOX", (0, 0), (-1, -1), 0.6, BORDER),
                ("INNERGRID", (0, 0), (-1, -1), 0.3, colors.HexColor("#e2e8f0")),
                ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
                ("LEFTPADDING", (0, 0), (-1, -1), 7),
                ("RIGHTPADDING", (0, 0), (-1, -1), 7),
                ("TOPPADDING", (0, 0), (-1, -1), 7),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 7),
            ]
        )
    )
    return table


def draw_footer(canvas, doc):
    canvas.saveState()
    canvas.setFont(FONT, 7)
    canvas.setFillColor(colors.HexColor("#64748b"))
    canvas.drawString(18 * mm, 12 * mm, "CS > 01. CDN 개념 및 심화")
    canvas.drawRightString(192 * mm, 12 * mm, f"{doc.page}/2")
    canvas.restoreState()


def build_pdf():
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    doc = SimpleDocTemplate(
        str(OUTPUT),
        pagesize=A4,
        rightMargin=18 * mm,
        leftMargin=18 * mm,
        topMargin=17 * mm,
        bottomMargin=18 * mm,
        title="01. CDN 개념 및 심화",
        author="Leesumok",
    )

    story = []

    story.append(p("01. CDN 개념 및 심화", "title"))
    story.append(p("1-1. CDN이란? CDN 작동", "subtitle"))
    story.append(
        p(
            "CDN(Content Delivery Network)은 사용자와 원본 서버(origin) 사이에 전 세계 여러 지역의 엣지 서버를 두고, 콘텐츠나 요청을 더 가까운 곳에서 처리하게 하는 네트워크입니다."
        )
    )
    story.append(
        box(
            p(
                "<b>ATM 비유</b><br/>은행 본점까지 매번 가지 않고 가까운 ATM에서 돈을 찾는 것처럼, CDN은 원본 서버까지 매번 가지 않고 가까운 엣지 서버에서 필요한 응답을 제공합니다.",
                "callout",
            ),
            LIGHT_YELLOW,
        )
    )
    story.append(Spacer(1, 6))
    story.append(p("왜 쓰는가?", "h2"))
    for item in [
        "사용자와 서버 사이의 물리적 거리를 줄여 지연 시간을 낮춥니다.",
        "정적 파일을 가까운 엣지 서버에서 내려주어 로딩 속도를 높입니다.",
        "원본 서버가 직접 처리해야 하는 요청과 대역폭을 줄입니다.",
        "트래픽 급증, 장애, DDoS 같은 상황에서 원본을 보호합니다.",
    ]:
        story.append(bullet(item))
    story.append(Spacer(1, 3))
    story.append(p("구성 요소", "h2"))
    story.append(component_table())
    story.append(Spacer(1, 8))
    story.append(p("기본 동작 흐름", "h2"))
    story.append(flow_table())
    story.append(Spacer(1, 8))
    story.append(
        p(
            "참고: Akamai CDN Glossary, Cloudflare Learning Center, Gabia Library",
            "small",
        )
    )

    story.append(PageBreak())

    story.append(p("1-2. 동적 API에도 CDN을 왜 쓰는가?", "title"))
    story.append(p("Edge server의 역할은 캐시보다 넓다", "subtitle"))
    story.append(
        p(
            "동적 API는 사용자, 권한, 시간에 따라 응답이 달라져 캐시하기 어렵습니다. 그래도 CDN을 API 앞단에 두는 이유는 CDN이 단순 캐시가 아니라 가까운 네트워크 입구이자 최적화된 프록시이기 때문입니다."
        )
    )
    story.append(p("캐시하지 않아도 얻는 이점", "h2"))
    for item in [
        "사용자는 가까운 엣지 서버까지만 먼저 연결하므로 초기 접속 거리가 짧아집니다.",
        "엣지가 원본과의 연결을 재사용하고 안정적인 네트워크 경로로 요청을 전달합니다.",
        "TLS 종료, 압축, HTTP/2 또는 HTTP/3 처리 같은 연결 비용을 엣지에서 줄일 수 있습니다.",
        "전 세계 요청이 원본으로 직접 몰리지 않고 CDN 계층을 통해 정리되어 들어갑니다.",
    ]:
        story.append(bullet(item))
    story.append(Spacer(1, 5))
    story.append(
        box(
            p(
                "<b>핵심</b><br/>동적 API에서 CDN을 쓰는 이유는 캐시 히트 하나가 아닙니다. 엣지는 가까운 접속 지점, 원본 보호막, 보안 계층, 트래픽 제어 지점입니다.",
                "callout",
            ),
            LIGHT_MINT,
        )
    )
    story.append(Spacer(1, 7))
    story.append(p("일부 응답은 짧게 캐시할 수 있다", "h2"))
    for item in [
        "모든 사용자에게 같은 공개 데이터",
        "짧은 시간만 유효한 목록 응답",
        "권한과 무관한 메타데이터",
        "장애 상황에서 잠깐 사용할 stale 응답",
    ]:
        story.append(bullet(item))
    story.append(Spacer(1, 5))
    story.append(p("API 앞단 보안과 제어", "h2"))
    for item in [
        "DDoS 트래픽 흡수, WAF, 봇 차단, rate limit을 원본 앞에서 적용합니다.",
        "가벼운 인증 헤더 정리, 리다이렉트, 라우팅을 엣지에서 처리할 수 있습니다.",
    ]:
        story.append(bullet(item))
    story.append(Spacer(1, 8))
    story.append(
        p(
            "Sources: https://www.akamai.com/ko/glossary/what-is-a-cdn | https://www.cloudflare.com/ko-kr/learning/cdn/what-is-a-cdn/ | https://library.gabia.com/contents/infrahosting/8985/",
            "small",
        )
    )

    doc.build(story, onFirstPage=draw_footer, onLaterPages=draw_footer)


if __name__ == "__main__":
    build_pdf()
    print(OUTPUT)
