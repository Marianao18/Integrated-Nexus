import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomeDocente.css';
import { logout } from '../utils/auth';

const IconHome     = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;
const IconUser     = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
const IconBook     = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></svg>;
const IconStudents = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>;
const IconChart    = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/></svg>;
const IconLogout   = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>;
const IconCamera   = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/><circle cx="12" cy="13" r="4"/></svg>;
const IconEdit     = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>;
const IconSave     = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>;
const IconLock     = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>;
const IconPlus     = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>;
const IconEye      = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>;

const CourseCard = ({ title, students, level, color, progress }) => (
  <div className="nd-course-card">
    <div className="nd-course-accent" style={{ background: color }} />
    <div className="nd-course-body">
      <span className="nd-course-level" style={{ color, borderColor: color }}>{level}</span>
      <h4 className="nd-course-title">{title}</h4>
      <div className="nd-course-meta">
        <span className="nd-course-students">👥 {students} estudiantes</span>
      </div>
      <div className="nd-progress-bar">
        <div className="nd-progress-fill" style={{ width: `${progress}%`, background: color }} />
      </div>
      <span className="nd-progress-label">{progress}% completado</span>
    </div>
  </div>
);

const StatCard = ({ label, value, icon, color, sub }) => (
  <div className="nd-stat-card" style={{ borderTopColor: color }}>
    <div className="nd-stat-icon" style={{ color }}>{icon}</div>
    <div className="nd-stat-info">
      <span className="nd-stat-value" style={{ color }}>{value}</span>
      <span className="nd-stat-label">{label}</span>
      {sub && <span className="nd-stat-sub">{sub}</span>}
    </div>
  </div>
);

