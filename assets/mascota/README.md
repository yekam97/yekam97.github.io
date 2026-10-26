# Mascota Camilo — versión vectorial

Vectorización a color de la mascota (pose de salto), lista para animar. Está fuera de `public/`,
así que los archivos sueltos **no se publican** (si los quieres como URL, cópialos a `public/`),
pero `mascota-rig.json` sí entra al sitio porque lo importa `components/MascotaRig.js`.

## Archivos

| Archivo | Para qué |
| --- | --- |
| `mascota-completa.svg` | Una sola pieza (339 paths). Para usarla estática o escalarla. |
| `mascota-partes.svg` | La mascota separada en 8 grupos `<g id="...">`, ya apilados en orden. **Este es el que se anima.** |
| `partes/<id>.svg` | Cada parte por separado (mismo `viewBox`, se pueden superponer tal cual). |
| `mascota-rig.json` | Los mismos datos en JSON: `viewBox`, y por parte `id`, `z`, `pivot`, `bbox` y `paths` (`d`, `fill`, `x`, `y`). Útil para Canvas, GSAP, Lottie-like propio, etc. |
| `demo.html` | Demo autocontenida (ábrela con doble clic): completa, partes y rig animado. |

`viewBox` común: `0 0 1197 1314`.

## Partes y pivotes

Orden de dibujo (de atrás hacia adelante). "Izquierda/derecha" desde el punto de vista de quien mira.

| id | Parte | Pivote (x, y) |
| --- | --- | --- |
| `arm-left` | Brazo izquierdo | 385, 365 (hombro) |
| `arm-right` | Brazo derecho | 735, 495 (hombro) |
| `leg-left` | Pierna izquierda | 470, 705 (cadera) |
| `shoe-left` | Zapato izquierdo | 520, 945 (tobillo) |
| `leg-right` | Pierna derecha (patada) | 620, 700 (cadera) |
| `shoe-right` | Zapato derecho (patada) | 800, 760 (tobillo) |
| `torso` | Torso | 530, 690 (cintura) |
| `head` | Cabeza | 548, 440 (cuello) |

Cada `<g>` de `mascota-partes.svg` trae `data-pivot="x,y"` y un `style` con
`transform-box: view-box; transform-origin: Xpx Ypx`, así que girar con CSS ya usa la articulación correcta.

## Cómo animarlo

**CSS / Framer Motion** (giro sobre el pivote, sin código extra):

```css
#arm-left { animation: wave 1.2s ease-in-out infinite alternate; }
@keyframes wave { from { transform: rotate(-8deg); } to { transform: rotate(8deg); } }
```

**Cadenas de huesos** (el zapato debe seguir a la pierna, la cabeza al torso): como los grupos son
hermanos, compón las rotaciones con el atributo `transform` de SVG — se aplican de derecha a izquierda:

```js
// el zapato gira sobre su tobillo y, además, acompaña a la pierna que gira sobre la cadera
shoe.setAttribute('transform', `rotate(${legDeg} 620 700) rotate(${shoeDeg} 800 760)`);
```

`demo.html` hace exactamente esto para brazos, cabeza, torso, piernas y zapatos.

## Notas y límites

- Cada parte se solapa unos 3 px con sus vecinas para que no se vean costuras al moverse.
- Los brazos incluyen un "muñón" de piel escondido bajo la manga, así que pueden girar sin dejar hueco.
- Rango cómodo: brazos hasta ±28°, cabeza ±14°, piernas/zapatos hasta ±12–16°. Con giros de cadera mayores
  se abre una cuña entre el torso y las piernas (no hay "pelvis" dibujada debajo de la camisa).
- El trazado se hizo con `vtracer` a partir de la ilustración original.

## Dónde se usa en el sitio

`components/MascotaRig.js` importa `mascota-rig.json` (carga diferida: solo cuando la mascota está a
~1500 px del viewport) y la anima. Se usa en la sección Contacto (`components/Contact.js`):
flota en reposo y **salta al pasar el mouse/foco por el botón**. El borde blanco tipo sticker es un
filtro SVG (dilatar + blanco), así que sigue a cada miembro. Con `prefers-reduced-motion` se muestra
quieta. Como el JSON se importa desde aquí, **esta carpeta debe quedarse en el repo** aunque no se despliegue
como archivos sueltos.
