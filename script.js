// ESTADO GLOBAL
const state = {
  currentSection: null,
  currentCartaIndex: 0,
  currentPoemIndex: 0,
  currentQuestionIndex: 0,
  questionsAnswered: [],
  chatMessages: [],
  musicPlaying: true
};

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
  initializeParticles();
  initializeAudio();
  loadState();
});

// ============================================
// FUNCIONES DE INICIALIZACIÓN
// ============================================

function initializeParticles() {
  if (typeof particlesJS === 'function') {
    particlesJS('particles-js', {
      particles: {
        number: { value: 60 },
        color: { value: '#c77dff' },
        shape: { type: 'circle' },
        opacity: { value: 0.5, random: true },
        size: { value: 3, random: true },
        line_linked: {
          enable: false
        },
        move: {
          enable: true,
          speed: 0.8,
          random: true
        }
      },
      interactivity: {
        detect_on: 'canvas',
        events: {
          onhover: { enable: false }
        }
      }
    });
  }
}

function initializeAudio() {
  const audio = document.getElementById('ambientMusic');
  if (audio) {
    // Primera interacción activa el audio
    document.body.addEventListener('click', function playAudio() {
      audio.play().catch(() => {});
      document.body.removeEventListener('click', playAudio);
    }, { once: true });
  }
}

// ============================================
// PERSISTENCIA DE DATOS
// ============================================

function saveState() {
  localStorage.setItem('heartPageState', JSON.stringify(state));
}

function loadState() {
  const saved = localStorage.getItem('heartPageState');
  if (saved) {
    try {
      Object.assign(state, JSON.parse(saved));
    } catch (e) {
      console.error('Error loading state:', e);
    }
  }
}

// ============================================
// PANTALLA DE BIENVENIDA
// ============================================

function enterHeart() {
  const welcomeScreen = document.getElementById('welcomeScreen');
  const mainContainer = document.getElementById('mainContainer');

  welcomeScreen.style.animation = 'fadeOut 0.8s ease-out forwards';
  setTimeout(() => {
    welcomeScreen.style.display = 'none';
    mainContainer.style.display = 'flex';
  }, 800);
}

// ============================================
// NAVEGACIÓN DE SECCIONES
// ============================================

function showSection(section) {
  state.currentSection = section;
  const contentArea = document.getElementById('contentArea');

  // Limpiar contenido anterior
  contentArea.innerHTML = '';
  contentArea.style.animation = 'none';
  setTimeout(() => {
    contentArea.style.animation = 'slideUp 0.5s ease-out';
  }, 10);

  switch (section) {
    case 'heart':
      showHeartSection();
      break;
    case 'carta':
      showCartaSection();
      break;
    case 'mensajes':
      showMensajesSection();
      break;
    case 'poemas':
      showPoemasSection();
      break;
    case 'preguntas':
      showPreguntasSection();
      break;
    case 'chat':
      showChatSection();
      break;
  }

  saveState();
}

// ============================================
// SECCIÓN: ABRIR MI CORAZÓN
// ============================================

function showHeartSection() {
  const contentArea = document.getElementById('contentArea');
  contentArea.innerHTML = `
    <div class="heart-section">
      <h2>🖤 Abrir Mi Corazón 🖤</h2>
      <p>Haz click en el botón para revelar el mensaje más importante</p>
      <button class="btn-open-heart" onclick="openHeartModal()">Abrir Corazón ✨</button>
    </div>
  `;
}

function openHeartModal() {
  const modal = document.getElementById('heartModal');
  modal.style.display = 'flex';

  // Mostrar corazón animado
  const heartShape = document.querySelector('.heart-shape');
  if (heartShape) {
    heartShape.textContent = '🖤';
  }

  // Generar idiomas
  const loveLanguages = document.getElementById('loveLanguages');
  loveLanguages.innerHTML = '';

  pageContent.idiomas.forEach((item, index) => {
    const delay = index * 0.8; // Stagger de 0.8s entre idiomas
    setTimeout(() => {
      const div = document.createElement('div');
      div.className = 'love-language-item';
      div.style.animationDelay = '0s';
      div.innerHTML = `
        <div class="lang">${item.idioma}</div>
        <div class="text">${item.texto}</div>
      `;
      loveLanguages.appendChild(div);
    }, delay * 1000);
  });
}

function closeHeartModal() {
  const modal = document.getElementById('heartModal');
  modal.style.animation = 'fadeOut 0.3s ease-out forwards';
  setTimeout(() => {
    modal.style.display = 'none';
    modal.style.animation = '';
  }, 300);
}

// ============================================
// SECCIÓN: CARTAS
// ============================================

