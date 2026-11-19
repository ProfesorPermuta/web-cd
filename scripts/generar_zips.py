#!/usr/bin/env python
"""Genera static/descargas/tema-N.zip: un PDF por apunte de cada tema.

Uso:
    python scripts/generar_zips.py            # temas 1, 2 y 3
    python scripts/generar_zips.py 2 3        # solo esos temas
    python scripts/generar_zips.py --con-soluciones

Los zips se commitean; hay que regenerarlos tras editar los apuntes.
"""
import os, sys, tempfile, zipfile

sys.path.insert(0, os.path.dirname(__file__))
from carpeta_a_pdf import ficheros_de, generar_pdf

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def titulo_de(f):
    for linea in open(f, encoding="utf-8"):
        if linea.startswith("# "):
            return linea[2:].strip()
    return os.path.splitext(os.path.basename(f))[0]


def main():
    args = sys.argv[1:]
    con_sol = "--con-soluciones" in args
    temas = [a for a in args if a.isdigit()] or ["1", "2", "3"]
    for n in temas:
        carpeta = os.path.join(RAIZ, "src", "pages", f"tema-{n}")
        ficheros = ficheros_de(carpeta, con_sol)
        salida = os.path.join(RAIZ, "static", "descargas", f"tema-{n}.zip")
        os.makedirs(os.path.dirname(salida), exist_ok=True)
        with tempfile.TemporaryDirectory() as tmp, zipfile.ZipFile(salida, "w", zipfile.ZIP_DEFLATED) as z:
            for f in ficheros:
                nombre = os.path.splitext(os.path.basename(f))[0] + ".pdf"
                pdf = os.path.join(tmp, nombre)
                generar_pdf([f], pdf, con_soluciones=con_sol)
                z.write(pdf, f"Tema_{n}/{nombre}")
                print(f"  tema {n}: {nombre}")
        print(f"tema {n}: {len(ficheros)} PDFs -> {salida}")


if __name__ == "__main__":
    main()
