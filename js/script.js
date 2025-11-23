// === Estado y datos ===
let estado = 'inicio';
let semilla = null;
let tiempoInicio = 0;
let pg;
let audioContext = null;
let musicaBuffer = null;
let musicaSource = null;
let musicaReproduciendose = false;
let campanaBuffer = null;
let grabacionBlob = null;
let grabacionURL = null;
let audioGrabado = null;
let colorPrincipal = [0, 243, 255]; // Color cyan por defecto
let tonoDetectado = 0;
let particulas = [];
let cristalizando = false;
let progresosCristales = 0;
let mensajeActual = '';

const POOL_MENSAJES = [
  "Eso que esperas, sucederá antes de lo pensado.",
  "La semana que viene es ideal para empezar ese proyecto que tenés pensado.",
  "Alguien del pasado reaparecerá con una idea valiosa.",
  "Confía en esa intuición que hoy ignoraste.",
  "Un pequeño gesto tuyo cambiará el rumbo de otro.",
  "Lo que creías perdido vuelve en una forma inesperada.",
  "El silencio que mantuviste hoy era necesario.",
  "Pronto recibirás una señal disfrazada de casualidad.",
  "Tu creatividad está a punto de abrir una puerta nueva.",
  "No subestimes lo que hoy parece insignificante.",
  "Lo que buscas está más cerca de lo que imaginás, como una semilla que ya empezó a brotar.",
  "Antes de que cambie la luna, algo se acomodará en tu favor.",
  "Una conversación breve traerá claridad inesperada.",
  "Lo que hoy te inquieta será tu impulso mañana.",
  "El próximo amanecer traerá una respuesta que venías postergando.",
  "En la próxima estación, cosecharás el fruto de una decisión que tomes esta semana.",
  "La calma que sentiste recientemente no fue casual: algo está por alinearse.",
  "Cuando menos lo esperes, un detalle te va a revelar una verdad que necesitabas.",
  "No temas dar el primer paso: el camino se irá mostrando solo.",
  "Una propuesta llegará en silencio, pero tendrá un eco profundo.",
  "Lo que parecía lento empezará a tomar ritmo, como las lluvias que anuncian la nueva temporada.",
  "Un recuerdo viejo traerá una idea nueva.",
  "El esfuerzo de estos días rendirá más de lo que imaginás.",
  "Antes de que termine este ciclo, alguien te dará una pista valiosa.",
  "Tu paciencia está sembrando más de lo que creés.",
  "En tres mareas, verás el reflejo de lo que hoy plantaste.",
  "Entre el siguiente eclipse y la luna llena, una puerta se abrirá.",
  "Lo que el viento susurró esta mañana cobrará sentido en cinco lunas.",
  "Cuando las hojas cambien de color, tu perspectiva también lo hará.",
  "Antes del próximo solsticio, una coincidencia dejará de serlo.",
  "El ritmo que buscabas llegará con la próxima marea alta.",
  "En el espacio entre dos tormentas, encontrarás la respuesta.",
  "Lo que germinó en silencio florecerá antes del próximo equinoccio.",
  "Una estrella fugaz traerá consigo la señal que esperabas.",
  "Entre esta luna y la siguiente, un hilo invisible se tensará a tu favor.",
  "Cuando el sol cruce el horizonte exacto, todo tendrá más sentido.",
  "En el tiempo que tarda una mariposa en completar su ciclo, tu situación se transformará.",
  "Lo que parecía un final es apenas el cambio de estación.",
  "Antes de que las constelaciones roten, alguien pronunciará las palabras justas.",
  "El susurro del universo esta noche no es aleatorio: prestá atención.",
  "Tres encuentros fortuitos en la misma semana no son coincidencia.",
  "La respuesta que buscás ya está en algo que leíste hace tiempo.",
  "Un sueño recurrente está tratando de mostrarte el siguiente paso.",
  "Lo que hoy parece un desvío es en realidad un atajo.",
  "Alguien cercano tiene la pieza que te falta, solo hay que preguntar.",
  "El obstáculo de hoy será la anécdota que cuentes mañana con una sonrisa.",
  "Una habilidad olvidada volverá a ser útil muy pronto.",
  "El momento de soltar está más cerca de lo que pensás.",
  "Una puerta que se cerró dejó espacio para tres que van a abrirse.",
  "Lo que aprendiste en soledad brillará cuando lo compartas.",
  "Un mensaje que esperás llegará por un canal inesperado.",
  "La próxima vez que dudes, recordá por qué empezaste.",
  "Algo que considerabas un error resultará haber sido preparación.",
  "Una risa compartida abrirá un camino que creías cerrado.",
  "El próximo mes traerá la confirmación que tanto necesitabas.",
  "Lo que plantaste con constancia ya tiene raíces más profundas de lo que ves.",
  "Una sincronía perfecta está por manifestarse en tu vida.",
  "El eco de tus acciones pasadas vuelve amplificado y favorable.",
  "Algo que soltaste sin querer está volviendo mejorado.",
  "La próxima conversación importante será más ligera de lo esperado.",
  "Un ciclo de aprendizaje está cerrándose justo a tiempo.",
  "El equilibrio que buscabas se está ajustando sin que lo notes.",
  "Una inversión de tiempo o energía está por dar frutos tangibles.",
  "Lo que guardaste para el momento correcto, ese momento se acerca.",
  "Un cambio sutil en tu rutina desencadenará efectos sorprendentes.",
  "Alguien que admiras está notando tu progreso más de lo que creés.",
  "La próxima oportunidad vendrá disfrazada de pregunta casual.",
  "Un reencuentro próximo traerá más alegría de la anticipada.",
  "Lo que temías olvidar está más integrado en vos de lo que imaginás.",
  "Una pausa que consideraste pérdida de tiempo fue justo lo necesario.",
  "El viento está cambiando de dirección a tu favor.",
  "Una verdad que intuías será confirmada por una fuenteinesperada.",
  "Lo que compartís generosamente volverá multiplicado.",
  "Un patrón que reconociste te ahorrará un desvío innecesario.",
  "La claridad llegará no por pensar más, sino por soltar la urgencia.",
  "Algo que dejaste ir con dolor está abriendo espacio para algo mejor.",
  "Una colaboración inesperada traerá resultados que superarán tus expectativas.",
  "El próximo desafío será más fácil porque ya tenés las herramientas.",
  "Lo que parece caos desde cerca es orden visto desde lejos.",
  "Una pregunta que hiciste quedará respondida en los próximos días.",
  "El tiempo que dedicaste a otros volverá como apoyo cuando lo necesites.",
  "Una chispa de inspiración llegará en el momento menos pensado.",
  "Lo que hoy siembra dudas mañana será motivo de certeza.",
  "Un pequeño acto de valentía abrirá una cadena de posibilidades.",
  "La respuesta no está en hacer más, sino en confiar más.",
  "Algo que considerabas terminado tiene un capítulo adicional esperando.",
  "Una lección reciente se aplicará perfectamente a una situación nueva.",
  "El próximo ciclo lunar traerá la resolución que esperabas.",
  "Lo que construís en privado pronto pedirá ser compartido.",
  "Una conexión profunda está gestándose sin que lo fuerces.",
  "El momento de actuar llegará con una señal clara e innegable.",
  "Una verdad incómoda que aceptaste se convertirá en tu fortaleza.",
  "Lo que hoy es esfuerzo mañana será segunda naturaleza.",
  "Un hallazgo casual contendrá exactamente lo que necesitabas encontrar.",
  "La próxima vez que confíes en tu instinto, acertarás completamente.",
  "Algo que viste como distracción era en realidad parte del proceso.",
  "Una revelación personal cambiará cómo ves una relación cercana.",
  "El coraje que mostraste recientemente inspiró a alguien que no conocés.",
  "Lo que soltaste con miedo volverá transformado y a su tiempo justo.",
  "Una vieja aspiración está por tomar una forma completamente nueva.",
  "El descanso que te permitís ahora multiplicará tu energía después.",
  "Algo termina para que lo verdaderamente tuyo pueda comenzar.",
  "Una palabra que dijiste en el momento exacto cambiará algo importante.",
  "Lo que cultivaste con paciencia ya está listo para la cosecha.",
  "Un encuentro breve tendrá un impacto duradero y hermoso.",
  "La próxima vez que te sientas perdido, mirá cuánto ya recorriste.",
  "Lo que necesitás saber llegará en forma de historia, no de respuesta directa.",
  "Un final que dolió hizo espacio para un comienzo más alineado con vos.",
  "La sincronía entre tu deseo y la oportunidad está afinándose.",
  "Un paso atrás que diste era en realidad impulso para saltar más lejos.",
  "Lo que hoy es confusión mañana será la claridad que cambie todo.",
  "Una intuición reciente merece más crédito del que le diste.",
  "El próximo giro inesperado será favorable y llegará sin esfuerzo.",
  "Lo que compartiste con vulnerabilidad creó un lazo más fuerte de lo que sabés.",
  "Una espera que te frustró estaba alineando piezas que aún no veías.",
  "El siguiente ciclo trae la oportunidad de aplicar todo lo aprendido.",
  "Una decisión que tomaste con temor resultará ser de las más acertadas.",
  "Lo que guardás en el corazón está pidiendo ser expresado.",
  "Un cambio pequeño en tu perspectiva abrirá un panorama completamente nuevo.",
  "La próxima risa espontánea será portal a una conexión genuina.",
  "Lo que hoy parece incierto mañana será el fundamento de tu confianza."
];
let ultimosMensajes = [];