function showCartaSection() {
  const contentArea = document.getElementById('contentArea');
  const carta = pageContent.cartas[state.currentCartaIndex];

  contentArea.innerHTML = `
    <div class="carta-section">
      <h2>🥀 ${carta.titulo}</h2>
      <div class="carta-contenido">${carta.contenido.split('\n').map(p => `<p>${p}</p>`).join('')}</div>
      <div class="carta-buttons">
        <button class="btn-nav" onclick="previousCarta()" ${state.currentCartaIndex === 0 ? 'disabled' : ''}>
          ← Anterior
        </button>
        <span style="color: #8c52ff; align-self: center;">
          ${state.currentCartaIndex + 1} / ${pageContent.cartas.length}
        </span>
        <button class="btn-nav" onclick="nextCarta()" ${state.currentCartaIndex === pageContent.cartas.length - 1 ? 'disabled' : ''}>
          Siguiente →
        </button>
      </div>
    </div>
  `;
}

function nextCarta() {
  if (state.currentCartaIndex < pageContent.cartas.length - 1) {
    state.currentCartaIndex++;
    showCartaSection();
    saveState();
  }
}

function previousCarta() {
  if (state.currentCartaIndex > 0) {
    state.currentCartaIndex--;
    showCartaSection();
    saveState();
  }
}

// ============================================
// SECCIÓN: MENSAJES ALEATORIOS
// ============================================

function showMensajesSection() {
  const contentArea = document.getElementById('contentArea');
  const mensaje = pageContent.messages[Math.floor(Math.random() * pageContent.messages.length)];

  contentArea.innerHTML = `
    <div class="mensaje-section">
      <h2>🌙 Mensajes</h2>
      <div class="mensaje-display">
        <p class="mensaje-text">${mensaje}</p>
      </div>
      <button class="btn-random" onclick="showSection('mensajes')">
        Otro Mensaje ✨
      </button>
    </div>
  `;
}

// ============================================
// SECCIÓN: POEMAS
// ============================================

function showPoemasSection() {
  const contentArea = document.getElementById('contentArea');
  const poema = pageContent.poemas[state.currentPoemIndex];

  contentArea.innerHTML = `
    <div class="poema-section">
      <h2>📖 ${poema.titulo}</h2>
      <div class="poema-contenido">
        ${poema.contenido.split('\n').map(verso => `<p>${verso}</p>`).join('')}
      </div>
      <div class="poema-nav">
        <button class="btn-nav" onclick="previousPoema()" ${state.currentPoemIndex === 0 ? 'disabled' : ''}>
          ← Anterior
        </button>
        <span style="color: #8c52ff;">
          ${state.currentPoemIndex + 1} / ${pageContent.poemas.length}
        </span>
        <button class="btn-nav" onclick="nextPoema()" ${state.currentPoemIndex === pageContent.poemas.length - 1 ? 'disabled' : ''}>
          Siguiente →
        </button>
      </div>
    </div>
  `;
}

function nextPoema() {
  if (state.currentPoemIndex < pageContent.poemas.length - 1) {
    state.currentPoemIndex++;
    showPoemasSection();
    saveState();
  }
}

function previousPoema() {
  if (state.currentPoemIndex > 0) {
    state.currentPoemIndex--;
    showPoemasSection();
    saveState();
  }
}

// ============================================
// SECCIÓN: PREGUNTAS (MÁS COMPLEJA)
// ============================================

function showPreguntasSection() {
  const contentArea = document.getElementById('contentArea');

  // Si ya respondió todas las preguntas, mostrar resumen
  if (state.questionsAnswered.length === pageContent.preguntas.length) {
    showResumenPreguntas();
    return;
  }

  const preguntaActual = pageContent.preguntas[state.questionsAnswered.length];
  const isLastQuestion = preguntaActual.tipo === 'final';

  const html = `
    <div class="preguntas-section ${isLastQuestion ? 'pregunta-final' : ''}">
      <div class="pregunta-progress">
        Pregunta <span class="pregunta-numero">${state.questionsAnswered.length + 1}</span> de ${pageContent.preguntas.length}
      </div>

      <div class="pregunta-display">
        <p class="pregunta-texto">${preguntaActual.texto}</p>
      </div>

      <div class="respuestas-container">
        <button class="btn-respuesta btn-si" onclick="responderPregunta('si', ${preguntaActual.id})">
          Sí quiero 🖤
        </button>
        <button class="btn-respuesta btn-tal-vez" onclick="responderPregunta('tal-vez', ${preguntaActual.id})">
          Tal vez 🌙
        </button>
        <button class="btn-respuesta btn-no" onclick="responderPregunta('no', ${preguntaActual.id})">
          No 💔
        </button>
      </div>

      <div class="justificacion-container" id="justificacionContainer">
        <label class="justificacion-label">¿Quieres agregar un comentario? (Opcional)</label>
        <textarea class="justificacion-input" id="justificacionInput" placeholder="Escribe aquí lo que sientas..."></textarea>
      </div>

      <button class="btn-siguiente" id="btnSiguiente" onclick="siguientePregunta()">
        Siguiente Pregunta →
      </button>
    </div>
  `;

  contentArea.innerHTML = html;
}

