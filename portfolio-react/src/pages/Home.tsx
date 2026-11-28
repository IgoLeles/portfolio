import { Link } from 'react-router-dom';
import { ArrowRight, BadgeCheck, Cloud, ShieldCheck } from 'lucide-react';

const highlights = [
  { title: 'Copado Data 360', issuer: 'Copado', badge: 'copado-data360' },
  { title: 'Copado Agentia Advanced', issuer: 'Copado', badge: 'copado-agentia' },
  { title: 'Flosum Certified Expert', issuer: 'Flosum', badge: 'flosum-expert' },
  { title: 'Agentblazer Champion 2026', issuer: 'Salesforce', badge: 'agentblazer-champion' },
];

const stack = [
  { label: 'Apex', tone: 'sf' }, { label: 'LWC', tone: 'sf' }, { label: 'Flow', tone: 'sf' },
  { label: 'SOQL / SOSL', tone: 'sf' }, { label: 'Experience Cloud', tone: 'sf' },
  { label: 'Agentforce', tone: 'sf' }, { label: 'Data Cloud', tone: 'sf' }, { label: 'Copado', tone: 'sf' },
  { label: 'DevSecOps', tone: 'sec' }, { label: 'QA Automation', tone: 'sec' },
  { label: 'APIs REST · Node.js · AWS', tone: 'neutral' },
];

const tracks = [
  {
    icon: Cloud,
    tone: 'sf',
    title: 'Salesforce',
    text: 'Apps em Experience Cloud, automações com Flow e Apex, Data 360 e Agentforce.',
    examples: 'BALF360 · Salesforce Portfolio App',
  },
  {
    icon: ShieldCheck,
    tone: 'sec',
    title: 'AppSec',
    text: 'Ferramentas defensivas para revisar deploy, headers HTTP, riscos e políticas de senha.',
    examples: 'DevSecOps · Security Headers · Risco',
  },
  {
    icon: BadgeCheck,
    tone: 'qa',
    title: 'Qualidade',
    text: 'Cada app vem com o seu case de QA: Vitest, Testing Library e Playwright E2E.',
    examples: 'Dashboard · E-commerce · CEP',
  },
];

const hand = [
  { code: 'SF', tone: 'sf', img: 'balf', title: 'BALF360 — Operação Vértice', hook: 'Uma jornada Salesforce em fases.', href: '/projetos/balf360' },
  { code: 'SF', tone: 'sf', img: 'app', title: 'Salesforce Portfolio App', hook: 'Portfólio dentro da própria org.', href: '/projetos/salesforce-portfolio-app' },
  { code: 'SEC', tone: 'sec', img: 'headers', title: 'Security Headers Analyzer', hook: 'Quais headers faltam e por quê.', href: '/projetos/security-headers' },
  { code: 'QA', tone: 'qa', img: 'dash', title: 'Dashboard Financeiro', hook: 'Cada número bate com as transações.', href: '/projetos/dashboard-financeiro' },
];

