import { NavLink } from 'react-router-dom';

const links = [
  { to: '/', label: 'Home' },
  { to: '/sobre', label: 'Sobre' },
  { to: '/projetos', label: 'Projetos' },
  { to: '/contato', label: 'Contato' },
];

export default function Header() {
  const assetBase = import.meta.env.BASE_URL;

  return (
    <header className="site-header">
      <div className="header-inner">
        <NavLink to="/" className="logo-link" aria-label="Ir para a página inicial">
          <img src={`${assetBase}img/logo.png`} alt="Logo Igo Quaresma" className="logo" />
        </NavLink>

        <nav className="main-nav" aria-label="Menu principal">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
