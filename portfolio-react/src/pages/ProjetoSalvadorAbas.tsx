import { Link } from 'react-router-dom';

const metrics = [
  { value: '14', label: 'abas selecionadas' },
  { value: 'HTML', label: 'arquivo exportado' },
  { value: 'Chrome', label: 'extensão de navegador' },
];

const highlights = [
  'Leitura das abas abertas e seleção individual do que será salvo.',
  'Ações rápidas para selecionar tudo, limpar seleção e exportar conteúdo.',
  'Geração de arquivo HTML com data, horário, janelas e links organizados.',
  'Fluxo útil para pesquisa, estudo, curadoria de referências e continuidade de trabalho.',
];

const stack = ['JavaScript', 'Chrome Extensions', 'HTML', 'CSS', 'Browser APIs'];

export default function ProjetoSalvadorAbas() {
  const assetBase = import.meta.env.BASE_URL;
  const interfaceImage = `${assetBase}img/tab-saver-interface.png`;
  const exportImage = `${assetBase}img/tab-saver-export.png`;
  const linksImage = `${assetBase}img/tab-saver-links.png`;

  return (
    <section className="case-page tab-saver-page">
      <Link to="/projetos" className="back-link">Voltar para projetos</Link>

      <div className="case-hero">
        <div>
          <span className="eyebrow">Projeto iniciante</span>
          <h1>Salvador de Abas</h1>
          <p>
            Uma extensão para salvar abas abertas do navegador em um arquivo HTML organizado.
            O projeto resolve um problema simples e real: guardar pesquisas em andamento sem
            perder contexto entre sessões de estudo e trabalho.
          </p>
          <div className="case-tags">
            {stack.map((item) => (
              <span key={item}>{item}</span>
            ))}
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

      <article className="case-panel case-visual tab-saver-visual">
        <div>
          <h2>Fluxo visual</h2>
          <p>
            Os prints mostram a interface da extensão, o download iniciado e o resultado em
            HTML com as abas exportadas. Clique em qualquer imagem para ver em tamanho maior.
          </p>
        </div>

        <div className="visual-gallery visual-gallery-three">
          <a href={interfaceImage} target="_blank" rel="noreferrer" aria-label="Abrir interface do Salvador de Abas">
            <img src={interfaceImage} alt="Interface do Salvador de Abas com abas selecionadas" />
            <span>Extensão</span>
          </a>
          <a href={exportImage} target="_blank" rel="noreferrer" aria-label="Abrir cabeçalho do arquivo exportado">
            <img src={exportImage} alt="Arquivo HTML exportado pelo Salvador de Abas" />
            <span>Exportação</span>
          </a>
          <a href={linksImage} target="_blank" rel="noreferrer" aria-label="Abrir lista de links exportados">
            <img src={linksImage} alt="Lista de links salvos em HTML" />
            <span>Links</span>
          </a>
        </div>
      </article>

      <div className="case-grid">
        <article className="case-panel">
          <h2>O que foi feito</h2>
          <p>
            O projeto transforma abas abertas em um registro portável. Em vez de depender
            do histórico do navegador, o usuário escolhe as abas relevantes e baixa um
            arquivo com títulos e URLs.
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
            Além de praticar JavaScript, o projeto evidencia uso de APIs do navegador,
            manipulação de listas, estados de seleção, geração de arquivo e atenção à
            experiência de quem precisa salvar referências rapidamente.
          </p>
          <div className="case-tags">
            {stack.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}
