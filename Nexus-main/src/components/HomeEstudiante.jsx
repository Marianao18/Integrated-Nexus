import React, { useState } from 'react';
import './HomeEstudiante.css';
import { logout } from '../utils/auth';

const HomeEstudiante = () => {
  const [activeSection, setActiveSection] = useState('inicio');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const userName = localStorage.getItem('userName') || 'Estudiante';
  const userEmail = localStorage.getItem('email') || 'estudiante@nexus.com';
  const initials = userName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

  const handleLogout = () => {
    localStorage.clear();
    window.dispatchEvent(new Event('authChange'));
    window.location.href = '/login';
  };

  const navItems = [
    { id: 'inicio',    label: 'Inicio',              icon: <IconHome /> },
    { id: 'cursos',    label: 'Mis Cursos',           icon: <IconBook /> },
    { id: 'rutas',     label: 'Rutas de Aprendizaje', icon: <IconMap /> },
    { id: 'progreso',  label: 'Progreso',             icon: <IconChart /> },
    { id: 'perfil',    label: 'Mi Perfil',            icon: <IconUser /> },
  ];

  return (
    <div className="est-wrapper">
      {/* Sidebar */}
      <aside className={`est-sidebar ${sidebarOpen ? 'open' : 'collapsed'}`}>
        <div className="est-sidebar-header">
          <div className="est-logo">
            <span className="est-logo-nex">NEX</span>
            <span className="est-logo-us">US</span>
            <span className="est-role-badge">ESTUDIANTE</span>
          </div>
          <button className="est-toggle-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <IconToggle />
          </button>
        </div>

        <div className="est-profile-mini">
          <div className="est-avatar-sm">{initials}</div>
          {sidebarOpen && (
            <div className="est-profile-info">
              <span className="est-profile-name">{userName}</span>
              <span className="est-profile-sub">Nivel 3 · 1.240 XP</span>
            </div>
          )}
        </div>

        <nav className="est-nav">
          {navItems.map(item => (
            <button
              key={item.id}
              className={`est-nav-item ${activeSection === item.id ? 'active' : ''}`}
              onClick={() => setActiveSection(item.id)}
            >
              <span className="est-nav-icon">{item.icon}</span>
              {sidebarOpen && <span className="est-nav-label">{item.label}</span>}
            </button>
          ))}
        </nav>

        <button className="est-logout-btn" onClick={logout}>
          <IconLogout />
          {sidebarOpen && <span>Cerrar sesión</span>}
        </button>
      </aside>

      {/* Main content */}
      <div className="est-main">
        {/* Topbar */}
        <header className="est-topbar">
          <div className="est-topbar-left">
            <h1 className="est-page-title">{navItems.find(n => n.id === activeSection)?.label}</h1>
          </div>
          <div className="est-topbar-right">
            <span className="est-topbar-greeting">Hola, {userName.split(' ')[0]}</span>
            <div className="est-avatar-top">{initials}</div>
          </div>
        </header>

        <div className="est-content">
          {activeSection === 'inicio'   && <SectionInicio   userName={userName} initials={initials} />}
          {activeSection === 'cursos'   && <SectionCursos />}
          {activeSection === 'rutas'    && <SectionRutas />}
          {activeSection === 'progreso' && <SectionProgreso />}
          {activeSection === 'perfil'   && <SectionPerfil userName={userName} userEmail={userEmail} initials={initials} />}
        </div>
      </div>
    </div>
  );
};