// === AUDIO ===
async function cargarMusica() {
  try {
    const response = await fetch('audio/journey.mp3');
    if (!response.ok) throw new Error('Archivo no encontrado');
    const arrayBuffer = await response.arrayBuffer();
    musicaBuffer = await audioContext.decodeAudioData(arrayBuffer);
    reproducirMusica();
  } catch (err) {
    console.warn('Música no cargada:', err.message);
  }
}

async function cargarCampana() {
  try {
    const response = await fetch('audio/campana.mp3');
    if (!response.ok) throw new Error('Archivo no encontrado');
    const arrayBuffer = await response.arrayBuffer();
    campanaBuffer = await audioContext.decodeAudioData(arrayBuffer);
  } catch (err) {
    console.warn('Campana no cargada:', err.message);
  }
}

function reproducirCampana() {
  if (!campanaBuffer) return;
  const source = audioContext.createBufferSource();
  source.buffer = campanaBuffer;
  const gainNode = audioContext.createGain();
  gainNode.gain.value = 0.3;
  source.connect(gainNode);
  gainNode.connect(audioContext.destination);
  source.start();
}

function reproducirMusica() {
  if (!musicaBuffer || musicaReproduciendose) return;
  musicaSource = audioContext.createBufferSource();
  musicaSource.buffer = musicaBuffer;
  musicaSource.loop = true;
  const gainNode = audioContext.createGain();
  gainNode.gain.value = 0.15;
  musicaSource.connect(gainNode);
  gainNode.connect(audioContext.destination);
  musicaSource.start();
  musicaReproduciendose = true;
  
  // Manejar cuando la fuente se detiene
  musicaSource.onended = () => {
    musicaReproduciendose = false;
    musicaSource = null;
  };
}

