import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

type JourneyStatus = 'Automatizado' | 'Planejado';

type Journey = {
  id: string;
  title: string;
  layer: string;
  status: JourneyStatus;
  steps: string;
  expected: string;
};

const journeys: Journey[] = [
  {
    id: 'E2E-001',
    title: 'Buscar produto por nome',
    layer: 'Catálogo',
    status: 'Automatizado',
    steps: 'Preencher a busca com “Landing Page”.',
    expected: 'Exibe somente o produto correspondente.',
  },
  {
    id: 'E2E-002',
    title: 'Filtrar catálogo por categoria',
    layer: 'Catálogo',
    status: 'Automatizado',
    steps: 'Selecionar a categoria Segurança.',
    expected: 'Mantém visível apenas o serviço Revisão DevSecOps.',
  },
  {
    id: 'E2E-003',
    title: 'Adicionar item ao carrinho',
    layer: 'Carrinho',
    status: 'Automatizado',
    steps: 'Adicionar uma Landing Page Profissional.',
    expected: 'Atualiza quantidade, subtotal e total para R$ 890,00.',
  },
  {
    id: 'E2E-004',
    title: 'Somar unidades do mesmo produto',
    layer: 'Carrinho',
    status: 'Automatizado',
    steps: 'Adicionar duas vezes o mesmo serviço.',
    expected: 'Mantém uma linha no carrinho com quantidade igual a 2.',
  },
  {
    id: 'E2E-005',
    title: 'Aplicar desconto por faixa de valor',
    layer: 'Regra financeira',
    status: 'Automatizado',
    steps: 'Adicionar duas Integrações REST API.',
    expected: 'Calcula subtotal de R$ 3.360,00 e desconto de 8%.',
  },
  {
    id: 'E2E-006',
    title: 'Remover item ao reduzir para zero',
    layer: 'Carrinho',
    status: 'Automatizado',
    steps: 'Adicionar um item e diminuir sua quantidade.',
    expected: 'Remove a linha e restaura o estado de carrinho vazio.',
  },
  {
    id: 'E2E-007',
    title: 'Finalizar simulação de compra',
    layer: 'Checkout',
    status: 'Automatizado',
    steps: 'Adicionar um produto e finalizar a simulação.',
    expected: 'Apresenta confirmação com quantidade e total calculado.',
  },
  {
    id: 'E2E-008',
    title: 'Validar jornada em dispositivo móvel',
    layer: 'Responsividade',
    status: 'Planejado',
    steps: 'Executar o fluxo completo em viewport de 360 px.',
    expected: 'Catálogo e carrinho permanecem utilizáveis sem sobreposição.',
  },
  {
    id: 'E2E-009',
    title: 'Restaurar carrinho após nova sessão',
    layer: 'Persistência',
    status: 'Planejado',
    steps: 'Salvar itens, recarregar e reabrir a aplicação.',
    expected: 'Recupera o carrinho quando a persistência for implementada.',
  },
];

const statusFilters = ['Todos', 'Automatizado', 'Planejado'] as const;

