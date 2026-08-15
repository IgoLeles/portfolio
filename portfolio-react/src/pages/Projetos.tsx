import { Link } from 'react-router-dom';

const projects = [
  {
    level: 'Iniciante',
    title: 'Landing Page Responsiva - OSF Academy',
    description: 'Página de apresentação do portfólio Salesforce Developer Core, destacando entregas, tecnologias e aprendizados.',
    stack: 'React, TypeScript, CSS',
    href: '/projetos/osf-academy',
  },
  {
    level: 'Intermediário',
    title: 'BALF360 - Jornada Salesforce',
    description: 'Case visual sobre a Operação Vértice, reunindo formação, gamificação, conquistas e prática com Flow, Data 360, Agentforce e Apex.',
    stack: 'Salesforce, Agentforce, Data 360',
    href: '/projetos/balf360',
    cta: 'Ver case',
  },
  {
    level: 'Iniciante',
    title: 'Calculadora Básica',
    description: 'Interface para operações simples, praticando eventos, estados e organização de componentes.',
    stack: 'JavaScript, React',
    href: '/projetos/calculadora',
    cta: 'Testar projeto',
  },
  {
    level: 'Iniciante',
    title: 'Salvador de Abas',
    description: 'Extensão para selecionar abas abertas e exportar links organizados em um arquivo HTML.',
    stack: 'JavaScript, Chrome Extensions',
    href: '/projetos/salvador-de-abas',
    cta: 'Ver case',
  },
  {
    level: 'Intermediário',
    title: 'Lista de Tarefas',
    description: 'Cadastro, conclusão, filtro e remoção de tarefas, com dados salvos no navegador.',
    stack: 'React, TypeScript, LocalStorage',
    href: '/projetos/lista-de-tarefas',
    cta: 'Testar projeto',
  },
  {
    level: 'Intermediário',
    title: 'Buscador de CEP',
    description: 'Consulta de endereço por CEP, exibindo estados de carregamento, erro e resultado.',
    stack: 'React, TypeScript, API',
    href: '/projetos/buscador-de-cep',
    cta: 'Testar projeto',
  },
  {
    level: 'Avançado',
    title: 'Dashboard Financeiro',
    description: 'Painel com cards, filtros e gráficos para acompanhar entradas, saídas e saldo mensal.',
    stack: 'React, TypeScript, Charts',
  },
  {
    level: 'Avançado',
    title: 'Mini E-commerce',
    description: 'Catálogo, busca, carrinho e resumo de compra para demonstrar fluxo completo de interface.',
    stack: 'React, TypeScript, Estado Global',
  },
];

export default function Projetos() {
  return (
    <section className="projects-view">
      <h1>Projetos</h1>
      <p className="projects-intro">
        Uma seleção de ideias para evoluir o portfólio, saindo de projetos simples até
        experiências mais completas.
      </p>
      <div className="project-grid">
        {projects.map((project) => (
          project.href ? (
            <Link to={project.href} className="project-card project-card-link" key={project.title}>
              <span className="project-level">{project.level}</span>
              <h2>{project.title}</h2>
              <p>{project.description}</p>
              <small>{project.stack}</small>
              <strong>{project.cta ?? 'Ver landing page'}</strong>
            </Link>
          ) : (
            <article className="project-card" key={project.title}>
              <span className="project-level">{project.level}</span>
              <h2>{project.title}</h2>
              <p>{project.description}</p>
              <small>{project.stack}</small>
            </article>
          )
        ))}
      </div>
    </section>
  );
}
