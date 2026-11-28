import { useState } from 'react';
import { Link } from 'react-router-dom';

type Track = 'sf' | 'sec' | 'qa';
type Filter = 'all' | Track;

type CaseCard = {
  id: string;
  track: Track;
  title: string;
  hook: string;
  description: string;
  stack: string;
  href: string;
  cta: string;
  qaHref?: string;
};

const tracks: Record<Track, { name: string; code: string }> = {
  sf: { name: 'Salesforce', code: 'SF' },
  sec: { name: 'AppSec', code: 'SEC' },
  qa: { name: 'Front + QA', code: 'QA' },
};

const cases: CaseCard[] = [
  {
    id: 'balf',
    track: 'sf',
    title: 'BALF360 — Operação Vértice',
    hook: 'Uma jornada Salesforce em fases, do Flow ao Agentforce.',
    description: 'Case visual sobre a Operação Vértice, reunindo formação, gamificação, conquistas e prática com Flow, Data 360, Agentforce e Apex.',
    stack: 'Salesforce · Agentforce · Data 360 · Apex',
    href: '/projetos/balf360',
    cta: 'Ver case',
  },
  {
    id: 'app',
    track: 'sf',
    title: 'Salesforce Portfolio App',
    hook: 'Um portfólio construído dentro da própria org.',
    description: 'Aplicação de portfólio dentro do Salesforce, com objetos customizados, relatórios, dashboard e publicação via Experience Cloud.',
    stack: 'Salesforce Admin · Experience Cloud',
    href: '/projetos/salesforce-portfolio-app',
    cta: 'Ver arquitetura',
  },
  {
    id: 'headers',
    track: 'sec',
    title: 'Security Headers Analyzer',
    hook: 'Quais headers HTTP faltam, e por que isso importa.',
    description: 'Simulador guiado para revisar headers HTTP de segurança por cenários, sem consultar sites reais nem depender de CORS.',
    stack: 'React · TypeScript · AppSec',
    href: '/projetos/security-headers',
    cta: 'Analisar cenário',
  },
  {
    id: 'devsec',
    track: 'sec',
    title: 'Checklist DevSecOps',
    hook: 'O que revisar antes de apertar deploy.',
    description: 'Simulador defensivo para revisar segredos, dependências, permissões, logs e dados públicos antes de publicar.',
    stack: 'React · TypeScript · DevSecOps',
    href: '/projetos/devsecops-checklist',
    cta: 'Testar checklist',
  },
  {
    id: 'dash',
    track: 'qa',
    title: 'Dashboard Financeiro',
    hook: 'Cada número do painel bate com as transações.',
    description: 'Painel com cards, filtros e gráficos para acompanhar receitas, despesas e saldo mensal, com um case de QA que reconcilia KPIs, filtros, gráficos e transações.',
    stack: 'React · TypeScript · Charts · Vitest',
    href: '/projetos/dashboard-financeiro',
    cta: 'Testar dashboard',
    qaHref: '/projetos/qa-dashboard-financeiro',
  },
  {
    id: 'shop',
    track: 'qa',
    title: 'Mini E-commerce',
    hook: 'Do catálogo ao checkout, testado de ponta a ponta.',
    description: 'Catálogo, busca, carrinho e resumo de compra, com automação E2E cobrindo filtros, descontos e checkout simulado.',
    stack: 'React · Estado global · Playwright',
    href: '/projetos/mini-ecommerce',
    cta: 'Testar loja',
    qaHref: '/projetos/qa-mini-ecommerce',
  },
  {
    id: 'risk',
    track: 'sec',
    title: 'Classificação de risco',
    hook: 'Impacto × probabilidade, com controles sugeridos.',
    description: 'Ferramenta defensiva que classifica ativos fictícios por impacto e probabilidade e sugere controles.',
    stack: 'React · TypeScript · Gestão de risco',
    href: '/projetos/classificacao-de-risco',
    cta: 'Simular risco',
  },
  {
    id: 'cep',
    track: 'qa',
    title: 'Buscador de CEP',
    hook: 'E quando a API cai? Também está testado.',
    description: 'Consulta de endereço por CEP com estados de carregamento, erro e resultado, mais QA de contrato, respostas, falhas e indisponibilidade do serviço.',
    stack: 'React · API · Vitest · Mocks',
    href: '/projetos/buscador-de-cep',
    cta: 'Testar projeto',
    qaHref: '/projetos/qa-buscador-de-cep',
  },
  {
    id: 'pass',
    track: 'sec',
    title: 'Política de senhas',
    hook: 'Diretrizes de senha e MFA, sem coletar nada.',
    description: 'Ferramenta educativa para montar diretrizes de senha, MFA e resposta a credenciais vazadas, sem coletar dados reais.',
    stack: 'React · TypeScript · Segurança',
    href: '/projetos/politica-de-senhas',
    cta: 'Gerar política',
  },
];

