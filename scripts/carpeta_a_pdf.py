#!/usr/bin/env python
"""Convierte una carpeta de apuntes (.md/.mdx) en un único PDF.

Uso:
    python scripts/carpeta_a_pdf.py src/pages/tema-1
    python scripts/carpeta_a_pdf.py src/pages/tema-2 -o pdf/tema2.pdf -t "Tema 2"
    python scripts/carpeta_a_pdf.py src/pages/tema-2 --con-soluciones

Por defecto se excluyen las soluciones (secciones "## Soluciones" y carpetas
que empiecen por "soluciones"). Requiere Microsoft Edge o Google Chrome y,
para los diagramas mermaid, conexión a internet.
"""
import argparse, glob, os, re, shutil, subprocess, sys, tempfile

try:
    import markdown
except ImportError:
    subprocess.check_call([sys.executable, "-m", "pip", "install", "-q", "markdown"])
    import markdown

CSS = """body{font-family:'Segoe UI',Arial,sans-serif;font-size:11pt;line-height:1.5;color:#222}
h1{font-size:22pt;border-bottom:2px solid #444;padding-bottom:4px;page-break-before:always}
h2{font-size:16pt;margin-top:1.4em}h3{font-size:13pt}
pre{background:#f4f4f4;border:1px solid #ddd;padding:8px;white-space:pre-wrap;word-wrap:break-word;font-size:9.5pt;page-break-inside:avoid}
pre.mermaid{background:none;border:none;text-align:center}
code{font-family:Consolas,monospace;background:#f4f4f4;padding:0 2px}pre code{background:none}
table{border-collapse:collapse;margin:8px 0}td,th{border:1px solid #bbb;padding:4px 8px}th{background:#eee}
img{max-width:100%}
.adm{border-left:4px solid #888;background:#f7f7f7;padding:4px 12px;margin:10px 0}
.adm-tip{border-color:#2a9d4a}.adm-info{border-color:#2a6fd6}.adm-warning{border-color:#d69a2a}
.adm-t{font-weight:bold;text-transform:uppercase;font-size:9pt}
h1.cover{page-break-before:avoid;text-align:center;border:none;margin-top:35%;font-size:30pt}"""
EXT = ["fenced_code", "tables", "sane_lists"]


def limpiar(texto, con_soluciones):
    texto = re.sub(r"^---\n.*?\n---\n", "", texto, count=1, flags=re.S)  # frontmatter
    texto = re.sub(r"^import .*\n", "", texto, flags=re.M)               # imports MDX
    texto = re.sub(r"^<[A-Z]\w*[^>]*/>\s*$", "", texto, flags=re.M)      # componentes MDX
    if not con_soluciones:
        texto = re.split(r"^#{2,3} Soluciones?\b.*$", texto, maxsplit=1, flags=re.M)[0]
        texto = re.sub(r"^# (.*?)\s+y\s+Soluciones\b", r"# \1", texto, flags=re.M)

    def adm(m):
        tipo, titulo, cuerpo = m.group(1), m.group(2).strip(), m.group(3)
        if not titulo:
            # formato ":::tipo" solo en su línea: el título es la primera línea de texto
            # (con una línea en blanco antes o después de ella)
            t = (re.match(r"[ \t]*\n[ \t]*([^\n]{1,80}?)[ \t]*\n(?=\S)", cuerpo)      # línea en blanco, título, cuerpo
                 or re.match(r"(?:[ \t]*\n)?[ \t]*([^\n]{1,80}?)[ \t]*\n[ \t]*\n(?=\S)", cuerpo)
                 or re.match(r"[ \t]*([^\n]{1,60}?)[ \t]*\n(?=\S)", cuerpo))                 # título y cuerpo en líneas seguidas  # título, línea en blanco, cuerpo
            if t and not t.group(1).endswith((".", ":", "```")) and not t.group(1).startswith(("-", "*", "#", "|", "`")):
                titulo, cuerpo = t.group(1), cuerpo[t.end():]
        inner = markdown.markdown(cuerpo, extensions=EXT)
        return f'\n<div class="adm adm-{tipo}"><div class="adm-t">{titulo or tipo}</div>{inner}</div>\n'

    return re.sub(r"^:::(\w+)[ \t]*([^\n]*)\n(.*?)^:::[ \t]*$", adm, texto, flags=re.M | re.S)


def buscar_navegador():
    for exe in ("msedge", "chrome", "google-chrome", "chromium"):
        p = shutil.which(exe)
        if p:
            return p
    for p in (r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe",
              r"C:\Program Files\Microsoft\Edge\Application\msedge.exe",
              r"C:\Program Files\Google\Chrome\Application\chrome.exe",
              r"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe"):
        if os.path.exists(p):
            return p
    sys.exit("No se encontró Edge ni Chrome.")


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("carpeta", help="carpeta con los ficheros .md/.mdx")
    ap.add_argument("-o", "--salida", help="PDF de salida (por defecto pdf/<carpeta>.pdf)")
    ap.add_argument("-t", "--titulo", help="título de la portada (por defecto el nombre de la carpeta)")
    ap.add_argument("--con-soluciones", action="store_true", help="no eliminar las soluciones")
    a = ap.parse_args()

    carpeta = os.path.abspath(a.carpeta)
    if not os.path.isdir(carpeta):
        sys.exit(f"No existe la carpeta: {carpeta}")
    nombre = os.path.basename(carpeta.rstrip("/\\"))
    ficheros = sorted(
        f for f in glob.glob(os.path.join(carpeta, "**", "*.md*"), recursive=True)
        if f.endswith((".md", ".mdx"))
        and (a.con_soluciones or not any(p.lower().startswith("soluciones")
                                          for p in os.path.relpath(f, carpeta).split(os.sep)[:-1]))
    )
    if not ficheros:
        sys.exit("No hay ficheros .md/.mdx en esa carpeta.")

    partes = [limpiar(open(f, encoding="utf-8").read(), a.con_soluciones) for f in ficheros]
    cuerpo = markdown.markdown("\n\n".join(partes), extensions=EXT)
    cuerpo = re.sub(r'<pre><code class="language-mermaid">(.*?)</code></pre>',
                    lambda m: '<pre class="mermaid">' + m.group(1) + "</pre>", cuerpo, flags=re.S)
    titulo = a.titulo or nombre
    html = (f'<html><head><meta charset="utf-8"><style>{CSS}</style></head><body>'
            f'<h1 class="cover">{titulo}</h1>{cuerpo}'
            '<script src="https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js"></script>'
            "<script>mermaid.initialize({startOnLoad:true});</script></body></html>")

    salida = os.path.abspath(a.salida or os.path.join(os.getcwd(), "pdf", nombre + ".pdf"))
    os.makedirs(os.path.dirname(salida), exist_ok=True)
    with tempfile.TemporaryDirectory() as tmp:
        hp = os.path.join(tmp, "doc.html")
        open(hp, "w", encoding="utf-8").write(html)
        subprocess.run([buscar_navegador(), "--headless", "--disable-gpu", "--no-pdf-header-footer",
                        "--virtual-time-budget=20000", f"--print-to-pdf={salida}",
                        "file:///" + hp.replace("\\", "/")], check=True,
                       stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    print(f"{len(ficheros)} ficheros -> {salida}")


if __name__ == "__main__":
    main()