function detenerMusica() {
  if (musicaSource && musicaReproduciendose) {
    musicaSource.stop();
    musicaSource = null;
  }
  musicaReproduciendose = false;
}

function elegirMensaje() {
  const disponibles = POOL_MENSAJES.filter(m => !ultimosMensajes.includes(m));
  if (disponibles.length === 0) {
    ultimosMensajes = [];
    return elegirMensaje();
  }
  const msg = disponibles[Math.floor(Math.random() * disponibles.length)];
  ultimosMensajes.push(msg);
  if (ultimosMensajes.length > 5) ultimosMensajes.shift();
  return msg;
}

// === VOZ (MEJORADA CON PREVIEW) ===
async function grabarVoz() {
  if (estado !== 'inicio') return;

  // Detener música antes de grabar
  detenerMusica();
  document.getElementById('start').textContent = "Escuchando... (3s)";
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    const chunks = [];

    mediaRecorder.ondataavailable = e => chunks.push(e.data);
    mediaRecorder.onstop = async () => {
      stream.getTracks().forEach(track => track.stop());
      grabacionBlob = new Blob(chunks, { type: 'audio/webm' });
      grabacionURL = URL.createObjectURL(grabacionBlob);
      
      // Mostrar controles de preview
      document.getElementById('start').style.display = 'none';
      document.getElementById('controles-grabacion').style.display = 'flex';
      estado = 'grabado';
    };

    mediaRecorder.start();
    setTimeout(() => mediaRecorder.stop(), 3000);
  } catch (err) {
    alert("Error con el micrófono: " + err.message);
    document.getElementById('start').textContent = "Di tu nombre en voz alta";
  }
}

