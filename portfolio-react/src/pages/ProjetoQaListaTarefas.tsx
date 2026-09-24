import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

type TestStatus = 'Aprovado' | 'Falhou' | 'Planejado';
type TestType = 'Funcional' | 'Persistência' | 'Acessibilidade' | 'Responsividade';

type TestCase = {
  id: string;
  title: string;
  type: TestType;
  priority: 'Alta' | 'Média';
  status: TestStatus;
  expected: string;
};

const testCases: TestCase[] = [
  {
    id: 'CT-001',
    title: 'Cadastrar uma tarefa válida',
    type: 'Funcional',
    priority: 'Alta',
    status: 'Aprovado',
    expected: 'A nova tarefa aparece no início da lista com a prioridade selecionada.',
  },
  {
    id: 'CT-002',
    title: 'Impedir cadastro sem título',
    type: 'Funcional',
    priority: 'Alta',
    status: 'Aprovado',
    expected: 'A lista não é alterada quando o campo contém apenas espaços.',
  },
  {
    id: 'CT-003',
    title: 'Concluir e reabrir uma tarefa',
    type: 'Funcional',
    priority: 'Alta',
    status: 'Aprovado',
    expected: 'O estado visual e os indicadores são atualizados em ambas as ações.',
  },
  {
    id: 'CT-004',
    title: 'Filtrar tarefas por situação',
    type: 'Funcional',
    priority: 'Alta',
    status: 'Aprovado',
    expected: 'Cada filtro exibe somente os itens compatíveis com o critério escolhido.',
  },
  {
    id: 'CT-005',
    title: 'Remover uma tarefa',
    type: 'Funcional',
    priority: 'Alta',
    status: 'Aprovado',
    expected: 'O item é removido e os contadores são recalculados imediatamente.',
  },
  {
    id: 'CT-006',
    title: 'Restaurar dados após recarregar',
    type: 'Persistência',
    priority: 'Alta',
    status: 'Aprovado',
    expected: 'As tarefas salvas no LocalStorage reaparecem após uma nova sessão.',
  },
  {
    id: 'CT-007',
    title: 'Operar somente com teclado',
    type: 'Acessibilidade',
    priority: 'Média',
    status: 'Planejado',
    expected: 'Todos os controles recebem foco visível e podem ser acionados pelo teclado.',
  },
  {
    id: 'CT-008',
    title: 'Validar layout em 360 px',
    type: 'Responsividade',
    priority: 'Média',
    status: 'Aprovado',
    expected: 'Formulário, filtros e tarefas permanecem legíveis sem rolagem horizontal.',
  },
];

const risks = [
  { area: 'Persistência local', impact: 'Alto', probability: 'Média', coverage: 'CT-006' },
  { area: 'Alteração de status', impact: 'Alto', probability: 'Baixa', coverage: 'CT-003' },
  { area: 'Filtros da lista', impact: 'Médio', probability: 'Média', coverage: 'CT-004' },
  { area: 'Entrada inválida', impact: 'Médio', probability: 'Alta', coverage: 'CT-002' },
];

const defects = [
  {
    id: 'BUG-001',
    severity: 'Média',
    status: 'Mapeado',
    title: 'Ausência de mensagem ao tentar cadastrar um título vazio',
    detail: 'O sistema impede o cadastro, mas não informa ao usuário por que a ação não ocorreu.',
  },
  {
    id: 'BUG-002',
    severity: 'Baixa',
    status: 'Backlog',
    title: 'Prazo de novas tarefas sempre definido como hoje',
    detail: 'A versão atual ainda não permite selecionar uma data personalizada no cadastro.',
  },
];

const statusFilters = ['Todos', 'Aprovado', 'Planejado'] as const;

