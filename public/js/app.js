// Estrellas decorativas
function initStars() {
  const contenedor = document.getElementById('stars');
  if (!contenedor) return;
  for (let i = 0; i < 40; i++) {
    const estrella = document.createElement('div');
    estrella.className = 'star';
    const tam = Math.random() * 3 + 1;
    estrella.style.width = tam + 'px';
    estrella.style.height = tam + 'px';
    estrella.style.left = Math.random() * 100 + '%';
    estrella.style.top = Math.random() * 100 + '%';
    estrella.style.animationDelay = (Math.random() * 4) + 's';
    contenedor.appendChild(estrella);
  }
}

// Menú móvil
function initMobileMenu() {
  const burger = document.getElementById('burger');
  const navLinks = document.getElementById('navLinks');
  if (!burger || !navLinks) return;
  burger.addEventListener('click', () => navLinks.classList.toggle('abierto'));
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('abierto')));
}

// Modales
function initModals() {
  let respuesta = 'si';

  document.querySelectorAll('[data-modal]').forEach(card => {
    card.addEventListener('click', (e) => {
      e.preventDefault();
      const modal = document.getElementById('modal-' + card.dataset.modal);
      if (modal) {
        modal.classList.add('abierto');
        if (modal.id === 'modal-invitados') renderInvitados('');
      }
    });
  });

  document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.remove('abierto');
    });
    const cerrar = modal.querySelector('[data-cerrar]');
    if (cerrar) {
      cerrar.addEventListener('click', () => modal.classList.remove('abierto'));
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal.abierto').forEach(m => m.classList.remove('abierto'));
    }
  });

  // Confirmación de asistencia
  window.elegirRespuesta = function(valor) {
    respuesta = valor;
    const btnSi = document.getElementById('btnSi');
    const btnNo = document.getElementById('btnNo');
    if (btnSi) btnSi.classList.toggle('btn-seleccionado', valor === 'si');
    if (btnNo) btnNo.classList.toggle('btn-seleccionado', valor === 'no');
  };

  window.enviarConfirmacion = function() {
    const form = document.getElementById('formConfirmar');
    const nombre = document.getElementById('nombre');
    if (!nombre || !nombre.value.trim()) {
      if (nombre) nombre.focus();
      return;
    }
    if (form) form.style.display = 'none';
    if (respuesta === 'si') {
      const ok = document.getElementById('mensajeOk');
      if (ok) ok.style.display = 'block';
    } else {
      const no = document.getElementById('mensajeNo');
      if (no) no.style.display = 'block';
    }
  };
}

// Lista de invitados simulada (se reemplazará por la base de datos)
const invitados = [
  { nombre: 'María Fernanda Roa', estado: 'confirmado' },
  { nombre: 'Carlos Andrés Roa', estado: 'confirmado' },
  { nombre: 'Laura Sofía Munguía', estado: 'pendiente' },
  { nombre: 'Julián Camilo Roa', estado: 'confirmado' },
  { nombre: 'Valentina Gómez', estado: 'pendiente' },
  { nombre: 'Andrés Felipe Torres', estado: 'rechazado' },
  { nombre: 'Daniela Roa Munguía', estado: 'confirmado' },
  { nombre: 'Santiago Muñoz', estado: 'pendiente' },
  { nombre: 'Paula Andrea Roa', estado: 'confirmado' },
  { nombre: 'Nicolás Martínez', estado: 'rechazado' }
];

function renderInvitados(filtro) {
  const cuerpo = document.getElementById('cuerpoInvitados');
  if (!cuerpo) return;
  const filtroMin = filtro.toLowerCase();
  const datos = invitados.filter(i => i.nombre.toLowerCase().includes(filtroMin));
  cuerpo.innerHTML = datos.map(i => `
    <tr>
      <td>${i.nombre}</td>
      <td><span class="badge ${i.estado}">${i.estado}</span></td>
    </tr>
  `).join('') || '<tr><td colspan="2" style="text-align:center; color:#8b7a9e;">Sin resultados</td></tr>';
}

window.filtrarInvitados = function() {
  const buscador = document.getElementById('buscadorInvitados');
  if (buscador) renderInvitados(buscador.value);
};

// Fotos (simulado)
window.avisoFotos = function(e) {
  e.preventDefault();
  alert('El álbum de fotos estará disponible próximamente. Este enlace se actualizará al conectarse a la base de datos.');
};

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
  initStars();
  initMobileMenu();
  initModals();
});