async function procesarGrabacion() {
  if (!grabacionBlob) return;
  
  try {
    const arrayBuffer = await grabacionBlob.arrayBuffer();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

    // Extraer semilla
    const duracion = audioBuffer.duration * 1000;
    const data = audioBuffer.getChannelData(0);
    let energia = 0;
    for (let i = 0; i < data.length; i++) energia += data[i] * data[i];
    energia = Math.sqrt(energia / data.length);
    semilla = Math.abs(Math.floor(duracion * 13 + energia * 1e6 * 17) % 1e9);

    // Detectar tono promedio (análisis simplificado de frecuencia)
    tonoDetectado = detectarTono(data, audioBuffer.sampleRate);
    colorPrincipal = tonoAColor(tonoDetectado);

    // Ocultar controles y comenzar dibujo
    document.getElementById('controles-grabacion').style.display = 'none';
    estado = 'dibujando';
    tiempoInicio = millis();

    // Limpiar recursos
    if (grabacionURL) URL.revokeObjectURL(grabacionURL);
  } catch (err) {
    alert("Error procesando audio: " + err.message);
  }
}

// Detectar tono dominante (frecuencia promedio)
function detectarTono(audioData, sampleRate) {
  // Método simplificado: contar cruces por cero para estimar frecuencia
  let cruces = 0;
  for (let i = 1; i < audioData.length; i++) {
    if ((audioData[i-1] >= 0 && audioData[i] < 0) || 
        (audioData[i-1] < 0 && audioData[i] >= 0)) {
      cruces++;
    }
  }
  const frecuencia = (cruces / 2) * (sampleRate / audioData.length);
  return frecuencia;
}

// Convertir frecuencia a color (escala cromática)
function tonoAColor(frecuencia) {
  // Rango típico voz humana: 85Hz (bajo) a 255Hz (alto)
  // Mapear a escala de color: rojo(0) -> naranja -> amarillo -> verde -> cyan -> azul -> violeta(300)
  const hue = map(frecuencia, 85, 255, 0, 300, true);
  
  // Convertir HSL a RGB
  const h = hue / 360;
  const s = 0.9;
  const l = 0.6;
  
  let r, g, b;
  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }
  
  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

// Función auxiliar map con constrain
function map(value, start1, stop1, start2, stop2, withinBounds) {
  const mapped = start2 + (stop2 - start2) * ((value - start1) / (stop1 - start1));
  if (!withinBounds) return mapped;
  return start2 < stop2 ? 
    Math.max(Math.min(mapped, stop2), start2) : 
    Math.max(Math.min(mapped, start2), stop2);
}

