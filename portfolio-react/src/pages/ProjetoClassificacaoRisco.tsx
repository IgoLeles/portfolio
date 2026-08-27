import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

type AssetCategory = 'Aplicação' | 'Dados' | 'Cloud' | 'Identidade';

type AssetScenario = {
  id: string;
  category: AssetCategory;
  name: string;
  description: string;
  impact: number;
  probability: number;
  maturity: number;
};

const scenarios: AssetScenario[] = [
  {
    id: 'customer-portal',
    category: 'Aplicação',
    name: 'Portal de clientes',
    description: 'Aplicação web fictícia com login, formulário de contato e área de atendimento.',
    impact: 4,
    probability: 3,
    maturity: 3,
  },
  {
    id: 'data-export',
    category: 'Dados',
    name: 'Base exportada para análise',
    description: 'Planilha fictícia com informações operacionais, usada em um fluxo de BI interno.',
    impact: 5,
    probability: 3,
    maturity: 2,
  },
  {
    id: 'storage-bucket',
    category: 'Cloud',
    name: 'Bucket de arquivos públicos',
    description: 'Repositório fictício de assets estáticos, documentação pública e imagens do site.',
    impact: 3,
    probability: 4,
    maturity: 3,
  },
  {
    id: 'admin-account',
    category: 'Identidade',
    name: 'Conta administrativa',
    description: 'Usuário fictício com acesso elevado a configurações, integrações e permissões.',
    impact: 5,
    probability: 4,
    maturity: 2,
  },
];

const categories = ['Todos', 'Aplicação', 'Dados', 'Cloud', 'Identidade'] as const;

const recommendations: Record<AssetCategory, string[]> = {
  Aplicação: [
    'Validar entradas, mensagens de erro e fluxos de autenticação.',
    'Adicionar testes de segurança antes de novas publicações.',
    'Revisar bibliotecas, rotas expostas e permissões da aplicação.',
  ],
  Dados: [
    'Classificar dados por sensibilidade antes de compartilhar ou publicar.',
    'Aplicar retenção, backup e criptografia conforme criticidade.',
    'Remover identificadores pessoais de relatórios e ambientes de teste.',
  ],
  Cloud: [
    'Revisar políticas de acesso e exposição pública dos recursos.',
    'Habilitar logs, alertas e inventário de configurações críticas.',
    'Separar ambientes e usar permissões mínimas para integrações.',
  ],
  Identidade: [
    'Exigir MFA para contas privilegiadas e acessos sensíveis.',
    'Aplicar menor privilégio e revisão periódica de permissões.',
    'Monitorar acessos incomuns e remover contas sem uso.',
  ],
};

function classifyRisk(score: number) {
  if (score >= 17) {
    return {
      label: 'Crítico',
      className: 'risk-critical',
      priority: 'Ação imediata',
      message: 'Risco alto o suficiente para bloquear ou revisar a entrega antes de seguir.',
    };
  }

  if (score >= 11) {
    return {
      label: 'Alto',
      className: 'risk-high',
      priority: 'Mitigar antes do deploy',
      message: 'Exige plano de mitigação, responsável definido e reavaliação após os controles.',
    };
  }

  if (score >= 6) {
    return {
      label: 'Médio',
      className: 'risk-medium',
      priority: 'Acompanhar',
      message: 'Pode seguir com controles compensatórios, acompanhamento e registro da decisão.',
    };
  }

  return {
    label: 'Baixo',
    className: 'risk-low',
    priority: 'Aceitável',
    message: 'Risco controlado para o cenário simulado, mantendo monitoramento básico.',
  };
}

function getResidualScore(inherentScore: number, maturity: number) {
  const reduction = [0, 0.06, 0.14, 0.26, 0.38, 0.5][maturity] ?? 0;
  return Math.max(1, Math.round(inherentScore * (1 - reduction)));
}