/* ─── SECCIÓN: INICIO ─────────────────────────────────────────────── */
const SectionInicio = ({ userName, initials }) => {
  const actividadReciente = [
    { color: '#00f5a0', texto: 'Completaste el módulo "Fundamentos de Python"', tiempo: 'Hace 1 hora' },
    { color: '#00c3ff', texto: 'Nueva insignia desbloqueada: Desarrollador Junior', tiempo: 'Hace 3 horas' },
    { color: '#a78bfa', texto: 'Subiste al nivel 3 en la ruta de Desarrollo Web', tiempo: 'Ayer' },
  ];

  return (
    <div className="est-section-content">
      {/* Bienvenida */}
      <div className="est-welcome-card">
        <div className="est-welcome-text">
          <p className="est-welcome-sub">Bienvenido de nuevo,</p>
          <h2 className="est-welcome-name">{userName}</h2>
          <span className="est-level-badge">Nivel 3</span>
        </div>
        <div className="est-welcome-avatar">{initials}</div>
      </div>

      {/* Métricas */}
      <div className="est-metrics-grid">
        <div className="est-metric-card cyan">
          <IconBook />
          <div>
            <span className="est-metric-value">4</span>
            <span className="est-metric-label">Cursos activos</span>
            <span className="est-metric-sub">2 en progreso</span>
          </div>
        </div>
        <div className="est-metric-card green">
          <IconChart />
          <div>
            <span className="est-metric-value">68%</span>
            <span className="est-metric-label">Progreso general</span>
            <span className="est-metric-sub">+5% esta semana</span>
          </div>
        </div>
        <div className="est-metric-card purple">
          <IconMap />
          <div>
            <span className="est-metric-value">2</span>
            <span className="est-metric-label">Rutas activas</span>
            <span className="est-metric-sub">1 por completar</span>
          </div>
        </div>
        <div className="est-metric-card orange">
          <IconStar />
          <div>
            <span className="est-metric-value">1.240</span>
            <span className="est-metric-label">XP acumulados</span>
            <span className="est-metric-sub">260 para nivel 4</span>
          </div>
        </div>
      </div>

      {/* Actividad reciente */}
      <div className="est-block">
        <h3 className="est-block-title">Actividad reciente</h3>
        <div className="est-activity-list">
          {actividadReciente.map((item, i) => (
            <div key={i} className="est-activity-item">
              <span className="est-activity-dot" style={{ background: item.color }} />
              <div>
                <p className="est-activity-text">{item.texto}</p>
                <p className="est-activity-time">{item.tiempo}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Continuar aprendiendo */}
      <div className="est-block">
        <h3 className="est-block-title">Continuar aprendiendo</h3>
        <div className="est-continue-card">
          <div className="est-continue-info">
            <span className="est-continue-tag">Python · Módulo 4</span>
            <p className="est-continue-title">Programación Orientada a Objetos</p>
            <div className="est-progress-bar-wrap">
              <div className="est-progress-bar" style={{ width: '62%' }} />
            </div>
            <span className="est-progress-label">62% completado</span>
          </div>
          <button className="est-btn-primary">Continuar</button>
        </div>
      </div>
    </div>
  );
};

/* ─── SECCIÓN: MIS CURSOS ─────────────────────────────────────────── */
const SectionCursos = () => {
  const cursos = [
    { nombre: 'Python Desde Cero', docente: 'Carlos Mendez', progreso: 62, modulos: 8, completados: 5, color: '#00f5a0', tag: 'En progreso' },
    { nombre: 'Bases de Datos SQL', docente: 'Ana Torres', progreso: 30, modulos: 6, completados: 2, color: '#00c3ff', tag: 'En progreso' },
    { nombre: 'HTML & CSS Profesional', docente: 'Luis Ríos', progreso: 100, modulos: 5, completados: 5, color: '#a78bfa', tag: 'Completado' },
    { nombre: 'Introducción a Redes', docente: 'María García', progreso: 0, modulos: 7, completados: 0, color: '#fb923c', tag: 'No iniciado' },
  ];

  return (
    <div className="est-section-content">
      <div className="est-courses-grid">
        {cursos.map((curso, i) => (
          <div key={i} className="est-course-card">
            <div className="est-course-top" style={{ borderColor: curso.color }}>
              <span className="est-course-tag" style={{ color: curso.color, borderColor: curso.color }}>
                {curso.tag}
              </span>
              <h4 className="est-course-name">{curso.nombre}</h4>
              <p className="est-course-docente">Docente: {curso.docente}</p>
            </div>
            <div className="est-course-bottom">
              <div className="est-progress-bar-wrap">
                <div className="est-progress-bar" style={{ width: `${curso.progreso}%`, background: curso.color }} />
              </div>
              <div className="est-course-meta">
                <span>{curso.completados}/{curso.modulos} módulos</span>
                <span style={{ color: curso.color }}>{curso.progreso}%</span>
              </div>
              <button className="est-btn-outline" style={{ borderColor: curso.color, color: curso.color }}>
                {curso.progreso === 0 ? 'Comenzar' : curso.progreso === 100 ? 'Revisar' : 'Continuar'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ─── SECCIÓN: RUTAS ─────────────────────────────────────────────── */
const SectionRutas = () => {
  const rutas = [
    {
      nombre: 'Desarrollo Web Full Stack',
      descripcion: 'Desde HTML hasta APIs REST con Python y Django',
      progreso: 45,
      etapas: ['HTML & CSS', 'JavaScript', 'React', 'Python', 'Django', 'APIs REST'],
      etapaActual: 2,
      color: '#00f5a0',
      duracion: '6 meses',
    },
    {
      nombre: 'Analista de Datos',
      descripcion: 'Excel, SQL, Python y visualización de datos',
      progreso: 20,
      etapas: ['Excel Avanzado', 'SQL', 'Python', 'Pandas', 'Visualización'],
      etapaActual: 1,
      color: '#00c3ff',
      duracion: '4 meses',
    },
  ];

  return (
    <div className="est-section-content">
      {rutas.map((ruta, i) => (
        <div key={i} className="est-ruta-card">
          <div className="est-ruta-header">
            <div>
              <h3 className="est-ruta-nombre">{ruta.nombre}</h3>
              <p className="est-ruta-desc">{ruta.descripcion}</p>
              <span className="est-ruta-duracion">⏱ {ruta.duracion}</span>
            </div>
            <div className="est-ruta-circle" style={{ '--ruta-color': ruta.color }}>
              <span className="est-ruta-pct">{ruta.progreso}%</span>
              <span className="est-ruta-pct-label">completado</span>
            </div>
          </div>

          <div className="est-etapas">
            {ruta.etapas.map((etapa, j) => (
              <div key={j} className={`est-etapa ${j < ruta.etapaActual ? 'done' : j === ruta.etapaActual ? 'current' : 'pending'}`}
                style={{ '--ruta-color': ruta.color }}>
                <div className="est-etapa-dot" />
                <span className="est-etapa-label">{etapa}</span>
              </div>
            ))}
          </div>

          <button className="est-btn-primary" style={{ background: ruta.color, color: '#0a0f1e' }}>
            Continuar ruta
          </button>
        </div>
      ))}
    </div>
  );
};

/* ─── SECCIÓN: PROGRESO ───────────────────────────────────────────── */
const SectionProgreso = () => {
  const semanas = ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4', 'Sem 5', 'Sem 6', 'Sem 7', 'Sem 8'];
  const horas   = [2, 4, 3, 6, 5, 7, 4, 8];
  const maxH    = Math.max(...horas);

  const logros = [
    { nombre: 'Primer módulo', desc: 'Completaste tu primer módulo', color: '#00f5a0', desbloqueado: true },
    { nombre: 'Racha de 7 días', desc: 'Estudiaste 7 días seguidos', color: '#00c3ff', desbloqueado: true },
    { nombre: 'Desarrollador Junior', desc: 'Completaste el 50% de una ruta', color: '#a78bfa', desbloqueado: true },
    { nombre: 'Maestro Python', desc: 'Finaliza el curso de Python', color: '#fb923c', desbloqueado: false },
    { nombre: 'Full Stack', desc: 'Completa la ruta Full Stack', color: '#f472b6', desbloqueado: false },
    { nombre: 'Top 10', desc: 'Entra al top 10 del ranking', color: '#fbbf24', desbloqueado: false },
  ];

  return (
    <div className="est-section-content">
      {/* Stats rápidas */}
      <div className="est-metrics-grid">
        <div className="est-metric-card cyan">
          <IconChart />
          <div>
            <span className="est-metric-value">39h</span>
            <span className="est-metric-label">Tiempo total</span>
            <span className="est-metric-sub">Este mes</span>
          </div>
        </div>
        <div className="est-metric-card green">
          <IconStar />
          <div>
            <span className="est-metric-value">12</span>
            <span className="est-metric-label">Módulos completados</span>
            <span className="est-metric-sub">De 26 en total</span>
          </div>
        </div>
        <div className="est-metric-card purple">
          <IconBook />
          <div>
            <span className="est-metric-value">7</span>
            <span className="est-metric-label">Días de racha</span>
            <span className="est-metric-sub">¡Sigue así!</span>
          </div>
        </div>
        <div className="est-metric-card orange">
          <IconUser />
          <div>
            <span className="est-metric-value">#24</span>
            <span className="est-metric-label">Ranking global</span>
            <span className="est-metric-sub">Top 15%</span>
          </div>
        </div>
      </div>

      {/* Gráfica de horas por semana */}
      <div className="est-block">
        <h3 className="est-block-title">Horas de estudio por semana</h3>
        <div className="est-bar-chart">
          {horas.map((h, i) => (
            <div key={i} className="est-bar-col">
              <span className="est-bar-val">{h}h</span>
              <div className="est-bar-outer">
                <div className="est-bar-fill" style={{ height: `${(h / maxH) * 100}%` }} />
              </div>
              <span className="est-bar-label">{semanas[i]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Insignias */}
      <div className="est-block">
        <h3 className="est-block-title">Insignias</h3>
        <div className="est-badges-grid">
          {logros.map((logro, i) => (
            <div key={i} className={`est-badge-card ${logro.desbloqueado ? 'unlocked' : 'locked'}`}
              style={{ '--badge-color': logro.color }}>
              <div className="est-badge-icon">
                {logro.desbloqueado ? <IconStar /> : <IconLock />}
              </div>
              <p className="est-badge-name">{logro.nombre}</p>
              <p className="est-badge-desc">{logro.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ─── SECCIÓN: PERFIL ─────────────────────────────────────────────── */
const SectionPerfil = ({ userName, userEmail, initials }) => (
  <div className="est-section-content">
    <div className="est-perfil-card">
      <div className="est-perfil-top">
        <div className="est-avatar-lg">{initials}</div>
        <div>
          <h2 className="est-perfil-nombre">{userName}</h2>
          <p className="est-perfil-email">{userEmail}</p>
          <span className="est-level-badge">Nivel 3 · 1.240 XP</span>
        </div>
      </div>

      <div className="est-perfil-grid">
        <div className="est-perfil-field">
          <label>Nombre completo</label>
          <input type="text" defaultValue={userName} className="est-input" />
        </div>
        <div className="est-perfil-field">
          <label>Correo electrónico</label>
          <input type="email" defaultValue={userEmail} className="est-input" disabled />
        </div>
        <div className="est-perfil-field">
          <label>Área de interés</label>
          <select className="est-input">
            <option>Desarrollo Web</option>
            <option>Ciencia de Datos</option>
            <option>Ciberseguridad</option>
            <option>Redes e Infraestructura</option>
          </select>
        </div>
        <div className="est-perfil-field">
          <label>Nivel educativo</label>
          <select className="est-input">
            <option>Técnico</option>
            <option>Tecnólogo</option>
            <option>Profesional</option>
          </select>
        </div>
      </div>

      <div className="est-perfil-actions">
        <button className="est-btn-primary">Guardar cambios</button>
        <button className="est-btn-outline-white">Cambiar contraseña</button>
      </div>
    </div>
  </div>
);

/* ─── ICONS ───────────────────────────────────────────────────────── */
const IconHome  = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;
const IconBook  = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></svg>;
const IconMap   = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></svg>;
const IconChart = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6"  y1="20" x2="6"  y2="14"/><line x1="2"  y1="20" x2="22" y2="20"/></svg>;
const IconUser  = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
const IconLogout= () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>;
const IconToggle= () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6"  x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>;
const IconStar  = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>;
const IconLock  = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>;

export default HomeEstudiante;