// === P5 ===
function setup() {
  const size = Math.min(windowWidth * 0.9, windowHeight * 0.6, 600);
  pg = createGraphics(size, size);
  const canvas = createCanvas(size, size);
  canvas.parent('zona-dibujo');
  
  // Inicializar partículas
  for (let i = 0; i < 50; i++) {
    particulas.push(new Particula());
  }
}

// Clase Partícula
class Particula {
  constructor() {
    this.reiniciar();
  }
  
  reiniciar() {
    const angulo = random(TWO_PI);
    const radio = width / 2 + random(10, 30);
    this.x = width / 2 + cos(angulo) * radio;
    this.y = height / 2 + sin(angulo) * radio;
    this.vx = random(-0.5, 0.5);
    this.vy = random(-0.5, 0.5);
    this.tam = random(2, 6);
    this.alpha = random(100, 200);
    this.vida = 255;
  }
  
  actualizar() {
    this.x += this.vx;
    this.y += this.vy;
    this.vida -= 2;
    
    if (this.vida <= 0) {
      this.reiniciar();
    }
  }
  
  mostrar() {
    push();
    noStroke();
    fill(colorPrincipal[0], colorPrincipal[1], colorPrincipal[2], this.vida * 0.6);
    ellipse(this.x, this.y, this.tam);
    pop();
  }
}

