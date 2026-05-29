/* ============================================================
   SuperAdmin — app.js
   CRUD completo para empleados, clientes y productos
   ============================================================ */

// ── Estado global ──────────────────────────────────────────
let currentSection = 'empleados';
let editingId      = null;
let deleteId       = null;
let deleteSection  = null;
let searchTimers   = {};

const CATEGORIAS = [
  'Frutas y verduras','Lácteos','Bebidas','Higiene personal',
  'Línea blanca','Hogar','Salchichonería','Panadería',
  'Electrónicos','Enlatados'
];

// ── Helpers ────────────────────────────────────────────────
const $ = id => document.getElementById(id);

function fmtDate(d) {
  if (!d) return '—';
  return new Date(d).toLocaleDateString('es-MX', { day:'2-digit', month:'short', year:'numeric' });
}
function fmtMoney(n) {
  return n != null
    ? new Intl.NumberFormat('es-MX', { style:'currency', currency:'MXN' }).format(n)
    : '—';
}
function fmtISODate(d) {
  if (!d) return '';
  return new Date(d).toISOString().split('T')[0];
}

function showToast(msg, type = 'success') {
  const t = $('toast');
  t.textContent = msg;
  t.className = `toast ${type}`;
  clearTimeout(t._timer);
  t._timer = setTimeout(() => { t.className = 'toast hidden'; }, 3200);
}

// ── Navegación ─────────────────────────────────────────────
document.querySelectorAll('.nav-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    btn.classList.add('active');
    currentSection = btn.dataset.section;
    $(`sec-${currentSection}`).classList.add('active');
    loadSection(currentSection);
  });
});

// ── API calls ──────────────────────────────────────────────
async function api(method, url, body) {
  const opts = { method, headers: { 'Content-Type': 'application/json' } };
  if (body) opts.body = JSON.stringify(body);
  const res = await fetch(url, opts);
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Error en servidor');
  return data;
}

// ── Carga de secciones ─────────────────────────────────────
async function loadSection(section, q = '', extra = {}) {
  try {
    let url = `/api/${section}?q=${encodeURIComponent(q)}`;
    if (extra.categoria) url += `&categoria=${encodeURIComponent(extra.categoria)}`;
    const data = await api('GET', url);
    if (section === 'empleados') renderEmpleados(data);
    if (section === 'clientes')  renderClientes(data);
    if (section === 'productos') renderProductos(data);
  } catch (e) {
    showToast('Error al cargar: ' + e.message, 'error');
  }
}

// ── RENDER: Empleados ──────────────────────────────────────
function renderEmpleados(list) {
  const tb = $('tbody-empleados');
  if (!list.length) {
    tb.innerHTML = '<tr class="empty-row"><td colspan="7">Sin empleados registrados</td></tr>';
    $('stats-empleados').innerHTML = statCard('0', 'empleados');
    return;
  }
  const sueldoPromedio = list.reduce((a, e) => a + (e.sueldo || 0), 0) / list.length;
  $('stats-empleados').innerHTML =
    statCard(list.length, 'empleados') +
    statCard(fmtMoney(sueldoPromedio), 'sueldo promedio') +
    statCard([...new Set(list.map(e => e.puesto))].length, 'puestos distintos');

  tb.innerHTML = list.map(e => `
    <tr>
      <td><strong>${e.nombre} ${e.apellido_paterno} ${e.apellido_materno}</strong></td>
      <td><span class="badge badge-yellow">${e.puesto}</span></td>
      <td>${e.edad} años</td>
      <td>${e.genero}</td>
      <td style="font-family:var(--mono)">${fmtMoney(e.sueldo)}</td>
      <td style="color:var(--muted);font-size:12px">${e.direccion}</td>
      <td>
        <div class="action-btns">
          <button class="btn-edit" onclick="openModal('empleado','${e._id}')">Editar</button>
          <button class="btn-del"  onclick="confirmDelete('${e._id}','empleados')">Eliminar</button>
        </div>
      </td>
    </tr>`).join('');
}

