import { Link } from 'react-router-dom';

const highlights = [
  'Validação de CEP brasileiro em Account com Apex Trigger, handler, service e testes.',
  'Atribuição de desconto por Stage em Opportunity com regra automatizada e cobertura de testes.',
  'Callout Apex para API externa com mock e testes unitários.',
  'Componente LWC accountWeather validado com Jest.',
  'Processamento assíncrono com Batch Apex e agendamento Schedulable para arquivamento de Contacts.',
];

const metrics = [
  { value: '6 semanas', label: 'Programa prático' },
  { value: '5 entregas', label: 'Hands-on principais' },
  { value: 'Apex + LWC', label: 'Stack Salesforce' },
];

const stack = [
  'Apex',
  'Triggers',
  'SOQL',
  'LWC',
  'Jest',
  'Batch Apex',
  'Schedulable',
  'Callouts',
  'SFDX',
  'Tests',
];

export default function ProjetoOsfAcademy() {
  const assetBase = import.meta.env.BASE_URL;
  const conceptImage = `${assetBase}img/osf-academy-concept.png`;

  return (
    <section className="case-page">
      <Link to="/projetos" className="back-link">Voltar para projetos</Link>

      <div className="case-hero">
        <div>
          <span className="eyebrow">Landing Page Responsiva</span>
          <h1>Salesforce Developer Core - OSF Academy</h1>
          <p>
            Uma landing page para traduzir o repositório técnico em uma apresentação clara
            de portfólio, mostrando contexto, entregas práticas, tecnologias e aprendizados
            do programa Salesforce Developer Core.
          </p>
          <div className="case-actions">
            <a
              href="https://github.com/IgoLeles/salesforce-dev-core-portfolio"
              target="_blank"
              rel="noreferrer"
            >
              Ver código no GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/igoquaresma/"
              target="_blank"
              rel="noreferrer"
            >
              Ver LinkedIn
            </a>
          </div>
        </div>

        <aside className="case-summary">
          {metrics.map((metric) => (
            <div key={metric.label}>
              <strong>{metric.value}</strong>
              <span>{metric.label}</span>
            </div>
          ))}
        </aside>
      </div>

      <article className="case-panel case-visual">
        <div>
          <h2>Visual do projeto</h2>
          <p>
            Um mapa conceitual das principais partes da entrega: automações, integrações,
            componente LWC, testes e processamento assíncrono conectados em uma visão única.
          </p>
        </div>
        <a href={conceptImage} target="_blank" rel="noreferrer" aria-label="Abrir visual do projeto em tamanho maior">
          <img
            src={conceptImage}
            alt="Mapa conceitual visual do projeto Salesforce Developer Core"
          />
          <span>Clique para ampliar</span>
        </a>
      </article>

      <div className="case-grid">
        <article className="case-panel">
          <h2>O que foi feito</h2>
          <p>
            O projeto reúne entregas práticas do programa OSF Academy e estudos no Trailhead,
            com foco em desenvolvimento Salesforce aplicado a cenários próximos de ambiente
            corporativo.
          </p>
          <ul>
            {highlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
        </article>

        <article className="case-panel">
          <h2>Competências demonstradas</h2>
          <p>
            A implementação mostra domínio da base de desenvolvimento Salesforce, cobrindo
            automações, integrações, testes, componentes de interface e execução assíncrona.
          </p>
          <div className="case-tags">
            {stack.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </article>
      </div>

      <article className="case-panel case-wide">
        <h2>Como essa landing page ajuda o portfólio</h2>
        <p>
          Em vez de exigir que o visitante leia diretamente a estrutura do repositório, a
          página apresenta o projeto como uma narrativa: problema, execução, tecnologias e
          resultado. Isso facilita a leitura para recrutadores, lideranças técnicas e pessoas
          que querem entender rapidamente o valor do projeto.
        </p>
      </article>
    </section>
  );
}