function getMatrixClass(score: number) {
  return classifyRisk(score).className;
}

export default function ProjetoClassificacaoRisco() {
  const [selectedCategory, setSelectedCategory] = useState<(typeof categories)[number]>('Todos');
  const [selectedScenarioId, setSelectedScenarioId] = useState('customer-portal');
  const [impact, setImpact] = useState(4);
  const [probability, setProbability] = useState(3);
  const [maturity, setMaturity] = useState(3);

  const selectedScenario = scenarios.find((scenario) => scenario.id === selectedScenarioId) ?? scenarios[0];

  const filteredScenarios = useMemo(() => {
    return scenarios.filter((scenario) => (
      selectedCategory === 'Todos' || scenario.category === selectedCategory
    ));
  }, [selectedCategory]);

  const inherentScore = impact * probability;
  const residualScore = getResidualScore(inherentScore, maturity);
  const classification = classifyRisk(residualScore);
  const inherentClassification = classifyRisk(inherentScore);

  const nextActions = useMemo(() => {
    const baseActions = recommendations[selectedScenario.category];

    if (classification.label === 'Crítico') {
      return [
        'Pausar a publicação até reduzir probabilidade ou impacto.',
        ...baseActions,
      ];
    }

    if (classification.label === 'Alto') {
      return [
        'Registrar plano de tratamento com prazo e responsável.',
        ...baseActions,
      ];
    }

    return [
      'Documentar aceite do risco e manter evidências dos controles.',
      ...baseActions.slice(0, 2),
    ];
  }, [classification.label, selectedScenario.category]);

  function applyScenario(scenarioId: string) {
    const nextScenario = scenarios.find((scenario) => scenario.id === scenarioId);

    if (!nextScenario) {
      return;
    }

    setSelectedScenarioId(nextScenario.id);
    setImpact(nextScenario.impact);
    setProbability(nextScenario.probability);
    setMaturity(nextScenario.maturity);
  }

  function applyCategory(category: (typeof categories)[number]) {
    setSelectedCategory(category);

    const firstScenario = scenarios.find((scenario) => (
      category === 'Todos' || scenario.category === category
    ));

    if (firstScenario) {
      applyScenario(firstScenario.id);
    }
  }

  return (
    <section className="case-page risk-classification-page">
      <Link to="/projetos" className="back-link">Voltar para projetos</Link>

      <div className="case-hero">
        <div>
          <span className="eyebrow">Projeto de cibersegurança defensiva</span>
          <h1>Simulador de Classificação de Risco</h1>
          <p>
            Uma ferramenta educativa para avaliar cenários fictícios por impacto,
            probabilidade e maturidade de controles. A ideia é demonstrar priorização
            de riscos sem consultar sistemas reais, URLs, credenciais ou dados sensíveis.
          </p>
          <div className="case-tags">
            <span>Gestão de risco</span>
            <span>Matriz 5x5</span>
            <span>Controles</span>
            <span>Priorização</span>
            <span>Segurança defensiva</span>
          </div>
        </div>

        <aside className="case-summary">
          <div>
            <strong>{classification.label}</strong>
            <span>{classification.priority}</span>
          </div>
          <div>
            <strong>{residualScore}/25</strong>
            <span>risco residual</span>
          </div>
          <div>
            <strong>{inherentScore}/25</strong>
            <span>risco inerente</span>
          </div>
        </aside>
      </div>

      <div className="risk-shell">
        <article className="risk-simulator-panel">
          <div className="risk-filter-bar">
            {categories.map((category) => (
              <button
                type="button"
                key={category}
                className={selectedCategory === category ? 'active' : ''}
                onClick={() => applyCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          <label htmlFor="risk-scenario">Cenário fictício</label>
          <select
            id="risk-scenario"
            value={selectedScenarioId}
            onChange={(event) => applyScenario(event.target.value)}
          >
            {filteredScenarios.map((scenario) => (
              <option value={scenario.id} key={scenario.id}>
                {scenario.name}
              </option>
            ))}
          </select>

          <div className="risk-scenario-card">
            <span>{selectedScenario.category}</span>
            <strong>{selectedScenario.name}</strong>
            <p>{selectedScenario.description}</p>
          </div>

          <div className="risk-sliders">
            <div>
              <label htmlFor="risk-impact">Impacto</label>
              <strong>{impact}/5</strong>
              <input
                id="risk-impact"
                type="range"
                min="1"
                max="5"
                value={impact}
                onChange={(event) => setImpact(Number(event.target.value))}
              />
            </div>

            <div>
              <label htmlFor="risk-probability">Probabilidade</label>
              <strong>{probability}/5</strong>
              <input
                id="risk-probability"
                type="range"
                min="1"
                max="5"
                value={probability}
                onChange={(event) => setProbability(Number(event.target.value))}
              />
            </div>

            <div>
              <label htmlFor="risk-maturity">Maturidade dos controles</label>
              <strong>{maturity}/5</strong>
              <input
                id="risk-maturity"
                type="range"
                min="1"
                max="5"
                value={maturity}
                onChange={(event) => setMaturity(Number(event.target.value))}
              />
            </div>
          </div>
        </article>

        <aside className="risk-report">
          <div className={`risk-score-card ${classification.className}`}>
            <span>Classificação final</span>
            <strong>{classification.label}</strong>
            <p>{classification.message}</p>
          </div>

          <div className="risk-score-comparison">
            <div>
              <span>Inerente</span>
              <strong>{inherentClassification.label}</strong>
              <small>{inherentScore}/25 antes dos controles</small>
            </div>
            <div>
              <span>Residual</span>
              <strong>{classification.label}</strong>
              <small>{residualScore}/25 após controles</small>
            </div>
          </div>

          <div className="risk-recommendations">
            <h2>Ações recomendadas</h2>
            <ul>
              {nextActions.map((action) => (
                <li key={action}>{action}</li>
              ))}
            </ul>
          </div>
        </aside>
      </div>

      <article className="risk-matrix-panel">
        <div>
          <span>Probabilidade</span>
          <strong>Matriz de risco 5x5</strong>
        </div>
        <div className="risk-matrix" aria-label="Matriz de risco com impacto e probabilidade">
          {[5, 4, 3, 2, 1].map((rowProbability) => (
            Array.from({ length: 5 }, (_, index) => {
              const cellImpact = index + 1;
              const score = rowProbability * cellImpact;
              const isActive = rowProbability === probability && cellImpact === impact;

              return (
                <span
                  key={`${rowProbability}-${cellImpact}`}
                  className={`${getMatrixClass(score)} ${isActive ? 'active' : ''}`}
                  aria-label={`Impacto ${cellImpact}, probabilidade ${rowProbability}, risco ${score}`}
                >
                  {score}
                </span>
              );
            })
          ))}
        </div>
        <small>Impacto aumenta da esquerda para a direita. Probabilidade aumenta de baixo para cima.</small>
      </article>

      <div className="case-grid case-wide">
        <article className="case-panel">
          <h2>O que o projeto demonstra</h2>
          <ul>
            <li>Classificação simples de risco usando impacto, probabilidade e controles.</li>
            <li>Priorização visual para apoiar decisões antes de publicar ou alterar sistemas.</li>
            <li>Comunicação executiva com status, pontuação e próximos passos.</li>
            <li>Uso de dados fictícios para preservar privacidade e segurança.</li>
          </ul>
        </article>

        <article className="case-panel">
          <h2>Cuidados de segurança</h2>
          <p>
            O simulador não faz varredura, não consulta domínios, não testa vulnerabilidades
            e não pede informações reais. Ele transforma conceitos de gestão de risco em uma
            experiência visual segura para portfólio.
          </p>
        </article>
      </div>
    </section>
  );
}