const lab = [
  { title: 'Landing page OSF Academy', stack: 'React · TypeScript · CSS', href: '/projetos/osf-academy' },
  { title: 'Lista de tarefas', stack: 'React · LocalStorage', href: '/projetos/lista-de-tarefas' },
  { title: 'QA da lista de tarefas', stack: 'Vitest · Testing Library', href: '/projetos/qa-lista-de-tarefas' },
  { title: 'Salvador de abas', stack: 'JavaScript · Chrome Extensions', href: '/projetos/salvador-de-abas' },
  { title: 'Calculadora básica', stack: 'JavaScript · React', href: '/projetos/calculadora' },
];

const filters: { id: Filter; label: string }[] = [
  { id: 'all', label: 'Todos' },
  { id: 'sf', label: 'Salesforce' },
  { id: 'sec', label: 'AppSec' },
  { id: 'qa', label: 'Front + QA' },
];

export default function Projetos() {
  const assetBase = import.meta.env.BASE_URL;
  const [filter, setFilter] = useState<Filter>('all');
  const [openCard, setOpenCard] = useState<string | null>(null);
  const [labOpen, setLabOpen] = useState(false);

  const visible = cases.filter((item) => filter === 'all' || item.track === filter);

  return (
    <section className="cases-page">
      <header className="page-hero">
        <span className="kicker">Cases</span>
        <h1>Escolha uma carta</h1>
        <p>
          Cada carta é um case. Toque para virar e ver stack, testes e links. O naipe indica a
          trilha: Salesforce, AppSec ou Front + QA.
        </p>
      </header>

      <div className="chip-row" role="group" aria-label="Filtrar por trilha">
        {filters.map((item) => (
          <button
            type="button"
            key={item.id}
            className={`chip${filter === item.id ? ' chip-on' : ''}`}
            aria-pressed={filter === item.id}
            onClick={() => {
              setFilter(item.id);
              setOpenCard(null);
            }}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="deck">
        {visible.map((item) => {
          const track = tracks[item.track];
          const flipped = openCard === item.id;
          const toggle = () => setOpenCard(flipped ? null : item.id);

          return (
            <div className={`deck-card tone-${item.track}`} key={item.id}>
              <div className={`deck-inner${flipped ? ' is-flipped' : ''}`}>
                <button
                  type="button"
                  className="deck-face deck-front"
                  onClick={toggle}
                  aria-label={`Virar a carta ${item.title}`}
                  aria-hidden={flipped}
                  tabIndex={flipped ? -1 : 0}
                >
                  <span className="deck-top">
                    <span className="card-index">
                      <b>{track.code}</b>
                      <i aria-hidden="true" />
                    </span>
                    {item.qaHref && <span className="qa-badge">Demo + QA</span>}
                  </span>
                  <img src={`${assetBase}img/cases/${item.id}.svg`} alt="" loading="lazy" />
                  <span className="deck-title">{item.title}</span>
                  <span className="deck-hook">{item.hook}</span>
                  <span className="deck-hint">Toque para virar</span>
                  <span className="card-index card-index-bottom" aria-hidden="true">
                    <b>{track.code}</b>
                    <i />
                  </span>
                </button>

                <div className="deck-face deck-back" aria-hidden={!flipped}>
                  <button
                    type="button"
                    className="deck-hit"
                    onClick={toggle}
                    aria-label={`Desvirar a carta ${item.title}`}
                    tabIndex={flipped ? 0 : -1}
                  />
                  {flipped && (
                    <div className="deck-back-content">
                      <span className="track-badge">{track.name}</span>
                      <h2>{item.title}</h2>
                      <p>{item.description}</p>
                      <span className="deck-label">Stack</span>
                      <span className="deck-stack">{item.stack}</span>
                      <div className="deck-actions">
                        <Link to={item.href} className="btn-gold">{item.cta}</Link>
                        {item.qaHref && (
                          <Link to={item.qaHref} className="btn-outline">Ver QA</Link>
                        )}
                        <span className="deck-hint-back">Toque para desvirar</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <section className="glass lab-panel" aria-labelledby="lab-title">
        <div className="lab-head">
          <div>
            <h2 id="lab-title">Laboratório</h2>
            <p>Exercícios de fundamentos: estado, eventos, testes e extensões de navegador.</p>
          </div>
          <button
            type="button"
            className="chip"
            aria-expanded={labOpen}
            aria-controls="lab-list"
            onClick={() => setLabOpen((open) => !open)}
          >
            {labOpen ? 'Recolher' : `Mostrar ${lab.length} exercícios`}
          </button>
        </div>
        {labOpen && (
          <div className="lab-grid" id="lab-list">
            {lab.map((item) => (
              <Link to={item.href} key={item.href} className="lab-item">
                <strong>{item.title}</strong>
                <span>{item.stack}</span>
              </Link>
            ))}
          </div>
        )}
      </section>
    </section>
  );
}
