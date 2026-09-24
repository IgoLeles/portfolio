import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

type DataStatus = 'Aprovado' | 'Melhoria aplicada' | 'Planejado';

type DataScenario = {
  id: string;
  title: string;
  dimension: string;
  status: DataStatus;
  rule: string;
  expected: string;
};

const scenarios: DataScenario[] = [
  {
    id: 'DATA-001',
    title: 'Reconciliar visão consolidada',
    dimension: 'KPIs',
    status: 'Aprovado',
    rule: 'Somar todas as entradas e saídas da base.',
    expected: 'Entradas de R$ 34.700,00, saídas de R$ 4.780,00 e saldo de R$ 29.920,00.',
  },
  {
    id: 'DATA-002',
    title: 'Filtrar movimentações de janeiro',
    dimension: 'Período',
    status: 'Aprovado',
    rule: 'Considerar somente registros com mês igual a Janeiro.',
    expected: 'Três registros, entradas de R$ 10.000,00 e saldo de R$ 9.260,00.',
  },
  {
    id: 'DATA-003',
    title: 'Consolidar categoria Projeto',
    dimension: 'Categoria',
    status: 'Aprovado',
    rule: 'Combinar a categoria Projeto em todos os meses.',
    expected: 'Quatro entradas, nenhuma saída e total de R$ 23.300,00.',
  },
  {
    id: 'DATA-004',
    title: 'Combinar mês e categoria',
    dimension: 'Filtros',
    status: 'Aprovado',
    rule: 'Aplicar Março e Infraestrutura simultaneamente.',
    expected: 'Uma saída de R$ 860,00 e saldo negativo de R$ 860,00.',
  },
  {
    id: 'DATA-005',
    title: 'Sincronizar gráfico de categorias',
    dimension: 'Gráfico',
    status: 'Aprovado',
    rule: 'Aplicar categoria Assinaturas em todos os meses.',
    expected: 'Uma barra com total acumulado de R$ 1.130,00.',
  },
  {
    id: 'DATA-006',
    title: 'Manter fluxo mensal como referência global',
    dimension: 'Gráfico',
    status: 'Aprovado',
    rule: 'Alterar filtros da análise detalhada.',
    expected: 'O comparativo mensal continua exibindo os quatro meses da base.',
  },
  {
    id: 'DATA-007',
    title: 'Explicar combinação sem resultados',
    dimension: 'Experiência',
    status: 'Melhoria aplicada',
    rule: 'Selecionar Janeiro e Cursos.',
    expected: 'Exibe estado vazio no gráfico de categorias e na lista de movimentações.',
  },
  {
    id: 'DATA-008',
    title: 'Descrever gráficos para tecnologia assistiva',
    dimension: 'Acessibilidade',
    status: 'Melhoria aplicada',
    rule: 'Navegar pela estrutura sem depender das cores ou alturas.',
    expected: 'Cada grupo possui descrição textual com categoria ou mês e respectivos valores.',
  },
  {
    id: 'DATA-009',
    title: 'Validar importação de arquivo financeiro',
    dimension: 'Qualidade de dados',
    status: 'Planejado',
    rule: 'Importar CSV com campos ausentes, duplicados e formatos inválidos.',
    expected: 'Rejeita registros inconsistentes e apresenta relatório de validação.',
  },
];

const reconciliations = [
  { view: 'Consolidado', records: '12', income: 'R$ 34.700,00', expenses: 'R$ 4.780,00', balance: 'R$ 29.920,00' },
  { view: 'Janeiro', records: '3', income: 'R$ 10.000,00', expenses: 'R$ 740,00', balance: 'R$ 9.260,00' },
  { view: 'Categoria Projeto', records: '4', income: 'R$ 23.300,00', expenses: 'R$ 0,00', balance: 'R$ 23.300,00' },
  { view: 'Março + Infraestrutura', records: '1', income: 'R$ 0,00', expenses: 'R$ 860,00', balance: '-R$ 860,00' },
];