export default function ProjetoQaListaTarefas() {
  const [statusFilter, setStatusFilter] = useState<(typeof statusFilters)[number]>('Todos');

  const visibleCases = useMemo(() => (
    statusFilter === 'Todos'
      ? testCases
      : testCases.filter((testCase) => testCase.status === statusFilter)
  ), [statusFilter]);

  const automatedTests = 6;
  const planned = testCases.filter((testCase) => testCase.status === 'Planejado').length;

  return (
    <section className="case-page qa-page">
      <Link to="/projetos" className="back-link">Voltar para projetos</Link>

      <div className="case-hero">
        <div>
          <span className="eyebrow">Case de qualidade de software</span>
          <h1>QA da Lista de Tarefas</h1>
          <p>
            Estratégia de testes aplicada ao projeto Lista de Tarefas, cobrindo os fluxos
            de maior risco, persistência dos dados, comportamento responsivo e pontos de
            acessibilidade. O case demonstra o processo de qualidade do planejamento ao
            registro de evidências.
          </p>
          <div className="case-actions">
            <Link to="/projetos/lista-de-tarefas">Testar aplicação</Link>
            <button
              type="button"
              onClick={() => document.getElementById('cenarios')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Examinar cenários
            </button>
          </div>
        </div>

        <aside className="case-summary">
          <div>
            <strong>{testCases.length}</strong>
            <span>cenários mapeados</span>
          </div>
          <div>
            <strong>{automatedTests}</strong>
            <span>testes automatizados</span>
          </div>
          <div>
            <strong>{defects.length}</strong>
            <span>melhorias registradas</span>
          </div>
        </aside>
      </div>

      <div className="qa-overview-grid">
        <article className="case-panel qa-scope-panel">
          <span className="qa-panel-label">Estratégia</span>
          <h2>Escopo de validação</h2>
          <ul>
            <li>Cadastro, conclusão, reabertura e remoção de tarefas.</li>
            <li>Filtros por prazo e situação, com atualização dos indicadores.</li>
            <li>Persistência no navegador e recuperação segura dos dados.</li>
            <li>Experiência responsiva e navegação básica por teclado.</li>
          </ul>
        </article>

        <article className="case-panel qa-automation-panel">
          <span className="qa-panel-label">Automação</span>
          <h2>Suíte de regressão</h2>
          <div className="qa-run-status">
            <span aria-hidden="true">✓</span>
            <div>
              <strong>Fluxos críticos automatizados</strong>
              <small>Cadastro, validação, conclusão, filtros e exclusão</small>
            </div>
          </div>
          <p>
            Os testes simulam o uso real da interface e protegem os principais fluxos
            contra regressões durante a evolução do projeto.
          </p>
          <div className="case-tags">
            <span>Vitest</span>
            <span>Testing Library</span>
            <span>Regressão</span>
          </div>
        </article>
      </div>

      <article className="case-panel qa-risk-panel">
        <div className="qa-section-heading">
          <div>
            <span className="qa-panel-label">Priorização</span>
            <h2>Matriz de riscos</h2>
          </div>
          <p>Os cenários críticos foram priorizados pelo impacto no usuário e pela probabilidade de falha.</p>
        </div>
        <div className="qa-risk-table" role="table" aria-label="Matriz de riscos">
          <div className="qa-table-head" role="row">
            <span>Área</span><span>Impacto</span><span>Probabilidade</span><span>Cobertura</span>
          </div>
          {risks.map((risk) => (
            <div role="row" key={risk.area}>
              <strong>{risk.area}</strong>
              <span className={`qa-rating qa-rating-${risk.impact.toLowerCase()}`}>{risk.impact}</span>
              <span>{risk.probability}</span>
              <code>{risk.coverage}</code>
            </div>
          ))}
        </div>
      </article>

      <article className="case-panel qa-test-panel" id="cenarios">
        <div className="qa-section-heading">
          <div>
            <span className="qa-panel-label">Execução</span>
            <h2>Cenários de teste</h2>
          </div>
          <div className="qa-filter" aria-label="Filtrar cenários por status">
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
          {visibleCases.map((testCase) => (
            <article className="qa-test-card" key={testCase.id}>
              <div className="qa-test-meta">
                <code>{testCase.id}</code>
                <span>{testCase.type}</span>
                <span>Prioridade {testCase.priority.toLowerCase()}</span>
              </div>
              <h3>{testCase.title}</h3>
              <p><strong>Resultado esperado:</strong> {testCase.expected}</p>
              <span className={`qa-status qa-status-${testCase.status.toLowerCase()}`}>
                {testCase.status}
              </span>
            </article>
          ))}
        </div>
        <p className="qa-list-summary">
          Exibindo {visibleCases.length} de {testCases.length} cenários. {planned} cenário permanece no plano de evolução.
        </p>
      </article>

      <article className="case-panel qa-defect-panel">
        <div className="qa-section-heading">
          <div>
            <span className="qa-panel-label">Análise</span>
            <h2>Registro de melhorias</h2>
          </div>
          <p>Achados documentados sem bloquear a demonstração atual do projeto.</p>
        </div>
        <div className="qa-defect-grid">
          {defects.map((defect) => (
            <article key={defect.id}>
              <div>
                <code>{defect.id}</code>
                <span>Severidade {defect.severity.toLowerCase()}</span>
                <span>{defect.status}</span>
              </div>
              <h3>{defect.title}</h3>
              <p>{defect.detail}</p>
            </article>
          ))}
        </div>
      </article>

      <div className="case-grid case-wide">
        <article className="case-panel">
          <h2>Critérios de saída</h2>
          <ul>
            <li>Todos os fluxos de prioridade alta executados e aprovados.</li>
            <li>Nenhum defeito crítico ou alto aberto para publicação.</li>
            <li>Persistência validada com dados válidos e dados corrompidos.</li>
            <li>Interface utilizável nos tamanhos de tela definidos no escopo.</li>
          </ul>
        </article>
        <article className="case-panel">
          <h2>Próxima evolução</h2>
          <p>
            A próxima etapa amplia a cobertura com testes completos de teclado, auditoria
            de acessibilidade e execução automatizada no GitHub Actions a cada atualização.
          </p>
          <div className="case-tags">
            <span>QA Manual</span>
            <span>Automação</span>
            <span>Acessibilidade</span>
            <span>CI</span>
          </div>
        </article>
      </div>
    </section>
  );
}