// ── RENDER: Clientes ───────────────────────────────────────
function renderClientes(list) {
  const tb = $('tbody-clientes');
  if (!list.length) {
    tb.innerHTML = '<tr class="empty-row"><td colspan="5">Sin clientes registrados</td></tr>';
    $('stats-clientes').innerHTML = statCard('0', 'clientes');
    return;
  }
  $('stats-clientes').innerHTML = statCard(list.length, 'clientes registrados');
  tb.innerHTML = list.map(c => `
    <tr>
      <td><strong>${c.nombre} ${c.apellido_paterno} ${c.apellido_materno}</strong></td>
      <td style="color:var(--muted);font-size:12px">${c.direccion}</td>
      <td style="font-family:var(--mono)">${c.telefono}</td>
      <td style="color:var(--muted);font-size:12px">${fmtDate(c.createdAt)}</td>
      <td>
        <div class="action-btns">
          <button class="btn-edit" onclick="openModal('cliente','${c._id}')">Editar</button>
          <button class="btn-del"  onclick="confirmDelete('${c._id}','clientes')">Eliminar</button>
        </div>
      </td>
    </tr>`).join('');
}

// ── RENDER: Productos ──────────────────────────────────────
function renderProductos(list) {
  const tb = $('tbody-productos');
  if (!list.length) {
    tb.innerHTML = '<tr class="empty-row"><td colspan="7">Sin productos registrados</td></tr>';
    $('stats-productos').innerHTML = statCard('0', 'productos');
    return;
  }
  const totalCats = [...new Set(list.map(p => p.categoria))].length;
  const precioAvg = list.reduce((a, p) => a + (p.precio_con_iva || 0), 0) / list.length;
  $('stats-productos').innerHTML =
    statCard(list.length, 'productos') +
    statCard(totalCats, 'categorías activas') +
    statCard(fmtMoney(precioAvg), 'precio promedio c/IVA');

  tb.innerHTML = list.map(p => {
    const hoy = new Date();
    const cad = new Date(p.fecha_caducidad);
    const pronto = (cad - hoy) < 7 * 24 * 3600 * 1000;
    return `
    <tr>
      <td><strong>${p.nombre}</strong></td>
      <td><span class="badge">${p.categoria}</span></td>
      <td style="font-family:var(--mono)">${fmtMoney(p.precio)}</td>
      <td style="font-family:var(--mono);color:var(--accent)">${fmtMoney(p.precio_con_iva)}</td>
      <td style="${pronto ? 'color:var(--danger)' : 'color:var(--muted)'};font-size:12px">
        ${fmtDate(p.fecha_caducidad)}${pronto ? ' ⚠' : ''}
      </td>
      <td style="color:var(--muted);font-size:12px">${fmtDate(p.fecha_inventario)}</td>
      <td>
        <div class="action-btns">
          <button class="btn-edit" onclick="openModal('producto','${p._id}')">Editar</button>
          <button class="btn-del"  onclick="confirmDelete('${p._id}','productos')">Eliminar</button>
        </div>
      </td>
    </tr>`;
  }).join('');
}

function statCard(val, lbl) {
  return `<div class="stat-card"><div class="stat-num">${val}</div><div class="stat-lbl">${lbl}</div></div>`;
}

// ── MODAL ──────────────────────────────────────────────────
const FORMS = {
  empleado: () => `
    <div class="form-group"><label>Nombre</label><input name="nombre" required/></div>
    <div class="form-group"><label>Apellido paterno</label><input name="apellido_paterno" required/></div>
    <div class="form-group"><label>Apellido materno</label><input name="apellido_materno" required/></div>
    <div class="form-group full"><label>Dirección</label><input name="direccion" required/></div>
    <div class="form-group"><label>Edad</label><input name="edad" type="number" min="18" max="75" required/></div>
    <div class="form-group"><label>Género</label>
      <select name="genero" required>
        <option value="">Seleccionar…</option>
        <option>Masculino</option><option>Femenino</option><option>Otro</option>
      </select>
    </div>
    <div class="form-group"><label>Puesto</label><input name="puesto" required/></div>
    <div class="form-group"><label>Sueldo (MXN)</label><input name="sueldo" type="number" min="0" step="0.01" required/></div>`,

  cliente: () => `
    <div class="form-group"><label>Nombre</label><input name="nombre" required/></div>
    <div class="form-group"><label>Apellido paterno</label><input name="apellido_paterno" required/></div>
    <div class="form-group"><label>Apellido materno</label><input name="apellido_materno" required/></div>
    <div class="form-group full"><label>Dirección</label><input name="direccion" required/></div>
    <div class="form-group full"><label>Teléfono</label><input name="telefono" required pattern="[0-9]{10}" placeholder="10 dígitos"/></div>`,

  producto: () => `
    <div class="form-group full"><label>Nombre del producto</label><input name="nombre" required/></div>
    <div class="form-group"><label>Precio (sin IVA)</label><input name="precio" type="number" min="0" step="0.01" required/></div>
    <div class="form-group"><label>IVA (por defecto 0.16)</label><input name="iva" type="number" value="0.16" min="0" max="1" step="0.01" required/></div>
    <div class="form-group"><label>Fecha de caducidad</label><input name="fecha_caducidad" type="date" required/></div>
    <div class="form-group"><label>Fecha de inventario</label><input name="fecha_inventario" type="date" required/></div>
    <div class="form-group full"><label>Categoría</label>
      <select name="categoria" required>
        <option value="">Seleccionar categoría…</option>
        ${CATEGORIAS.map(c => `<option>${c}</option>`).join('')}
      </select>
    </div>`
};

