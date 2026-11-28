import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const links = [
  { to: '/', label: 'Início', end: true },
  { to: '/projetos', label: 'Cases', end: false },
  { to: '/sobre', label: 'Sobre', end: false },
  { to: '/contato', label: 'Contato', end: false },
];

export default function Header() {
  const assetBase = import.meta.env.BASE_URL;
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className="glass-header">
      <nav className={`glass-nav glass${menuOpen ? ' is-open' : ''}`} aria-label="Menu principal">
        <NavLink to="/" className="brand-link" aria-label="Igo Quaresma, página inicial">
          <img src={`${assetBase}img/logo-iq-small.png`} alt="" className="brand-logo" />
          <span>Igo <em>Quaresma</em></span>
        </NavLink>

        <div className="nav-links" id="menu-principal">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) => `nav-pill${isActive ? ' active' : ''}`}
            >
              {link.label}
            </NavLink>
          ))}
          <a className="btn-gold nav-cv-mobile" href={`${assetBase}curriculo.html`}>Currículo</a>
        </div>

        <div className="nav-actions">
          <a className="btn-gold nav-cv" href={`${assetBase}curriculo.html`}>Currículo</a>
          <button
            type="button"
            className="menu-toggle"
            aria-expanded={menuOpen}
            aria-controls="menu-principal"
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>
        </div>
      </nav>
    </header>
  );
}