export default function Home() {
  const assetBase = import.meta.env.BASE_URL;

  return (
    <div className="home-page">
      <section className="home-hero">
        <div className="home-hero-copy">
          <span className="status-pill glass">
            <span className="status-dot" aria-hidden="true" />
            <span className="role-line">Salesforce Developer · Cybersecurity · Full Stack</span>
          </span>
          <h1>
            Soluções <span className="gold">seguras</span>, testadas e prontas para produção.
          </h1>
          <p className="home-lead">
            Quase 20 anos em TI, do suporte e da infraestrutura ao desenvolvimento full stack.
            Formado em Defesa Cibernética: segurança e qualidade entram no projeto desde o primeiro commit.
          </p>
          <div className="button-row">
            <Link to="/projetos" className="btn-gold btn-lg">
              Ver cases <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <a className="btn-glass glass" href="https://www.linkedin.com/in/igoquaresma/" target="_blank" rel="noreferrer">LinkedIn</a>
            <a className="btn-glass glass" href="https://github.com/IgoLeles" target="_blank" rel="noreferrer">GitHub</a>
          </div>
        </div>

        <div className="home-hero-side">
          <div className="hero-logo">
            <picture>
              <source srcSet={`${assetBase}img/logo-iq-static.png`} media="(prefers-reduced-motion: reduce)" />
              <img
                src={`${assetBase}img/logo-iq-anim.webp`}
                alt="Logo IQ: cérebro metade circuito, metade dourado"
                width={640}
                height={442}
              />
            </picture>
          </div>
          <div className="glass highlight-card">
            <span className="kicker">Credenciais em destaque</span>
            <ul>
              {highlights.map((item) => (
                <li key={item.title}>
                  {item.badge && (
                    <img src={`${assetBase}img/badges/${item.badge}.png`} alt="" className="highlight-badge" loading="lazy" />
                  )}
                  <strong>{item.title}</strong>
                  <span>{item.issuer}</span>
                </li>
              ))}
            </ul>
            <Link to="/sobre" className="text-link">Ver todas as credenciais →</Link>
          </div>
        </div>
      </section>

      <section className="glass stack-strip" aria-label="Stack">
        <span className="kicker">Stack</span>
        {stack.map((item) => (
          <span key={item.label} className={`tag tag-${item.tone}`}>{item.label}</span>
        ))}
      </section>

      <section className="home-section">
        <div className="section-head">
          <div>
            <span className="kicker">Três trilhas</span>
            <h2>O que eu entrego</h2>
          </div>
          <Link to="/projetos" className="text-link">Todos os cases →</Link>
        </div>
        <div className="track-grid">
          {tracks.map((track) => {
            const Icon = track.icon;
            return (
              <Link to="/projetos" key={track.title} className={`glass track-card tone-${track.tone}`}>
                <Icon size={32} strokeWidth={1.6} aria-hidden="true" />
                <h3>{track.title}</h3>
                <p>{track.text}</p>
                <span>{track.examples}</span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="home-section">
        <div className="section-head">
          <div>
            <span className="kicker">Cases em destaque</span>
            <h2>Minha mão de cartas</h2>
          </div>
          <Link to="/projetos" className="text-link">Ver o baralho completo →</Link>
        </div>
        <div className="card-fan">
          {hand.map((card) => (
            <Link to={card.href} key={card.title} className={`fan-card tone-${card.tone}`}>
              <span className="card-index">
                <b>{card.code}</b>
                <i aria-hidden="true" />
              </span>
              <img src={`${assetBase}img/cases/${card.img}.svg`} alt="" loading="lazy" />
              <h3>{card.title}</h3>
              <p>{card.hook}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="glass home-about">
        <div>
          <span className="kicker">Sobre</span>
          <h2>Do suporte ao Salesforce, com segurança no centro</h2>
          <p>
            Graduação em Defesa Cibernética, três pós-graduações em segurança e um diretório
            com todas as credenciais e cursos.
          </p>
        </div>
        <Link to="/sobre" className="btn-gold btn-lg">Conheça minha trajetória</Link>
      </section>

      <section className="glass home-contact">
        <img src={`${assetBase}img/logo-iq-small.png`} alt="" />
        <h2>Vamos conversar sobre o seu projeto?</h2>
        <div className="button-row center">
          <a className="btn-gold btn-lg" href="https://www.linkedin.com/in/igoquaresma/" target="_blank" rel="noreferrer">Falar no LinkedIn</a>
          <a className="btn-glass glass" href="https://www.salesforce.com/trailblazer/igoquaresma" target="_blank" rel="noreferrer">Trailblazer</a>
          <a className="btn-glass glass" href="https://credly.com/users/ilq" target="_blank" rel="noreferrer">Credly</a>
        </div>
      </section>
    </div>
  );
}
