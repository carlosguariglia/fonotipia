# Fonotipia

Un proyecto web interactivo que genera arte adivinatorio basado en las vibraciones de la voz humana. Pronuncia tu nombre y descubre formas únicas que representan tu "huella vocal".

## Descripción

Fonotipia es una experiencia web que combina audio, visuales generativos y mensajes inspiradores. El usuario graba su voz pronunciando su nombre, y el sistema analiza las vibraciones para crear un patrón visual único en un canvas. Luego, revela un mensaje personalizado y permite compartir la "carta" generada.

Inspirado en antiguas técnicas adivinatorias, recreado digitalmente con precisión milimétrica.

## Tecnologías Usadas

- **HTML5**: Estructura de la página.
- **CSS3**: Estilos y diseño responsivo.
- **JavaScript (ES6+)**: Lógica de la aplicación.
- **p5.js**: Biblioteca para gráficos y animaciones en canvas.
- **Web Audio API**: Para grabación y análisis de audio.
- **imgbb API**: Para subir imágenes y compartir por email.

## Estructura del Proyecto

```
Fonotipia_01.1/
├── index.html          # Página principal
├── css/
│   └── styles.css      # Estilos CSS
├── js/
│   └── script.js       # Lógica JavaScript
├── audio/              # Archivos de audio (música y sonidos)
└── Fonotipia_01.1.code-workspace  # Configuración de VS Code
```

## Instalación y Ejecución

1. **Clona o descarga** el repositorio.
2. **Abre `index.html`** en un navegador web moderno (Chrome, Firefox, Edge).
3. Para desarrollo local, ejecuta un servidor simple:
   ```
   python3 -m http.server 8000
   ```
   Luego visita `http://localhost:8000`.

**Nota**: Requiere micrófono para grabación de voz y un cliente de email instalado para compartir.

## Uso

1. **Inicio**: Haz clic en "Comenzar" para ver la historia o saltar directamente.
2. **Grabación**: Di tu nombre en voz alta cuando aparezca el botón "Di tu nombre en voz alta".
3. **Preview**: Escucha, usa o regraba la grabación.
4. **Generación**: El sistema analiza el audio y dibuja formas en el canvas durante 12 segundos.
5. **Revelación**: Haz clic en "Revelar mensaje" para ver un mensaje inspirador.
6. **Carta**: Haz clic en "Ver Carta" para generar la carta completa.
7. **Compartir**:
   - **Descargar**: Guarda la carta como PNG.
   - **Enviar por email**: Sube la imagen a imgbb y abre tu cliente de email con un enlace.
8. **Reiniciar**: Usa "Volver al inicio" para empezar de nuevo.

## Funcionalidades Clave

- **Análisis de voz**: Detecta tono y genera semilla para patrones únicos.
- **Animación generativa**: Círculos, líneas, espirales y curvas Bézier basadas en el audio.
- **Mensajes aleatorios**: Pool de mensajes inspiradores sin repeticiones recientes.
- **Compartir**: Integración con email vía imgbb.
- **Responsive**: Diseñado para desktop y móvil.

## Configuración

- **API Key de imgbb**: Para compartir por email, incluye tu key en `js/script.js` (línea ~811). Obtén una gratuita en [imgbb.com](https://api.imgbb.com/).
- **Audio**: Asegúrate de que `audio/journey.mp3` y `audio/campana.mp3` existan para música y sonidos.

## Contribución

Si quieres contribuir:
1. Fork el repo.
2. Crea una rama para tu feature.
3. Haz commits descriptivos.
4. Abre un Pull Request.

Ideas para mejoras: Más análisis de audio, temas visuales, integración con redes sociales.

## Créditos

- **Idea y desarrollo**: Carlos Guariglia © 2025
- **Inspiración**: Técnicas adivinatorias antiguas de Anatolia.
- **Bibliotecas**: p5.js, Web Audio API.

## Licencia

Este proyecto es de código abierto. Usa bajo tu responsabilidad. No se permite uso comercial sin permiso.

---

¡Disfruta explorando tu huella vocal! Si tienes preguntas, abre un issue.