function draw() {
  if (estado !== 'dibujando' && estado !== 'listo' && estado !== 'mensaje') {
    clear();
    return;
  }
  if (!semilla) return;

  const t = millis() - tiempoInicio;
  const totalDuracion = 12000;

  // Solo redibujar el buffer si estamos en estado 'dibujando'
  if (estado === 'dibujando') {
    pg.background(10, 10, 26, 10);
    pg.colorMode(RGB, 255, 255, 255, 255);
    pg.randomSeed(semilla);
  }

  // Etapa 1: Círculos (0–3s)
  if (estado === 'dibujando' && t > 0) {
    const progreso = Math.min(t / 3000, 1);
    const total = 35;
    const n = Math.floor(total * progreso);
    for (let i = 0; i < n; i++) {
      const x = pg.random(pg.width);
      const y = pg.random(pg.height);
      const tam = pg.random(8, 45);
      const alpha = pg.map(i, 0, total, 40, 100);
      pg.fill(colorPrincipal[0], colorPrincipal[1], colorPrincipal[2], alpha);
      pg.noStroke();
      pg.ellipse(x, y, tam);
    }
  }

  // Etapa 2: Líneas (3–6s)
  if (estado === 'dibujando' && t > 3000) {
    const tiempoEtapa = t - 3000;
    const progreso = Math.min(tiempoEtapa / 3000, 1);
    const total = 20;
    const n = Math.floor(total * progreso);
    pg.stroke(colorPrincipal[0], colorPrincipal[1], colorPrincipal[2], 90);
    pg.strokeWeight(1.5);
    pg.noFill();
    for (let i = 0; i < n; i++) {
      const x1 = pg.random(pg.width);
      const y1 = pg.random(pg.height);
      const x2 = x1 + pg.random(-120, 120);
      const y2 = y1 + pg.random(-120, 120);
      pg.line(x1, y1, x2, y2);
    }
  }

  // Etapa 3: Espirales (6–9s)
  if (estado === 'dibujando' && t > 6000) {
    const tiempoEtapa = t - 6000;
    const progreso = Math.min(tiempoEtapa / 3000, 1);
    const total = 3;
    const n = Math.floor(total * progreso);
    pg.noFill();
    pg.stroke(colorPrincipal[0], colorPrincipal[1], colorPrincipal[2], 120);
    pg.strokeWeight(2);
    for (let e = 0; e < n; e++) {
      const cx = pg.random(120, pg.width - 120);
      const cy = pg.random(120, pg.height - 120);
      pg.beginShape();
      for (let a = 0; a < pg.TWO_PI * 3; a += 0.1) {
        const r = pg.map(a, 0, pg.TWO_PI * 3, 3, 50);
        const x = cx + pg.cos(a) * r;
        const y = cy + pg.sin(a) * r;
        pg.vertex(x, y);
      }
      pg.endShape();
    }
  }

  // Etapa 4: Curvas Bézier (9–12s)
  if (estado === 'dibujando' && t > 9000) {
    const tiempoEtapa = t - 9000;
    const progreso = Math.min(tiempoEtapa / 3000, 1);
    const total = 8;
    const n = Math.floor(total * progreso);
    pg.noFill();
    pg.stroke(colorPrincipal[0], colorPrincipal[1], colorPrincipal[2], 100);
    pg.strokeWeight(2.5);
    for (let i = 0; i < n; i++) {
      const x1 = pg.random(pg.width);
      const y1 = pg.random(pg.height);
      const x2 = pg.random(pg.width);
      const y2 = pg.random(pg.height);
      const cx1 = (x1 + x2) / 2 + pg.random(-120, 120);
      const cy1 = (y1 + y2) / 2 + pg.random(-120, 120);
      const cx2 = cx1 + pg.random(-60, 60);
      const cy2 = cy1 + pg.random(-60, 60);
      pg.bezier(x1, y1, cx1, cy1, cx2, cy2, x2, y2);
    }
  }

  // Aplicar máscara circular antes de dibujar
  clear();
  background(10, 10, 26);
  
  // Dibujar partículas si estamos dibujando
  if (estado === 'dibujando') {
    for (let p of particulas) {
      p.actualizar();
      p.mostrar();
    }
  }
  
  // Crear máscara circular y aplicarla
  push();
  translate(width/2, height/2);
  
  // Dibujar la imagen dentro del círculo usando clip
  drawingContext.save();
  drawingContext.beginPath();
  drawingContext.arc(0, 0, width/2, 0, Math.PI * 2);
  drawingContext.clip();
  imageMode(CENTER);
  image(pg, 0, 0);
  drawingContext.restore();
  pop();

  // Efecto de cristalización al finalizar
  if (estado === 'listo' && cristalizando) {
    progresosCristales += 0.02;
    if (progresosCristales >= 1) {
      cristalizando = false;
    }
    
    // Dibujar cristales tipo Voronoi
    push();
    translate(width/2, height/2);
    stroke(255, 255, 255, (1 - progresosCristales) * 200);
    strokeWeight(2);
    noFill();
    
    for (let i = 0; i < 30; i++) {
      const ang = (i / 30) * TWO_PI;
      const r1 = width/2 * progresosCristales * 0.3;
      const r2 = width/2 * progresosCristales * 0.6;
      const x1 = cos(ang) * r1;
      const y1 = sin(ang) * r1;
      const x2 = cos(ang) * r2;
      const y2 = sin(ang) * r2;
      line(x1, y1, x2, y2);
    }
    
    // Flash blanco
    if (progresosCristales < 0.3) {
      fill(255, 255, 255, (0.3 - progresosCristales) * 400);
      noStroke();
      ellipse(0, 0, width);
    }
    pop();
  }

  if (t >= totalDuracion && estado === 'dibujando') {
    estado = 'listo';
    cristalizando = true;
    progresosCristales = 0;
    document.getElementById('btn-mensaje').style.display = 'inline-block';
  }
}

function windowResized() {
  const size = Math.min(windowWidth * 0.9, windowHeight * 0.6, 600);
  resizeCanvas(size, size);
  pg = createGraphics(size, size);
}

// === INTERACCIÓN ===
document.getElementById('btn-comenzar').onclick = async () => {
  // Crear AudioContext e iniciar música con la primera interacción
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    await cargarMusica();
    await cargarCampana();
  }
  if (audioContext.state === 'suspended') {
    await audioContext.resume();
  }
  
  document.getElementById('intro').style.display = 'none';
  document.getElementById('main').style.display = 'flex';
  estado = 'inicio';
};

