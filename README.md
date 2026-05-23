# 💖 Tu Página Especial - Instrucciones

Bienvenido a esta experiencia emocional y cinematográfica creada especialmente para Chris.

## Archivos Incluidos

- `index.html` - Estructura principal de la página
- `style.css` - Estilos con animaciones y glassmorphism
- `script.js` - Funcionalidades y interactividad
- `data/content.js` - Contenido (cartas, poemas, mensajes, preguntas)
- `music/ambience.mp3` - Música ambiental melancólica

## Cómo Usar

### Opción 1: Servidor Local (Recomendado)

```bash
cd /home/rasalhgul/pagina-especial
python3 -m http.server 8000
```

Luego abre en tu navegador: `http://localhost:8000`

### Opción 2: Abrir Directamente

Simplemente abre `index.html` en tu navegador (algunos navegadores requieren un servidor local para el audio).

## Navegación

1. **Pantalla de Bienvenida**: Click en "Entrar al corazón ✨"
2. **Menú Principal**: 7 opciones
   - 🖤 **Abrir corazón**: Modal con "Te amo" en 8 idiomas
   - 🥀 **Carta**: 3 cartas románticas
   - 🌙 **Mensajes**: Mensajes bonitos aleatorios
   - 📖 **Poemas**: 4 poemas melancólicos
   - 💀 **Preguntas**: 10 preguntas importantes
   - ✨ **Chat**: Conversación libre
   - 🎵 **Música**: Control de reproducción

## Secciones Especiales

### Abrir mi Corazón
- Modal cinematográfico
- "Te amo" aparece en 8 idiomas con animación escalonada
- Corazón animado con glow

### Preguntas (Lo Más Importante)
- **10 preguntas** mostradas una por una
- Opciones: "Sí quiero 🖤", "Tal vez 🌙", "No 💔"
- Campo de justificación **opcional**
- La última pregunta es especial y emocional
- Resumen visual de todas las respuestas al final
- Opción para responder de nuevo

### Chat
- Escribe mensajes libremente
- Los mensajes se guardan automáticamente
- Historial visual con timestamps
- Botón "Enviar al creador 🖤"

## Datos Guardados

Toda la información se guarda **localmente** en el navegador usando `localStorage`:
- Respuestas a preguntas
- Mensajes de chat
- Sección actual visitada
- Estado de la música

Los datos **NO se envían a ningún servidor** - todo es privado y local.

## Características Especiales

✨ **Animaciones Cinematográficas**
- Transiciones suaves entre secciones
- Efectos de glow y brillos
- Animaciones de corazón
- Niebla animada de fondo

🎨 **Estética Dark Romance**
- Colores: Negro, morado oscuro, azul nocturno, gris humo
- Luna brillante gótica
- Partículas flotantes
- Glassmorphism elegante

🎵 **Música Ambiental**
- Reproducción automática al primer click
- Loop infinito
- Controles elegantes

## Problemas Comunes

**La música no suena:**
- Haz click en cualquier lugar de la página para activar (restricción del navegador)
- Algunos navegadores silencian audio automáticamente en tabs de background

**Los datos no se guardan:**
- Verifica que el navegador permite localStorage
- Algunos navegadores en modo privado lo deshabilitan

**Las animaciones se ven lentas:**
- Actualiza la página (F5)
- Usa un navegador moderno (Chrome, Firefox, Edge, Safari)

## Personalización

Puedes editar el contenido en `data/content.js`:
- Agregar más mensajes en `messages`
- Editar cartas en `cartas`
- Agregar/modificar poemas
- Cambiar preguntas

## Soporte

Si encuentras algún error o tienes sugerencias, puedes:
1. Verificar la consola del navegador (F12)
2. Limpiar cache del navegador (Ctrl+Shift+Del)
3. Reiniciar el servidor

---

**Creado con amor para Chris 🖤**
