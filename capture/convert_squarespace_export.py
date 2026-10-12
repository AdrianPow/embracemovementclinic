"""Convert a Squarespace "WordPress" XML export into ../reference/ for the rebuild.

Usage:  python3 convert_squarespace_export.py path/to/Squarespace-Wordpress-Export.xml

Writes, per page: reference/pages/<slug>/content.md, meta.json, export.html
and site-wide: reference/INVENTORY.md, inventory.json, images.json
Needs: pip install beautifulsoup4 markdownify
"""
import json
import re
import sys
import xml.etree.ElementTree as ET
from datetime import datetime, timezone
from pathlib import Path

from bs4 import BeautifulSoup
from markdownify import markdownify as to_md

NS = {
    "wp": "http://wordpress.org/export/1.2/",
    "content": "http://purl.org/rss/1.0/modules/content/",
}
OUT = Path(__file__).resolve().parent.parent / "reference"
GAP_BLOCKS = {
    "button": "Button: label and link not included in the export (check the screenshot)",
    "code": "Code block: contents not included in the export (may be a script, embed or custom HTML; check the screenshot)",
    "map": "Map: address and settings not included in the export (check the Contact page details)",
    "form": "Form: fields and destination not included in the export (check the screenshot and Squarespace form settings)",
    "summary": "Summary block: dynamic list not included in the export",
    "gallery": "Gallery: check the screenshot for layout",
}


def clean_url(u):
    return u.split("?")[0] if u else u


def full_res(u):
    return f"{clean_url(u)}?format=2500w" if u and "squarespace-cdn.com" in u else u


def block_type(el):
    for c in el.get("class", []):
        if c.startswith("sqs-block-") and c not in ("sqs-block-content", "sqs-block-website-component"):
            return c.replace("sqs-block-", "")
    return "unknown"


def image_info(img):
    src = img.get("data-src") or img.get("data-image") or img.get("src")
    if not src:
        srcset = img.get("srcset") or img.get("data-srcset")
        if srcset:
            src = srcset.split(",")[-1].strip().split(" ")[0]
    return {
        "src": clean_url(src),
        "download": full_res(src),
        "alt": (img.get("alt") or "").strip(),
        "dimensions": img.get("data-image-dimensions"),
    }


def html_to_md(el):
    for s in el.find_all(["style", "script"]):
        s.decompose()
    md = to_md(str(el), heading_style="ATX", bullets="-", strip=["span", "div"])
    md = re.sub(r"\n{3,}", "\n\n", md)
    return md.strip()