document.getElementById('btn-historia').onclick = () => {
  document.getElementById('historia-modal').classList.add('active');
};

document.getElementById('btn-cerrar-historia').onclick = () => {
  document.getElementById('historia-modal').classList.remove('active');
};

document.getElementById('btn-mensaje').onclick = () => {
  if (estado !== 'listo') return;
  reproducirCampana();
  mensajeActual = elegirMensaje();
  document.getElementById('mensaje').textContent = mensajeActual;
  document.getElementById('mensaje').style.opacity = '1';
  document.getElementById('btn-mensaje').style.display = 'none';
  document.getElementById('btn-ver-carta').style.display = 'inline-block';
  document.getElementById('btn-volver').style.display = 'inline-block';
  estado = 'mensaje';
  reproducirMusica();
};

document.getElementById('btn-ver-carta').onclick = () => {
  generarCarta();
  document.getElementById('carta-modal').classList.add('active');
};

document.getElementById('btn-cerrar-carta').onclick = () => {
  document.getElementById('carta-modal').classList.remove('active');
};

document.getElementById('btn-descargar-carta').onclick = () => {
  descargarCarta();
};

function generarCarta() {
  // Copiar el canvas principal a la carta
  const cartaCanvas = document.getElementById('carta-imagen');
  cartaCanvas.width = 280;
  cartaCanvas.height = 280;
  const ctx = cartaCanvas.getContext('2d');
  
  // Dibujar fondo
  ctx.fillStyle = '#0a0a1a';
  ctx.fillRect(0, 0, 280, 280);
  
  // Dibujar el círculo con la imagen
  ctx.save();
  ctx.beginPath();
  ctx.arc(140, 140, 140, 0, Math.PI * 2);
  ctx.clip();
  ctx.drawImage(pg.canvas, 0, 0, pg.width, pg.height, 0, 0, 280, 280);
  ctx.restore();
  
  // Borde del círculo
  ctx.strokeStyle = '#d4af37';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(140, 140, 140, 0, Math.PI * 2);
  ctx.stroke();
  
  // Actualizar mensaje y fecha
  document.getElementById('carta-mensaje').textContent = mensajeActual;
  const ahora = new Date();
  const fecha = ahora.toLocaleDateString('es-AR', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  const hora = ahora.toLocaleTimeString('es-AR', { 
    hour: '2-digit', 
    minute: '2-digit' 
  });
  document.getElementById('carta-fecha').textContent = `${fecha} • ${hora}`;
}

function descargarCarta() {
  // Crear canvas temporal más grande para la carta completa
  const tempCanvas = document.createElement('canvas');
  tempCanvas.width = 400;
  tempCanvas.height = 600;
  const ctx = tempCanvas.getContext('2d');
  
  // Fondo degradado
  const gradient = ctx.createLinearGradient(0, 0, 400, 600);
  gradient.addColorStop(0, '#1a1a2e');
  gradient.addColorStop(1, '#16213e');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 400, 600);
  
  // Borde dorado
  ctx.strokeStyle = '#d4af37';
  ctx.lineWidth = 6;
  ctx.strokeRect(3, 3, 394, 594);
  
  // Título
  ctx.fillStyle = '#d4af37';
  ctx.font = 'bold 32px Cinzel, serif';
  ctx.textAlign = 'center';
  ctx.fillText('FONOTIPIA', 200, 60);
  
  // Línea debajo del título
  ctx.strokeStyle = 'rgba(212, 175, 55, 0.5)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(60, 80);
  ctx.lineTo(340, 80);
  ctx.stroke();
  
  // Imagen circular
  const cartaCanvas = document.getElementById('carta-imagen');
  ctx.drawImage(cartaCanvas, 60, 110);
  
  // Mensaje
  ctx.fillStyle = '#e0e0e0';
  ctx.font = 'italic 16px Spectral, serif';
  ctx.textAlign = 'center';
  const palabras = mensajeActual.split(' ');
  let linea = '';
  let y = 440;
  const maxWidth = 320;
  
  for (let palabra of palabras) {
    const testLinea = linea + palabra + ' ';
    const metrics = ctx.measureText(testLinea);
    if (metrics.width > maxWidth && linea !== '') {
      ctx.fillText(linea, 200, y);
      linea = palabra + ' ';
      y += 24;
    } else {
      linea = testLinea;
    }
  }
  ctx.fillText(linea, 200, y);
  
  // Fecha
  const fechaTexto = document.getElementById('carta-fecha').textContent;
  ctx.fillStyle = '#a0a0a0';
  ctx.font = '14px Spectral, serif';
  ctx.fillText(fechaTexto, 200, 560);
  
  // Firma del desarrollador
  ctx.fillStyle = '#707070';
  ctx.font = 'italic 11px Spectral, serif';
  ctx.fillText('Carlos Guariglia © 2025', 200, 585);
  
  // Ornamentos en las esquinas
  ctx.strokeStyle = 'rgba(212, 175, 55, 0.3)';
  ctx.lineWidth = 2;
  // Superior izquierda
  ctx.beginPath();
  ctx.moveTo(20, 60);
  ctx.lineTo(20, 20);
  ctx.lineTo(60, 20);
  ctx.stroke();
  // Superior derecha
  ctx.beginPath();
  ctx.moveTo(340, 20);
  ctx.lineTo(380, 20);
  ctx.lineTo(380, 60);
  ctx.stroke();
  // Inferior izquierda
  ctx.beginPath();
  ctx.moveTo(20, 540);
  ctx.lineTo(20, 580);
  ctx.lineTo(60, 580);
  ctx.stroke();
  // Inferior derecha
  ctx.beginPath();
  ctx.moveTo(340, 580);
  ctx.lineTo(380, 580);
  ctx.lineTo(380, 540);
  ctx.stroke();
  
  // Descargar
  tempCanvas.toBlob((blob) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `fonotipia-${Date.now()}.png`;
    a.click();
    URL.revokeObjectURL(url);
  });
}

