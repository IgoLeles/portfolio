const projects = [
  {
    level: 'Iniciante',
    title: 'Landing Page Responsiva',
    description: 'Página simples com cabeçalho, seção principal, botões e rodapé adaptados para celular.',
    stack: 'HTML, CSS',
  },
  {
    level: 'Iniciante',
    title: 'Calculadora Básica',
    description: 'Interface para operações simples, praticando eventos, estados e organização de componentes.',
    stack: 'JavaScript, React',
  },
  {
    level: 'Intermediário',
    title: 'Lista de Tarefas',
    description: 'Cadastro, conclusão, filtro e remoção de tarefas, com dados salvos no navegador.',
    stack: 'React, TypeScript, LocalStorage',
  },
  {
    level: 'Intermediário',
    title: 'Buscador de CEP',
    description: 'Consulta de endereço por CEP, exibindo estados de carregamento, erro e resultado.',
    stack: 'React, TypeScript, API',
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
          <article className="project-card" key={project.title}>
            <span className="project-level">{project.level}</span>
            <h2>{project.title}</h2>
            <p>{project.description}</p>
            <small>{project.stack}</small>
          </article>
        ))}
      </div>
    </section>
  );
}