def convert_page(item):
    title = item.findtext("title") or ""
    path = item.findtext("link") or "/"
    slug = path.strip("/").replace("/", "_") or "home"
    html = item.findtext("content:encoded", namespaces=NS) or ""
    soup = BeautifulSoup(html, "html.parser")

    sections, images, links, embeds, gaps = [], [], [], [], []
    for n, sec in enumerate(soup.select("section.page-section, section[data-section-id]"), 1):
        theme = sec.get("data-section-theme")
        bg = [image_info(i) for i in sec.select(".section-background img")]
        images += [dict(b, role="section background") for b in bg]
        blocks = []
        for b in sec.select(".sqs-block"):
            t = block_type(b)
            content = b.select_one(".sqs-block-content") or b
            entry = {"type": t}
            if t == "html":
                entry["markdown"] = html_to_md(content)
                for a in content.select("a[href]"):
                    links.append({"text": a.get_text(" ", strip=True), "href": a["href"]})
            elif t == "image":
                imgs = [image_info(i) for i in content.select("img")]
                link = content.select_one("a[href]")
                caption = content.select_one("figcaption")
                entry.update(images=imgs, link=link["href"] if link else None,
                             caption=caption.get_text(" ", strip=True) if caption else None)
                images += [dict(i, role="image block") for i in imgs]
                if link:
                    links.append({"text": "(image link)", "href": link["href"]})
            elif t == "embed":
                srcs = [f.get("src") for f in content.select("iframe[src]")] + [s.get("src") for s in content.select("script[src]")]
                entry["embed"] = srcs or [str(content)[:500]]
                embeds += srcs
            if t in GAP_BLOCKS and not content.get_text(strip=True) and not content.find(["iframe", "img", "a"]):
                entry["note"] = GAP_BLOCKS[t]
                gaps.append(t)
            blocks.append(entry)
        classes = sec.get("class", [])
        if "user-items-list-section" in classes:
            header = sec.select_one(".list-section-title")
            if header and header.get_text(strip=True):
                blocks.append({"type": "list-title", "markdown": html_to_md(header)})
            seen = set()
            for li in sec.select("li.list-item"):
                t_el = li.select_one(".list-item-content__title")
                d_el = li.select_one(".list-item-content__description")
                btn = li.select_one(".list-item-content__button, a.list-item-content__button")
                key = (t_el.get_text(strip=True) if t_el else "", d_el.get_text(strip=True)[:80] if d_el else "")
                if key in seen:
                    continue  # Squarespace repeats list markup for different layouts
                seen.add(key)
                imgs = [image_info(i) for i in li.select("img")]
                images += [dict(i, role="list item") for i in imgs]
                parts = [f"### {key[0]}"] if key[0] else []
                parts += [f"![{i['alt']}]({i['src']})" for i in imgs]
                if d_el:
                    parts.append(html_to_md(d_el))
                if btn:
                    href = btn.get("href") or (btn.find("a") or {}).get("href")
                    parts.append(f"[Button: {btn.get_text(' ', strip=True)}]({href})")
                    if href:
                        links.append({"text": btn.get_text(" ", strip=True), "href": href})
                blocks.append({"type": "list-item", "title": key[0], "markdown": "\n\n".join(parts)})
                if d_el:
                    links += [{"text": a.get_text(" ", strip=True), "href": a["href"]} for a in d_el.select("a[href]")]
        elif "gallery-section" in classes:
            imgs, seen_src = [], set()
            for i in sec.select("img"):
                info = image_info(i)
                if info["src"] and info["src"] not in seen_src:
                    seen_src.add(info["src"])
                    imgs.append(info)
            images += [dict(i, role="gallery") for i in imgs]
            blocks.append({"type": "gallery", "images": imgs,
                           "markdown": "**Gallery:**\n\n" + "\n".join(f"![{i['alt']}]({i['src']})" for i in imgs)})
        sections.append({"section": n, "theme": theme, "background": bg, "blocks": blocks})

    # Markdown
    lines = [f"# {title}", "", f"- Current URL: {path}", "- Source: Squarespace export (text and structure only; see screenshots for layout)", ""]
    for s in sections:
        bg = f" · background image: {s['background'][0]['src']}" if s["background"] else ""
        lines += [f"<!-- Section {s['section']} · theme: {s['theme']}{bg} -->", ""]
        for b in s["blocks"]:
            if b.get("markdown"):
                lines += [b["markdown"], ""]
            elif b["type"] == "image":
                for i in b["images"]:
                    img = f"![{i['alt']}]({i['src']})"
                    lines.append(f"[{img}]({b['link']})" if b.get("link") else img)
                if b.get("caption"):
                    lines.append(f"*{b['caption']}*")
                lines.append("")
            elif b["type"] == "embed":
                lines += [f"[EMBED: {e}]" for e in b["embed"]] + [""]
            elif b.get("note"):
                lines += [f"> ⚠️ {b['note']}", ""]
    md = "\n".join(lines)

    h = [l.strip("# ").strip() for l in md.splitlines() if l.startswith("#")]
    meta = {"title": title, "url": path, "slug": slug, "headings": h[1:], "sections": sections,
            "images": images, "links": links, "embeds": embeds, "export_gaps": gaps}
    return slug, md, meta, html