export default function ProjetoQaMiniEcommerce() {
  const [statusFilter, setStatusFilter] = useState<(typeof statusFilters)[number]>('Todos');
  const visibleJourneys = useMemo(() => (
    statusFilter === 'Todos'
      ? journeys
      : journeys.filter((journey) => journey.status === statusFilter)
  ), [statusFilter]);

  const automated = journeys.filter((journey) => journey.status === 'Automatizado').length;
  const planned = journeys.filter((journey) => journey.status === 'Planejado').length;

  return (
    <section className="case-page qa-page qa-e2e-page">
      <Link to="/projetos" className="back-link">Voltar para projetos</Link>

      <div className="case-hero">
        <div>
          <span className="eyebrow">Case de automação E2E</span>
          <h1>QA do Mini E-commerce</h1>
          <p>
            Jornada automatizada em navegador real para validar catálogo, busca, filtros,
            carrinho e regras financeiras. O Playwright interage com a interface da mesma
            forma que um usuário, conferindo os resultados visíveis em cada etapa.
          </p>
          <div className="case-actions">
            <Link to="/projetos/mini-ecommerce">Testar aplicação</Link>
            <button
              type="button"
              onClick={() => document.getElementById('e2e-cenarios')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Examinar jornadas
            </button>
          </div>
        </div>

        <aside className="case-summary">
          <div><strong>{journeys.length}</strong><span>jornadas mapeadas</span></div>
          <div><strong>{automated}</strong><span>fluxos automatizados</span></div>
          <div><strong>Edge</strong><span>navegador real</span></div>
        </aside>
      </div>

      <div className="qa-overview-grid">
        <article className="case-panel qa-scope-panel">
          <span className="qa-panel-label">Objetivo</span>
          <h2>Regressão da jornada de compra</h2>
          <ul>
            <li>Garantir que busca e categorias apresentem o catálogo correto.</li>
            <li>Validar inclusão, incremento e remoção de itens no carrinho.</li>
            <li>Proteger subtotal, desconto de 8% e total contra regressões.</li>
            <li>Confirmar que o checkout simulado comunica o resultado da compra.</li>
          </ul>
        </article>

        <article className="case-panel qa-automation-panel">
          <span className="qa-panel-label">Execução</span>
          <h2>Playwright em navegador real</h2>
          <div className="qa-run-status">
            <span aria-hidden="true">✓</span>
            <div>
              <strong>Jornadas independentes e repetíveis</strong>
              <small>Cada teste inicia com catálogo e carrinho em estado limpo</small>
            </div>
          </div>
          <p>
            A automação usa seletores acessíveis, espera pelo comportamento visível e
            captura evidências automaticamente quando uma jornada falha.
          </p>
          <div className="case-tags">
            <span>Playwright</span><span>Chromium</span><span>E2E</span><span>Trace</span>
          </div>
        </article>
      </div>

      <article className="case-panel qa-e2e-flow-panel">
        <div className="qa-section-heading">
          <div>
            <span className="qa-panel-label">Caminho crítico</span>
            <h2>Da descoberta à confirmação</h2>
          </div>
          <p>A suíte cobre a sequência que concentra maior valor e risco para a experiência.</p>
        </div>
        <div className="qa-e2e-flow" aria-label="Jornada de compra automatizada">
          <div><span>01</span><strong>Descobrir</strong><small>buscar e filtrar</small></div>
          <b aria-hidden="true">›</b>
          <div><span>02</span><strong>Selecionar</strong><small>adicionar ao carrinho</small></div>
          <b aria-hidden="true">›</b>
          <div><span>03</span><strong>Recalcular</strong><small>quantidade e desconto</small></div>
          <b aria-hidden="true">›</b>
          <div><span>04</span><strong>Confirmar</strong><small>finalização simulada</small></div>
        </div>
      </article>

      <article className="case-panel qa-business-panel">
        <div className="qa-section-heading">
          <div>
            <span className="qa-panel-label">Oráculo de teste</span>
            <h2>Regra financeira verificada</h2>
          </div>
          <p>O resultado esperado é calculado previamente e comparado ao valor exibido.</p>
        </div>
        <div className="qa-calculation">
          <div><span>2 × R$ 1.680,00</span><strong>R$ 3.360,00</strong><small>subtotal</small></div>
          <div><span>8% sobre o subtotal</span><strong>R$ 268,80</strong><small>desconto</small></div>
          <div><span>subtotal − desconto</span><strong>R$ 3.091,20</strong><small>total esperado</small></div>
        </div>
      </article>

      <article className="case-panel qa-test-panel" id="e2e-cenarios">
        <div className="qa-section-heading">
          <div>
            <span className="qa-panel-label">Cobertura</span>
            <h2>Jornadas E2E</h2>
          </div>
          <div className="qa-filter" aria-label="Filtrar jornadas por status">
            {statusFilters.map((status) => (
              <button
                type="button"
                key={status}
                className={statusFilter === status ? 'active' : ''}
                onClick={() => setStatusFilter(status)}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        <div className="qa-test-list">
          {visibleJourneys.map((journey) => (
            <article className="qa-test-card" key={journey.id}>
              <div className="qa-test-meta"><code>{journey.id}</code><span>{journey.layer}</span></div>
              <h3>{journey.title}</h3>
              <p className="qa-api-request"><strong>Passos:</strong> {journey.steps}</p>
              <p><strong>Resultado esperado:</strong> {journey.expected}</p>
              <span className={`qa-status qa-status-${journey.status.toLowerCase()}`}>
                {journey.status}
              </span>
            </article>
          ))}
        </div>
        <p className="qa-list-summary">
          Exibindo {visibleJourneys.length} de {journeys.length} jornadas. {planned} cenários permanecem no plano de evolução.
        </p>
      </article>

      <div className="case-grid case-wide">
        <article className="case-panel">
          <h2>Critérios de saída</h2>
          <ul>
            <li>Todos os caminhos críticos automatizados executam sem falhas.</li>
            <li>Subtotal, desconto e total correspondem ao oráculo definido.</li>
            <li>O carrinho nunca mantém item com quantidade igual a zero.</li>
            <li>A confirmação final apresenta os dados calculados na jornada.</li>
          </ul>
        </article>
        <article className="case-panel">
          <h2>Próxima evolução</h2>
          <p>
            A suíte pode crescer com projetos de navegador para desktop e mobile,
            persistência do carrinho, autenticação fictícia e execução no GitHub Actions.
          </p>
          <div className="case-tags">
            <span>Mobile</span><span>Cross-browser</span><span>Persistência</span><span>CI</span>
          </div>
        </article>
      </div>
    </section>
  );
}
