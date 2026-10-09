# Contrast Bento

Aplicación interactiva para explorar colores y paletas, comprobar contraste de texto según WCAG y ver combinaciones en una muestra de interfaz Bento.

## Funciones

- Comparación entre color de texto y fondo con ratios y criterios WCAG AA/AAA.
- Edición de colores mediante selector nativo o código hexadecimal.
- Paleta editable, con opción de añadir y retirar colores.
- Captura de color con EyeDropper API cuando el navegador la admite.
- Extracción de un color promedio desde una imagen local.
- Generación de armonías de color a partir del tono seleccionado.
- Previsualización de interfaz, formas, tipografía y degradados CSS.

## Ejecutar

Requiere Node.js 18 o posterior.

```bash
npm install
npm run dev
```

Vite escucha en `0.0.0.0:5173`; abre `http://localhost:5173` en el navegador. Para producción, usa `npm run build` y `npm run preview`.

## Recomendaciones de color

La sugerencia de armonía y las recomendaciones de contraste se calculan localmente con reglas de color y WCAG. No hay una API de IA conectada; para integrar un proveedor de IA se necesitaría definir un servicio y gestionar las credenciales fuera del cliente.