def main(xml_path):
    channel = ET.parse(xml_path).getroot().find("channel")
    pages_dir = OUT / "pages"
    pages_dir.mkdir(parents=True, exist_ok=True)
    inventory, all_images, all_links, all_embeds = [], {}, [], set()

    for item in channel.findall("item"):
        if item.findtext("wp:post_type", namespaces=NS) not in ("page", "post"):
            continue
        slug, md, meta, html = convert_page(item)
        d = pages_dir / slug
        d.mkdir(exist_ok=True)
        (d / "content.md").write_text(md, encoding="utf-8")
        (d / "meta.json").write_text(json.dumps(meta, indent=2), encoding="utf-8")
        (d / "export.html").write_text(html, encoding="utf-8")
        for i in meta["images"]:
            if i["src"]:
                all_images.setdefault(i["src"], {**i, "pages": []})["pages"].append(slug)
        all_links += [dict(l, page=slug) for l in meta["links"]]
        all_embeds.update(meta["embeds"])
        words = len(re.sub(r"[#>*\[\]()!-]", " ", md).split())
        inventory.append({"slug": slug, "url": meta["url"], "title": meta["title"], "sections": len(meta["sections"]),
                          "images": len(meta["images"]), "words": words, "export_gaps": sorted(set(meta["export_gaps"]))})

    ext = sorted({l["href"] for l in all_links if l["href"].startswith("http") and "embracemovementclinic" not in l["href"]})
    contact = sorted({l["href"] for l in all_links if l["href"].startswith(("tel:", "mailto:"))})
    internal = sorted({l["href"] for l in all_links if not l["href"].startswith(("tel:", "mailto:"))
                       and (l["href"].startswith("/") or "embracemovementclinic" in l["href"])})
    exported = {p["url"] for p in inventory}
    broken = sorted({h for h in internal if h.startswith("/") and h.split("?")[0].split("#")[0].rstrip("/") not in exported})

    (OUT / "images.json").write_text(json.dumps(list(all_images.values()), indent=2), encoding="utf-8")
    (OUT / "inventory.json").write_text(json.dumps({
        "source": Path(xml_path).name, "convertedAt": datetime.now(timezone.utc).isoformat(),
        "site": channel.findtext("link"), "pages": inventory, "embeds": sorted(all_embeds),
        "externalLinks": ext, "contactLinks": contact, "internalLinks": internal}, indent=2), encoding="utf-8")

    md = ["# Site inventory (from Squarespace export)", "",
          f"Source: `{Path(xml_path).name}` · Site: {channel.findtext('link')} · Pages: {len(inventory)} · Unique images: {len(all_images)}", "",
          "## Pages", "", "| Folder | Current URL | Title | Words | Images | Export gaps |", "|---|---|---|---|---|---|"]
    md += [f"| {p['slug']} | {p['url']} | {p['title']} | {p['words']} | {p['images']} | {', '.join(p['export_gaps']) or '—'} |" for p in inventory]
    md += ["", "## Embeds", ""] + [f"- {e}" for e in sorted(all_embeds)]
    md += ["", "## Phone / email links", ""] + [f"- {c}" for c in contact]
    md += ["", "## External links", ""] + [f"- {e}" for e in ext]
    md += ["", "## Internal links used in page content", ""] + [f"- {i}" for i in internal]
    md += ["", "## Linked pages missing from the export", "",
           "These are linked from page content but weren't exported (often blog posts or collections). Check whether they still exist.", ""]
    md += [f"- {b}" for b in broken] or ["- None"]
    md += ["", "## Not in the export (get from screenshots or Squarespace settings)", "",
           "- Header, navigation menu and footer (address, hours, social links)",
           "- Fonts, colours, spacing and custom CSS",
           "- Button labels and links, code blocks, map settings, forms",
           "- Image files: links are in `images.json` (`download` field = full-resolution URL)",
           "- SEO titles and descriptions, and which pages are hidden from navigation", ""]
    (OUT / "INVENTORY.md").write_text("\n".join(md), encoding="utf-8")
    print(f"Converted {len(inventory)} pages, {len(all_images)} images -> {OUT}")


if __name__ == "__main__":
    main(sys.argv[1])