async function openModal(type, id = null) {
  editingId = id;
  const overlay = $('modal-overlay');
  const form    = $('modal-form');
  const titles  = { empleado:'Empleado', cliente:'Cliente', producto:'Producto' };

  $('modal-title').textContent = id ? `Editar ${titles[type]}` : `Nuevo ${titles[type]}`;
  $('btn-submit').dataset.type = type;
  form.innerHTML = FORMS[type]();
  overlay.classList.remove('hidden');

  if (id) {
    try {
      const plural = { empleado:'empleados', cliente:'clientes', producto:'productos' }[type];
      const data = await api('GET', `/api/${plural}/${id}`);
      Object.entries(data).forEach(([k, v]) => {
        const el = form.querySelector(`[name="${k}"]`);
        if (!el) return;
        if (el.type === 'date') el.value = fmtISODate(v);
        else el.value = v;
      });
    } catch (e) {
      showToast('Error al cargar datos: ' + e.message, 'error');
    }
  }
}

function closeModal(e) {
  if (e.target === $('modal-overlay')) closeModalDirect();
}
function closeModalDirect() {
  $('modal-overlay').classList.add('hidden');
  editingId = null;
}

async function submitForm() {
  const form = $('modal-form');
  const type = $('btn-submit').dataset.type;
  const plural = { empleado:'empleados', cliente:'clientes', producto:'productos' }[type];

  // Validación HTML5
  if (!form.checkValidity()) { form.reportValidity(); return; }

  const inputs = form.querySelectorAll('[name]');
  const body = {};
  inputs.forEach(el => {
    if (el.value !== '') {
      body[el.name] = (el.type === 'number') ? parseFloat(el.value) : el.value;
    }
  });

  try {
    if (editingId) {
      await api('PUT', `/api/${plural}/${editingId}`, body);
      showToast(`${type.charAt(0).toUpperCase() + type.slice(1)} actualizado ✓`);
    } else {
      await api('POST', `/api/${plural}`, body);
      showToast(`${type.charAt(0).toUpperCase() + type.slice(1)} creado ✓`);
    }
    closeModalDirect();
    loadSection(plural, '', plural === 'productos' ? { categoria: $('filter-categoria')?.value || '' } : {});
  } catch (e) {
    showToast('Error: ' + e.message, 'error');
  }
}

// ── DELETE ─────────────────────────────────────────────────
function confirmDelete(id, section) {
  deleteId      = id;
  deleteSection = section;
  $('confirm-overlay').classList.remove('hidden');
}
function closeConfirm(e) {
  if (e.target === $('confirm-overlay')) closeConfirmDirect();
}
function closeConfirmDirect() {
  $('confirm-overlay').classList.add('hidden');
  deleteId = deleteSection = null;
}

$('btn-confirm-delete').addEventListener('click', async () => {
  try {
    await api('DELETE', `/api/${deleteSection}/${deleteId}`);
    showToast('Registro eliminado');
    closeConfirmDirect();
    const q = $(`search-${deleteSection}`)?.value || '';
    const cat = deleteSection === 'productos' ? ($('filter-categoria')?.value || '') : '';
    loadSection(deleteSection, q, { categoria: cat });
  } catch (e) {
    showToast('Error al eliminar: ' + e.message, 'error');
  }
});

// ── BÚSQUEDA con debounce ──────────────────────────────────
['empleados','clientes','productos'].forEach(sec => {
  const inp = $(`search-${sec}`);
  if (inp) {
    inp.addEventListener('input', () => {
      clearTimeout(searchTimers[sec]);
      searchTimers[sec] = setTimeout(() => {
        const cat = sec === 'productos' ? ($('filter-categoria')?.value || '') : '';
        loadSection(sec, inp.value, { categoria: cat });
      }, 320);
    });
  }
});

const filterCat = $('filter-categoria');
if (filterCat) {
  filterCat.addEventListener('change', () => {
    loadSection('productos', $('search-productos')?.value || '', { categoria: filterCat.value });
  });
}

// ── INIT ───────────────────────────────────────────────────
loadSection('empleados');