const statusFilters = ['Todos', 'Aprovado', 'Melhoria aplicada', 'Planejado'] as const;

export default function ProjetoQaDashboardFinanceiro() {
  const [statusFilter, setStatusFilter] = useState<(typeof statusFilters)[number]>('Todos');
  const visibleScenarios = useMemo(() => (
    statusFilter === 'Todos'
      ? scenarios
      : scenarios.filter((scenario) => scenario.status === statusFilter)
  ), [statusFilter]);

  const automated = scenarios.filter((scenario) => scenario.status === 'Aprovado' || scenario.status === 'Melhoria aplicada').length;

  return (
    <section className="case-page qa-page qa-data-page">
      <Link to="/projetos" className="back-link">Voltar para projetos</Link>

      <div className="case-hero">
        <div>
          <span className="eyebrow">Case de qualidade de dados</span>
          <h1>QA do Dashboard Financeiro</h1>
          <p>
            Validação da consistência entre a base de movimentações, os filtros, os KPIs,
            os gráficos e a tabela detalhada. O objetivo é garantir que diferentes formas
            de visualizar os mesmos dados produzam resultados reconciliáveis.
          </p>
          <div className="case-actions">
            <Link to="/projetos/dashboard-financeiro">Testar dashboard</Link>
            <button
              type="button"
              onClick={() => document.getElementById('data-cenarios')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Examinar validações
            </button>
          </div>
        </div>

        <aside className="case-summary">
          <div><strong>{scenarios.length}</strong><span>cenários mapeados</span></div>
          <div><strong>{automated}</strong><span>validações cobertas</span></div>
          <div><strong>2</strong><span>melhorias aplicadas</span></div>
        </aside>
      </div>

      <div className="qa-overview-grid">
        <article className="case-panel qa-scope-panel">
          <span className="qa-panel-label">Estratégia</span>
          <h2>Qualidade de ponta a ponta</h2>
          <ul>
            <li>Conferência dos totais diretamente contra a base de movimentações.</li>
            <li>Filtros isolados e combinados por mês e categoria.</li>
            <li>Consistência entre KPIs, barras e registros detalhados.</li>
            <li>Tratamento de saldo negativo e combinações sem dados.</li>
          </ul>
        </article>

        <article className="case-panel qa-automation-panel">
          <span className="qa-panel-label">Automação</span>
          <h2>Oráculos financeiros explícitos</h2>
          <div className="qa-run-status">
            <span aria-hidden="true">✓</span>
            <div>
              <strong>Valores esperados calculados previamente</strong>
              <small>Entradas − saídas = saldo para cada recorte analisado</small>
            </div>
          </div>
          <p>
            A suíte compara números visíveis e quantidade de registros, evitando que uma
            alteração apresente KPIs corretos com tabela ou gráficos inconsistentes.
          </p>
          <div className="case-tags"><span>Vitest</span><span>Testing Library</span><span>Data QA</span></div>
        </article>
      </div>

      <article className="case-panel qa-data-lineage-panel">
        <div className="qa-section-heading">
          <div>
            <span className="qa-panel-label">Linhagem do dado</span>
            <h2>Uma base, quatro leituras</h2>
          </div>
          <p>Todos os componentes devem refletir o mesmo conjunto filtrado de movimentações.</p>
        </div>
        <div className="qa-data-lineage" aria-label="Fluxo dos dados no dashboard">
          <div><span>Fonte</span><strong>12 movimentações</strong><small>base controlada</small></div>
          <b aria-hidden="true">›</b>
          <div><span>Recorte</span><strong>Mês + categoria</strong><small>filtros combinados</small></div>
          <b aria-hidden="true">›</b>
          <div><span>Resumo</span><strong>KPIs</strong><small>entradas, saídas e saldo</small></div>
          <b aria-hidden="true">›</b>
          <div><span>Evidência</span><strong>Gráficos + tabela</strong><small>detalhamento reconciliado</small></div>
        </div>
      </article>

      <article className="case-panel qa-reconciliation-panel">
        <div className="qa-section-heading">
          <div>
            <span className="qa-panel-label">Oráculo de teste</span>
            <h2>Matriz de reconciliação</h2>
          </div>
          <p>Recortes representativos com valores usados como referência na automação.</p>
        </div>
        <div className="qa-reconciliation-table" role="table" aria-label="Matriz de reconciliação financeira">
          <div className="qa-table-head" role="row">
            <span>Visão</span><span>Registros</span><span>Entradas</span><span>Saídas</span><span>Saldo</span>
          </div>
          {reconciliations.map((item) => (
            <div role="row" key={item.view}>
              <strong>{item.view}</strong><span>{item.records}</span><span>{item.income}</span><span>{item.expenses}</span><code>{item.balance}</code>
            </div>
          ))}
        </div>
      </article>

      <article className="case-panel qa-improvements-panel">
        <div className="qa-section-heading">
          <div>
            <span className="qa-panel-label">Achados resolvidos</span>
            <h2>Qualidade também melhora o produto</h2>
          </div>
          <p>Dois pontos identificados durante a análise foram corrigidos no dashboard.</p>
        </div>
        <div className="qa-improvement-grid">
          <div><span>RESOLVIDO</span><strong>Estado vazio informativo</strong><p>Filtros sem correspondência agora explicam a ausência de movimentações.</p></div>
          <div><span>RESOLVIDO</span><strong>Descrição acessível dos gráficos</strong><p>Valores das barras podem ser compreendidos sem depender apenas de cor e altura.</p></div>
        </div>
      </article>

      <article className="case-panel qa-test-panel" id="data-cenarios">
        <div className="qa-section-heading">
          <div><span className="qa-panel-label">Cobertura</span><h2>Cenários de qualidade de dados</h2></div>
          <div className="qa-filter qa-filter-four" aria-label="Filtrar cenários por status">
            {statusFilters.map((status) => (
              <button type="button" key={status} className={statusFilter === status ? 'active' : ''} onClick={() => setStatusFilter(status)}>
                {status}
              </button>
            ))}
          </div>
        </div>

        <div className="qa-test-list">
          {visibleScenarios.map((scenario) => (
            <article className="qa-test-card" key={scenario.id}>
              <div className="qa-test-meta"><code>{scenario.id}</code><span>{scenario.dimension}</span></div>
              <h3>{scenario.title}</h3>
              <p className="qa-api-request"><strong>Regra:</strong> {scenario.rule}</p>
              <p><strong>Resultado esperado:</strong> {scenario.expected}</p>
              <span className={`qa-status qa-status-${scenario.status.toLowerCase().replace(' ', '-')}`}>{scenario.status}</span>
            </article>
          ))}
        </div>
        <p className="qa-list-summary">Exibindo {visibleScenarios.length} de {scenarios.length} cenários.</p>
      </article>

      <div className="case-grid case-wide">
        <article className="case-panel">
          <h2>Critérios de saída</h2>
          <ul>
            <li>Saldo corresponde sempre à diferença entre entradas e saídas filtradas.</li>
            <li>Quantidade de registros coincide com a tabela apresentada.</li>
            <li>Filtros combinados atualizam todas as leituras dependentes.</li>
            <li>Ausência de dados é comunicada sem aparentar falha de carregamento.</li>
          </ul>
        </article>
        <article className="case-panel">
          <h2>Próxima evolução</h2>
          <p>
            A futura importação de CSV permitirá testar schema, duplicidade, valores
            ausentes, formatos monetários, datas inválidas e rastreabilidade da origem.
          </p>
          <div className="case-tags"><span>CSV</span><span>Schema</span><span>Duplicidade</span><span>Data Lineage</span></div>
        </article>
      </div>
    </section>
  );
}
