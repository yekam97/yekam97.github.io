# Mascota Camilo — ilustraciones vectoriales

Tres poses de la mascota convertidas a vector, separadas en partes con articulaciones para animarlas.
Sustituyen al video de fondo que seguía el scroll.

| Pose | Carpeta | Partes | Dónde se usa |
| --- | --- | --- | --- |
| De pie | `parado/` | 11 | Hero y Contacto |
| Pensando | `pensando/` | 9 | Habilidades |
| Salto | `salto/` | 8 | Trayectoria |

Cada carpeta contiene:

| Archivo | Para qué |
| --- | --- |
| `mascota-completa.svg` | La pose en una sola pieza. |
| `mascota-partes.svg` | La pose separada en grupos `<g id="…">` ya apilados, cada uno con `data-pivot="x,y"`. |
| `partes/<id>.svg` | Cada parte por separado (mismo `viewBox`, se superponen tal cual). |
| `mascota-rig.json` | Los mismos datos en JSON: `size`, `crop` (encuadre), y por parte `id`, `z`, `pivot`, `bbox`, `paths`. |

(`salto/` además trae `demo.html`, una demo autocontenida: ábrela con doble clic.)

Las partes están en orden de dibujo (de atrás hacia adelante). "Izquierda/derecha" es desde el punto de vista de quien mira.
Algunas partes son **rellenos ocultos** (p. ej. `pelvis`, o un "muñón" de piel bajo la manga) para que al girar un miembro
no quede un hueco.

## Cómo se usan en el sitio

- `components/MascotaRig.js` carga el JSON de la pose **bajo demanda** (cuando la mascota está a ~1500 px del viewport)
  y la anima con `requestAnimationFrame`: cada parte gira sobre su pivote y los hijos componen la rotación del padre
  (zapato → pierna, antebrazo → brazo, cabeza → torso). Con `prefers-reduced-motion` queda quieta.
- El movimiento vive en `lib/mascotaMotion.js` (funciones puras: tiempo -> transformación por parte). Reglas:
  un solo ciclo lento de flotación mueve todo y los miembros solo lo "arrastran" (rotación proporcional a la
  velocidad vertical), en vez de oscilar cada uno por su cuenta; lo que toca algo (la mano en el mentón) usa
  **exactamente la misma transformación** que eso, para no destapar lo que hay debajo; solo los gestos
  (saludo, salto) son grandes y entran/salen suavizados.
  - `parado`: solo respira y se mece muy poco; al pasar el mouse por un botón cercano da un pequeño rebote (sin saludo: se veía raro).
  - `pensando`: flota, la pierna en alto y la otra se mecen suave; cabeza y mano se mueven juntas.
  - `salto`: flota; brazos y piernas arrastran el movimiento; en el "hop" suben los brazos.
- `components/Stage.js` compone la escena grande: blobs orgánicos + formas flotantes (`components/Shapes.js`) +
  chips tipo sticker detrás de la mascota, con parallax ligado al scroll.
- El borde blanco tipo sticker es un filtro SVG (dilatar + blanco), así que sigue a cada miembro.
- Como el JSON se importa desde aquí, **esta carpeta debe quedarse en el repo** aunque no se despliegue como archivos sueltos
  (si quieres los SVG como URL, cópialos a `public/`).

## Límites de giro

Cada parte se solapa unos 4 px con sus vecinas para evitar costuras. Rangos cómodos: brazos hasta ±28° (el brazo
levantado de `parado` llega a −70° porque su hombro tiene relleno), cabeza ±14°, piernas/zapatos ±12–16°. Con giros mayores
de cadera se puede abrir una cuña entre el torso y las piernas.

## Añadir otra pose

El vectorizado se hizo con `vtracer` a partir de la ilustración original: recorte de fondo (relleno desde los bordes más
las bolsas de fondo encerradas), segmentación por polígonos + reglas de color por parte, y trazado de cada parte por
separado a ~62 % de la resolución. Si me pasas otra ilustración en la misma línea, genero su carpeta con el mismo formato.

## Revisar el movimiento

`frames.html` dibuja cada pose en varios instantes con los mismos perfiles que usa el sitio, para detectar gestos raros sin
esperar a verlos en movimiento. No se despliega: para usarla, copia `lib/mascotaMotion.js` como `_motion.js` y cada
`<pose>/mascota-rig.json` como `_rig-<pose>.json` junto a ella, sírvela con cualquier servidor estático y abre
`frames.html?pose=salto|pensando|parado` (opcional `&cols=N`). Con `&lab=1&part=<id>&angles=a,b,c` prueba ángulos sueltos de una parte.