document.getElementById('btn-volver').onclick = () => {
  // Volver a la pantalla de intro
  document.getElementById('main').style.display = 'none';
  document.getElementById('intro').style.display = 'flex';
  
  // Resetear estado
  estado = 'inicio';
  semilla = null;
  mensajeActual = '';
  colorPrincipal = [0, 243, 255];
  document.getElementById('start').style.display = 'inline-block';
  document.getElementById('start').textContent = "Di tu nombre en voz alta";
  document.getElementById('btn-mensaje').style.display = 'none';
  document.getElementById('btn-ver-carta').style.display = 'none';
  document.getElementById('btn-volver').style.display = 'none';
  document.getElementById('mensaje').style.opacity = '0';
  document.getElementById('mensaje').textContent = '';
  
  // Limpiar canvas
  clear();
  pg.clear();
};

// Inicializar sin AudioContext
document.getElementById('start').onclick = grabarVoz;

// Controles de grabación
document.getElementById('btn-escuchar').onclick = () => {
  if (grabacionURL) {
    if (audioGrabado) audioGrabado.pause();
    audioGrabado = new Audio(grabacionURL);
    audioGrabado.play();
  }
};

document.getElementById('btn-usar-grabacion').onclick = procesarGrabacion;

document.getElementById('btn-regrabar').onclick = () => {
  if (audioGrabado) audioGrabado.pause();
  if (grabacionURL) URL.revokeObjectURL(grabacionURL);
  grabacionBlob = null;
  grabacionURL = null;
  audioGrabado = null;
  document.getElementById('controles-grabacion').style.display = 'none';
  document.getElementById('start').style.display = 'inline-block';
  document.getElementById('start').textContent = "Di tu nombre en voz alta";
  estado = 'inicio';
};