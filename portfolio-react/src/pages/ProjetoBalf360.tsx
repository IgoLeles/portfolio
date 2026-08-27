import { Link } from 'react-router-dom';

const stats = [
  { value: '85h', label: 'de formação' },
  { value: '19', label: 'encontros ao vivo' },
  { value: '5/5', label: 'Power Stones' },
  { value: '117', label: 'missões concluídas' },
  { value: '15', label: 'conquistas' },
  { value: '#46', label: 'ranking geral' },
];

const learningPath = [
  'Flow e automações aplicadas a processos de negócio.',
  'Slack como camada de colaboração e execução operacional.',
  'Data 360 / Data Cloud para visão de dados e harmonização.',
  'Agentforce e IA generativa como evolução da automação Salesforce.',
  'Apex e fundamentos para cenários onde low-code não é suficiente.',
];

const outcomes = [
  'Vivência prática em uma jornada seletiva e gamificada, com presença, missões e acompanhamento.',
  'Ampliação de repertório técnico para atuar com automação, dados, IA e desenvolvimento Salesforce.',
  'Organização de conquistas, certificado e evidências visuais como parte da minha evolução profissional.',
];

export default function ProjetoBalf360() {
  const assetBase = import.meta.env.BASE_URL;
  const dashboardImage = `${assetBase}img/balf360-dashboard.png`;
  const certificateImage = `${assetBase}img/balf360-certificate.png`;

  return (
    <section className="case-page balf-page">
      <Link to="/projetos" className="back-link">Voltar para projetos</Link>

      <div className="case-hero">
        <div>
          <span className="eyebrow">Case de formação Salesforce</span>
          <h1>BALF360 - Operação Vértice</h1>
          <p>
            Um case visual da jornada BALF360, programa gratuito, seletivo e gamificado de
            aceleração Salesforce, com foco em Flow, Slack, Data 360, Agentforce e Apex.
          </p>
          <div className="case-actions">
            <a href="https://www.balf.me/recrutamento.html" target="_blank" rel="noreferrer">
              Ver página do BALF360
            </a>
            <a
              href="https://trailhead.salesforce.com/pt-BR/users/jhonathanviana/trailmixes/balf-agentforce-intro"
              target="_blank"
              rel="noreferrer"
            >
              Ver trailmix Agentforce
            </a>
          </div>
        </div>

        <aside className="case-summary">
          <div>
            <strong>2026</strong>
            <span>Operação Vértice</span>
          </div>
          <div>
            <strong>Salesforce</strong>
            <span>Flow, Data 360, Agentforce e Apex</span>
          </div>
          <div>
            <strong>Coronel</strong>
            <span>nível alcançado na jornada</span>
          </div>
        </aside>
      </div>

      <div className="balf-stats">
        {stats.map((stat) => (
          <div key={stat.label}>
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </div>
        ))}
      </div>

      <article className="case-panel case-visual">
        <div>
          <h2>Evidências visuais</h2>
          <p>
            Os recortes mostram o balanço da jornada e o certificado de conclusão. Eles
            ajudam o visitante a entender rapidamente a dimensão da formação e os marcos
            alcançados.
          </p>
        </div>
        <div className="visual-gallery">
          <a href={dashboardImage} target="_blank" rel="noreferrer" aria-label="Abrir painel BALF360 em tamanho maior">
            <img src={dashboardImage} alt="Painel de conquistas e métricas da jornada BALF360" />
            <span>Painel</span>
          </a>
          <a href={certificateImage} target="_blank" rel="noreferrer" aria-label="Abrir certificado BALF360 em tamanho maior">
            <img src={certificateImage} alt="Certificado de conclusão BALF360" />
            <span>Certificado</span>
          </a>
        </div>
      </article>

      <div className="case-grid">
        <article className="case-panel">
          <h2>Trilha percorrida</h2>
          <p>
            A proposta do BALF360 foi transformar conteúdo em prática e posicionamento real
            dentro do ecossistema Salesforce.
          </p>
          <ul>
            {learningPath.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>

        <article className="case-panel">
          <h2>Aprendizados aplicados</h2>
          <p>
            A formação conectou estudo, disciplina, comunidade e prática técnica em uma
            experiência próxima de desafios reais do ecossistema Salesforce.
          </p>
          <ul>
            {outcomes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </div>

      <article className="case-panel case-wide">
        <h2>Impacto na jornada Salesforce</h2>
        <p>
          O BALF360 complementou minha base construída na OSF Academy. Enquanto a OSF
          trouxe entregas de código, testes e estrutura de desenvolvimento, o BALF360
          ampliou minha visão sobre prática orientada, IA, dados, automação e colaboração
          dentro do universo Salesforce.
        </p>
      </article>
    </section>
  );
}
