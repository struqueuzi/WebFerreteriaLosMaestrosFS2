# Ferretería El Tornillo — Evaluación Parcial 1 (DSY1104)

## Estructura del proyecto
```
ferreteria/
├── index.html
├── productos.html
├── contacto.html
├── css/
│   └── estilos.css
├── js/
│   └── validaciones.js
├── img/        <- agrega aquí tus imágenes (ver lista abajo)
└── videos/     <- agrega aquí tu video promocional
```

## Imágenes que debes agregar en /img
- hero-ferreteria.jpg
- martillo.jpg
- taladro.jpg
- llaves.jpg
- escalera.jpg
- esmeril.jpg
- pintura.jpg
- tornillos.jpg

Puedes usar fotos propias, del catálogo de un proveedor (con permiso) o bancos de imágenes libres
(ej. Pexels, Unsplash). Mientras se agregan, el `alt` de cada imagen ya describe qué debería mostrarse.

## Video en /videos
Agrega un archivo `promo-ferreteria.mp4` (puede ser un video corto grabado con el celular
mostrando el local o los productos). Mientras no lo agregues, el navegador mostrará el mensaje
de reemplazo con el enlace de descarga.

## Cómo subir el proyecto a GitHub (requisito del encargo)
```bash
cd ferreteria
git init
git add .
git commit -m "Estructura inicial: HTML, CSS y validaciones JS de la ferretería"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/ferreteria-el-tornillo.git
git push -u origin main
```

Para los siguientes cambios, repite:
```bash
git add .
git commit -m "Descripción clara del cambio realizado"
git push
```

Recuerda que la rúbrica pide **mensajes de commit claros y descriptivos**, y que las tareas se vean
**distribuidas entre los integrantes del equipo** (cada uno debería hacer al menos algunos commits
propios si trabajan en equipo).