export default function HomeDocente() {
  const navigate  = useNavigate();
  const fileRef   = useRef(null);
  const [vista, setVista]       = useState('inicio');
  const [avatar, setAvatar]     = useState(null);
  const [bio, setBio]           = useState('');
  const [editBio, setEditBio]   = useState(false);
  const [bioTemp, setBioTemp]   = useState('');
  const [pass, setPass]         = useState({ actual: '', nueva: '', confirmar: '' });
  const [passMsg, setPassMsg]   = useState('');
  const [showPass, setShowPass] = useState({ actual: false, nueva: false, confirmar: false });

  const nombre       = localStorage.getItem('userName') || 'Docente';
  const email        = localStorage.getItem('userEmail') || 'docente@nexus.com';
  const especialidad = localStorage.getItem('especialidad') || 'Especialidad';
  const initials     = nombre.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

  const cerrarSesion = () => {
    if (window.confirm('¿Estás seguro de que deseas salir?')) {
      localStorage.clear();
      window.dispatchEvent(new Event('authChange'));
      navigate('/login');
    }
  };

  const handleAvatar = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setAvatar(reader.result);
    reader.readAsDataURL(file);
  };

  const handleBioSave = () => { setBio(bioTemp); setEditBio(false); };

  const handlePassChange = (e) => setPass({ ...pass, [e.target.name]: e.target.value });

  const handlePassSave = () => {
    if (!pass.actual || !pass.nueva || !pass.confirmar) { setPassMsg('error:Completa todos los campos.'); return; }
    if (pass.nueva !== pass.confirmar) { setPassMsg('error:Las contraseñas no coinciden.'); return; }
    if (pass.nueva.length < 10) { setPassMsg('error:Mínimo 10 caracteres con mayúscula y número.'); return; }
    setPassMsg('ok:Contraseña actualizada correctamente.');
    setPass({ actual: '', nueva: '', confirmar: '' });
  };

  const navItems = [
    { id: 'inicio',       label: 'Inicio',          icon: <IconHome /> },
    { id: 'perfil',       label: 'Mi Perfil',       icon: <IconUser /> },
    { id: 'cursos',       label: 'Mis Cursos',      icon: <IconBook /> },
    { id: 'estudiantes',  label: 'Mis Estudiantes', icon: <IconStudents /> },
    { id: 'estadisticas', label: 'Estadísticas',    icon: <IconChart /> },
  ];

  // ── INICIO ────────────────────────────────────────────
  const renderInicio = () => (
    <div className="nd-view nd-fade-in">
      <div className="nd-welcome-banner">
        <div className="nd-welcome-text">
          <p className="nd-welcome-greeting">Bienvenido de nuevo,</p>
          <h2 className="nd-welcome-name">{nombre}</h2>
          <span className="nd-welcome-role">{especialidad}</span>
        </div>
        <div className="nd-welcome-avatar">
          {avatar ? <img src={avatar} alt="av" className="nd-avatar-lg" />
            : <div className="nd-avatar-initials-lg">{initials}</div>}
        </div>
      </div>
      <div className="nd-stats-grid">
        <StatCard label="Cursos activos"     value="3"   icon={<IconBook />}     color="#00E5FF" sub="2 en progreso" />
        <StatCard label="Estudiantes"        value="87"  icon={<IconStudents />} color="#A3FF4F" sub="+12 este mes" />
        <StatCard label="Evaluaciones"       value="12"  icon={<IconChart />}    color="#7B5CFA" sub="4 pendientes" />
        <StatCard label="Tasa completación"  value="78%" icon={<IconEye />}      color="#FF6B35" sub="Promedio" />
      </div>
      <div className="nd-section-title">Actividad reciente</div>
      <div className="nd-activity-list">
        {[
          { text: 'Carlos Pérez completó el módulo "APIs REST"',            time: 'Hace 2 horas', color: '#A3FF4F' },
          { text: 'Nueva solicitud de estudiante en tu curso de Python',    time: 'Hace 5 horas', color: '#00E5FF' },
          { text: 'María García obtuvo una insignia en tu curso',           time: 'Ayer',         color: '#7B5CFA' },
        ].map((item, i) => (
          <div key={i} className="nd-activity-item">
            <div className="nd-activity-dot" style={{ background: item.color }} />
            <div className="nd-activity-info">
              <p className="nd-activity-text">{item.text}</p>
              <span className="nd-activity-time">{item.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // ── PERFIL ────────────────────────────────────────────
  const renderPerfil = () => (
    <div className="nd-view nd-fade-in">
      <div className="nd-section-title">Mi Perfil</div>

      <div className="nd-profile-card">
        <div className="nd-avatar-section">
          <div className="nd-avatar-wrapper">
            {avatar ? <img src={avatar} alt="av" className="nd-avatar-xl" />
              : <div className="nd-avatar-initials-xl">{initials}</div>}
            <button className="nd-avatar-edit-btn" onClick={() => fileRef.current.click()}>
              <IconCamera />
            </button>
            <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleAvatar} />
          </div>
          <div className="nd-profile-name-section">
            <h3 className="nd-profile-name">{nombre}</h3>
            <span className="nd-profile-badge">{especialidad}</span>
            <span className="nd-profile-email">{email}</span>
          </div>
        </div>
        <div className="nd-profile-readonly">
          <p className="nd-readonly-note">⚠️ Los siguientes campos no son editables — fueron definidos al crear tu cuenta.</p>
          <div className="nd-readonly-grid">
            {[
              { label: 'Nombre completo', value: nombre },
              { label: 'Especialidad',    value: especialidad },
              { label: 'Correo',          value: email },
              { label: 'Rol',             value: 'Docente', tag: true },
            ].map(({ label, value, tag }) => (
              <div key={label} className="nd-readonly-field">
                <label>{label}</label>
                <div className={`nd-readonly-value${tag ? ' nd-role-tag' : ''}`}>{value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="nd-edit-card">
        <div className="nd-edit-card-header">
          <span>Descripción / Biografía</span>
          {!editBio && (
            <button className="nd-btn-ghost" onClick={() => { setEditBio(true); setBioTemp(bio); }}>
              <IconEdit /> Editar
            </button>
          )}
        </div>
        {editBio ? (
          <div className="nd-bio-edit">
            <textarea className="nd-textarea" rows={4} maxLength={300}
              placeholder="Cuéntale a tus estudiantes sobre ti, tu experiencia y metodología..."
              value={bioTemp} onChange={e => setBioTemp(e.target.value)} />
            <span className="nd-char-count">{bioTemp.length}/300</span>
            <div className="nd-edit-actions">
              <button className="nd-btn-secondary" onClick={() => setEditBio(false)}>Cancelar</button>
              <button className="nd-btn-primary" onClick={handleBioSave}><IconSave /> Guardar</button>
            </div>
          </div>
        ) : (
          <p className="nd-bio-text">{bio || 'No has agregado una descripción todavía. Haz clic en Editar para añadir una.'}</p>
        )}
      </div>

      <div className="nd-edit-card">
        <div className="nd-edit-card-header">
          <span className="nd-lock-title"><IconLock /> Cambiar Contraseña</span>
        </div>
        <div className="nd-pass-grid">
          {[
            { name: 'actual',    label: 'Contraseña actual',    key: 'actual' },
            { name: 'nueva',     label: 'Nueva contraseña',     key: 'nueva' },
            { name: 'confirmar', label: 'Confirmar contraseña', key: 'confirmar' },
          ].map(({ name, label, key }) => (
            <div className="nd-pass-field" key={name}>
              <label>{label}</label>
              <div className="nd-pass-input-wrap">
                <input type={showPass[key] ? 'text' : 'password'} name={name}
                  value={pass[name]} onChange={handlePassChange}
                  className="nd-input" placeholder="••••••••••" />
                <button className="nd-pass-toggle" type="button"
                  onClick={() => setShowPass(p => ({ ...p, [key]: !p[key] }))}>
                  <IconEye />
                </button>
              </div>
            </div>
          ))}
        </div>
        {passMsg && (
          <div className={`nd-msg ${passMsg.startsWith('ok') ? 'nd-msg-ok' : 'nd-msg-err'}`}>
            {passMsg.split(':')[1]}
          </div>
        )}
        <button className="nd-btn-primary nd-mt" onClick={handlePassSave}>
          <IconSave /> Actualizar contraseña
        </button>
      </div>
    </div>
  );

  // ── CURSOS ─────────────────────────────────────────────
  const renderCursos = () => (
    <div className="nd-view nd-fade-in">
      <div className="nd-section-header">
        <div className="nd-section-title">Mis Cursos</div>
        <button className="nd-btn-primary"><IconPlus /> Nuevo curso</button>
      </div>
      <p className="nd-section-sub">Gestiona tus cursos y contenidos educativos.</p>
      <div className="nd-courses-grid">
        <CourseCard title="Python desde cero"     students={34} level="Principiante" color="#A3FF4F" progress={72} />
        <CourseCard title="Django REST Framework" students={28} level="Intermedio"   color="#00E5FF" progress={45} />
        <CourseCard title="APIs con FastAPI"      students={25} level="Avanzado"     color="#7B5CFA" progress={20} />
      </div>
      <div className="nd-empty-hint">🚀 La gestión completa de contenidos estará disponible próximamente.</div>
    </div>
  );

  // ── ESTUDIANTES ────────────────────────────────────────
  const renderEstudiantes = () => (
    <div className="nd-view nd-fade-in">
      <div className="nd-section-title">Mis Estudiantes</div>
      <p className="nd-section-sub">Estudiantes inscritos en tus cursos activos.</p>
      <div className="nd-students-table">
        <div className="nd-table-header">
          <span>Nombre</span><span>Curso</span><span>Progreso</span><span>Estado</span>
        </div>
        {[
          { nombre: 'Carlos Pérez',   curso: 'Python desde cero',     progress: 72, estado: 'activo' },
          { nombre: 'María García',   curso: 'Django REST Framework', progress: 45, estado: 'activo' },
          { nombre: 'Juan Rodríguez', curso: 'Python desde cero',     progress: 90, estado: 'completado' },
          { nombre: 'Laura Martínez', curso: 'APIs con FastAPI',      progress: 15, estado: 'activo' },
          { nombre: 'Diego Herrera',  curso: 'Django REST Framework', progress: 30, estado: 'inactivo' },
        ].map((s, i) => (
          <div key={i} className="nd-table-row">
            <span className="nd-student-name">
              <div className="nd-student-avatar">{s.nombre[0]}</div>{s.nombre}
            </span>
            <span className="nd-student-course">{s.curso}</span>
            <span className="nd-student-progress">
              <div className="nd-mini-bar"><div className="nd-mini-fill" style={{ width: `${s.progress}%` }} /></div>
              {s.progress}%
            </span>
            <span className={`nd-student-status nd-status-${s.estado}`}>{s.estado}</span>
          </div>
        ))}
      </div>
    </div>
  );

  // ── ESTADÍSTICAS ───────────────────────────────────────
  const renderEstadisticas = () => (
    <div className="nd-view nd-fade-in">
      <div className="nd-section-title">Estadísticas</div>
      <p className="nd-section-sub">Métricas de rendimiento de tus cursos.</p>
      <div className="nd-stats-grid">
        <StatCard label="Total estudiantes"    value="87"  icon={<IconStudents />} color="#00E5FF" sub="En todos tus cursos" />
        <StatCard label="Cursos publicados"    value="3"   icon={<IconBook />}     color="#A3FF4F" sub="1 en borrador" />
        <StatCard label="Tasa de completación" value="78%" icon={<IconChart />}    color="#7B5CFA" sub="Promedio general" />
        <StatCard label="Evaluaciones activas" value="12"  icon={<IconEye />}      color="#FF6B35" sub="4 pendientes" />
      </div>
      <div className="nd-chart-placeholder">
        <div className="nd-chart-bars">
          {[65, 80, 45, 90, 72, 55, 88].map((h, i) => (
            <div key={i} className="nd-bar-wrap">
              <div className="nd-bar" style={{ height: `${h}%` }} />
              <span className="nd-bar-label">{['Lun','Mar','Mié','Jue','Vie','Sáb','Dom'][i]}</span>
            </div>
          ))}
        </div>
        <p className="nd-chart-title">Actividad de estudiantes — Última semana</p>
      </div>
      <div className="nd-empty-hint">📊 Las métricas detalladas estarán disponibles cuando conectemos el módulo de evaluaciones.</div>
    </div>
  );

  const views = { inicio: renderInicio, perfil: renderPerfil, cursos: renderCursos, estudiantes: renderEstudiantes, estadisticas: renderEstadisticas };

  return (
    <div className="nd-layout">
      <aside className="nd-sidebar">
        <div className="nd-sidebar-logo">NEX<span>U</span>S <span className="nd-sidebar-tag">DOCENTE</span></div>
        <div className="nd-sidebar-avatar-mini">
          {avatar ? <img src={avatar} alt="av" className="nd-avatar-sm" />
            : <div className="nd-avatar-initials-sm">{initials}</div>}
          <div className="nd-sidebar-user-info">
            <span className="nd-sidebar-name">{nombre}</span>
            <span className="nd-sidebar-role">{especialidad}</span>
          </div>
        </div>
        <nav className="nd-sidebar-nav">
          {navItems.map(item => (
            <button key={item.id}
              className={`nd-nav-item ${vista === item.id ? 'nd-nav-active' : ''}`}
              onClick={() => setVista(item.id)}>
              <span className="nd-nav-icon">{item.icon}</span>
              <span className="nd-nav-label">{item.label}</span>
            </button>
          ))}
        </nav>
        <button className="nd-logout-btn" onClick={logout}>
          <IconLogout /> Cerrar sesión
        </button>
      </aside>

      <main className="nd-main">
        <header className="nd-topbar">
          <span className="nd-breadcrumb-section">{navItems.find(n => n.id === vista)?.label}</span>
          <div className="nd-topbar-right">
            <span className="nd-topbar-greeting">Hola, {nombre.split(' ')[0]}</span>
            {avatar ? <img src={avatar} alt="av" className="nd-topbar-avatar" />
              : <div className="nd-topbar-initials">{initials}</div>}
          </div>
        </header>
        <div className="nd-content">
          {(views[vista] || renderInicio)()}
        </div>
      </main>
    </div>
  );
}