function responderPregunta(respuesta, preguntaId) {
  const justificacionContainer = document.getElementById('justificacionContainer');
  const btnSiguiente = document.getElementById('btnSiguiente');
  const botones = document.querySelectorAll('.btn-respuesta');

  // Mostrar campo de justificación
  justificacionContainer.classList.add('show');

  // Deshabilitar botones
  botones.forEach(btn => btn.disabled = true);

  // Guardar respuesta
  const preguntaActual = pageContent.preguntas[state.questionsAnswered.length];
  const justificacion = document.getElementById('justificacionInput').value;

  state.questionsAnswered.push({
    id: preguntaId,
    pregunta: preguntaActual.texto,
    respuesta,
    justificacion,
    timestamp: new Date().toLocaleString()
  });

  // Mostrar botón siguiente
  btnSiguiente.classList.add('show');

  // Guardar estado
  saveState();
}

function siguientePregunta() {
  if (state.questionsAnswered.length < pageContent.preguntas.length) {
    showPreguntasSection();
  }
}

function showResumenPreguntas() {
  const contentArea = document.getElementById('contentArea');

  const respuestaMap = {
    'si': '✅ Sí quiero',
    'tal-vez': '🌙 Tal vez',
    'no': '❌ No'
  };

  const html = `
    <div class="resumen-preguntas">
      <h2 class="resumen-titulo">💌 Tu Resumen</h2>
      <div class="resumen-grid">
        ${state.questionsAnswered.map((item, idx) => `
          <div class="resumen-item">
            <div class="resumen-item-numero">#${idx + 1}</div>
            <div class="resumen-item-pregunta">${item.pregunta}</div>
            <div class="resumen-item-respuesta">${respuestaMap[item.respuesta]}</div>
            ${item.justificacion ? `<div class="resumen-item-texto">"${item.justificacion}"</div>` : ''}
          </div>
        `).join('')}
      </div>
      <button class="btn-reiniciar-preguntas" onclick="reiniciarPreguntas()">
        Responder de Nuevo 🔄
      </button>
    </div>
  `;

  contentArea.innerHTML = html;
}

function reiniciarPreguntas() {
  state.questionsAnswered = [];
  state.currentQuestionIndex = 0;
  saveState();
  showPreguntasSection();
}

// ============================================
// SECCIÓN: CHAT
// ============================================

function showChatSection() {
  const contentArea = document.getElementById('contentArea');

  const html = `
    <div class="chat-section">
      <h2>✨ Conversa Conmigo</h2>
      <div class="chat-historial" id="chatHistorial">
        ${state.chatMessages.length === 0 ? '<div class="chat-vacio">No hay mensajes aún. ¡Deja uno para mí! 💕</div>' : ''}
        ${state.chatMessages.map(msg => `
          <div class="chat-mensaje">
            <div class="chat-mensaje-hora">${msg.timestamp}</div>
            <div class="chat-mensaje-texto">${escapeHtml(msg.texto)}</div>
          </div>
        `).join('')}
      </div>
      <div class="chat-input-container">
        <textarea class="chat-textarea" id="chatInput" placeholder="Escribe lo que sientas..." maxlength="500"></textarea>
        <button class="btn-enviar-chat" onclick="enviarMensajeChat()">Enviar 🖤</button>
      </div>
    </div>
  `;

  contentArea.innerHTML = html;

  // Scroll al final
  setTimeout(() => {
    const historial = document.getElementById('chatHistorial');
    historial.scrollTop = historial.scrollHeight;
  }, 100);
}

function enviarMensajeChat() {
  const input = document.getElementById('chatInput');
  const texto = input.value.trim();

  if (!texto) return;

  state.chatMessages.push({
    texto,
    timestamp: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
  });

  saveState();

  // Limpiar input y recargar sección
  input.value = '';
  showChatSection();
}

// ============================================
// MÚSICA
// ============================================

function toggleMusic() {
  const audio = document.getElementById('ambientMusic');
  const label = document.getElementById('musicLabel');

  if (audio.paused) {
    audio.play().catch(() => {});
    state.musicPlaying = true;
    label.textContent = 'Música';
  } else {
    audio.pause();
    state.musicPlaying = false;
    label.textContent = 'Reanudar';
  }

  saveState();
}

// ============================================
// UTILIDADES
// ============================================

function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}

// CSS animation fallback
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeOut {
    from { opacity: 1; }
    to { opacity: 0; }
  }
`;
document.head.appendChild(style);
