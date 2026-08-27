import { Link } from 'react-router-dom';

const dataObjects = [
  {
    name: 'About Me',
    description: 'Resumo profissional, posicionamento, links públicos e apresentação do perfil.',
  },
  {
    name: 'Salesforce Projects',
    description: 'Projetos com problema de negócio, solução, nuvem Salesforce, tecnologias e links.',
  },
  {
    name: 'Experience',
    description: 'Experiências profissionais organizadas por cargo, empresa, período e responsabilidades.',
  },
  {
    name: 'Certifications',
    description: 'Certificações, formações, provedor, data, status e URL de verificação.',
  },
  {
    name: 'Skills',
    description: 'Competências técnicas classificadas por categoria, nível e aplicação prática.',
  },
  {
    name: 'Contact',
    description: 'Canais públicos para contato profissional, com atenção a privacidade e exposição.',
  },
];

const deliverySteps = [
  'Criação de um aplicativo Salesforce Portfolio dentro de uma Developer Edition.',
  'Modelagem de objetos e campos para transformar currículo, projetos e certificações em dados estruturados.',
  'Organização de páginas, registros e visualizações para navegação administrativa dentro da Salesforce.',
  'Construção de relatórios e dashboard para demonstrar evolução, tecnologias e composição do portfólio.',
  'Planejamento de publicação pública via Experience Cloud, com foco em recrutadores e visitantes externos.',
];

const safetyItems = [
  'Permissões do Guest User limitadas ao necessário para leitura pública.',
  'Revisão de acesso por objeto e por campo antes de publicar qualquer página.',
  'Remoção de dados sensíveis, telefones, documentos internos e materiais de estudo proprietários.',
  'Uso de imagens conceituais e dados fictícios no GitHub para preservar privacidade e direitos autorais.',
];

export default function ProjetoSalesforcePortfolioApp() {
  const assetBase = import.meta.env.BASE_URL;
  const conceptImage = `${assetBase}img/salesforce-portfolio-app-concept.png`;

  return (
    <section className="case-page salesforce-portfolio-page">
      <Link to="/projetos" className="back-link">Voltar para projetos</Link>

      <div className="case-hero">
        <div>
          <span className="eyebrow">Projeto Salesforce</span>
          <h1>Salesforce Portfolio App</h1>
          <p>
            Um case de Salesforce Admin e Platform para estruturar um portfólio
            profissional dentro de uma Developer Edition, usando objetos customizados,
            páginas, relatórios, dashboard e uma camada pública planejada com
            Experience Cloud.
          </p>
          <div className="case-tags">
            <span>Salesforce Admin</span>
            <span>Experience Cloud</span>
            <span>Custom Objects</span>
            <span>Reports & Dashboards</span>
            <span>Data Model</span>
            <span>Security</span>
          </div>
        </div>

        <aside className="case-summary">
          <div>
            <strong>6 objetos</strong>
            <span>modelo de dados</span>
          </div>
          <div>
            <strong>Reports</strong>
            <span>visão executiva</span>
          </div>
          <div>
            <strong>Experience</strong>
            <span>camada pública</span>
          </div>
        </aside>
      </div>

      <article className="case-panel case-visual salesforce-architecture">
        <div>
          <h2>Arquitetura visual</h2>
          <p>
            A imagem traduz o projeto em uma visão simples: uma org Salesforce com
            objetos customizados alimentando páginas, relatórios, dashboard e uma
            experiência pública para recrutadores. É uma representação conceitual, sem
            telas internas, dados reais ou materiais privados.
          </p>
        </div>
        <a href={conceptImage} target="_blank" rel="noreferrer" aria-label="Abrir arquitetura visual em tamanho maior">
          <img src={conceptImage} alt="Arquitetura conceitual do Salesforce Portfolio App" />
          <span>Ampliar</span>
        </a>
      </article>

      <div className="case-grid">
        <article className="case-panel">
          <h2>O que foi feito</h2>
          <ul>
            {deliverySteps.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>

        <article className="case-panel">
          <h2>Segurança e publicação</h2>
          <p>
            A parte pública do projeto exige cuidado porque um portfólio em Salesforce
            pode expor registros reais se permissões forem abertas demais. A proposta
            é publicar apenas o necessário para consulta externa.
          </p>
          <ul>
            {safetyItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </div>

      <article className="case-panel case-wide">
        <h2>Modelo de dados</h2>
        <div className="data-model-grid">
          {dataObjects.map((object) => (
            <div key={object.name}>
              <strong>{object.name}</strong>
              <p>{object.description}</p>
            </div>
          ))}
        </div>
      </article>

      <article className="case-panel case-wide github-safety-panel">
        <div>
          <h2>Versão pública segura para GitHub</h2>
          <p>
            Para transformar esse estudo em repositório público, a melhor abordagem é
            publicar um README completo com arquitetura, tabela de objetos e campos,
            exemplos fictícios de registros, prints recriados e próximos passos. Os
            PDFs, telas originais de estudo e materiais internos ficam somente no
            ambiente local.
          </p>
        </div>
        <div className="case-tags">
          <span>README</span>
          <span>Diagrama</span>
          <span>Objetos e campos</span>
          <span>Dados fictícios</span>
          <span>Sem PDFs privados</span>
        </div>
      </article>
    </section>
  );
}
