import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

type Status = 'Pendente' | 'Em revisão' | 'Aprovado';

type ChecklistItem = {
  id: string;
  category: string;
  title: string;
  description: string;
  impact: 'Alto' | 'Médio' | 'Baixo';
};

const statusOptions: Status[] = ['Pendente', 'Em revisão', 'Aprovado'];

const checklistItems: ChecklistItem[] = [
  {
    id: 'secrets-env',
    category: 'Secrets',
    title: 'Secrets fora do repositório',
    description: 'Credenciais, tokens, chaves privadas e variáveis sensíveis ficam fora do código versionado.',
    impact: 'Alto',
  },
  {
    id: 'env-example',
    category: 'Secrets',
    title: 'Arquivo de exemplo sem valores reais',
    description: 'O projeto contém um modelo de variáveis com nomes esperados, mas sem conteúdo sensível.',
    impact: 'Médio',
  },
  {
    id: 'dependencies',
    category: 'Dependências',
    title: 'Dependências revisadas',
    description: 'Pacotes desnecessários foram removidos e bibliotecas principais estão atualizadas.',
    impact: 'Médio',
  },
  {
    id: 'build-validation',
    category: 'Código',
    title: 'Build validado antes do deploy',
    description: 'A aplicação compila sem erros e a versão final foi testada antes da publicação.',
    impact: 'Alto',
  },
  {
    id: 'public-data',
    category: 'Dados',
    title: 'Dados públicos revisados',
    description: 'Prints, documentos, logs, identificadores e informações pessoais foram removidos ou anonimizados.',
    impact: 'Alto',
  },
  {
    id: 'permissions',
    category: 'Acesso',
    title: 'Permissões mínimas',
    description: 'Usuários, chaves e integrações têm apenas os acessos necessários para executar sua função.',
    impact: 'Alto',
  },
  {
    id: 'logs',
    category: 'Logs',
    title: 'Logs sem informações sensíveis',
    description: 'Mensagens de erro e registros de execução não expõem tokens, e-mails, documentos ou dados internos.',
    impact: 'Médio',
  },
  {
    id: 'rollback',
    category: 'Operação',
    title: 'Plano de rollback',
    description: 'Existe um caminho claro para voltar à versão anterior caso o deploy gere falha em produção.',
    impact: 'Médio',
  },
  {
    id: 'headers',
    category: 'Web',
    title: 'Cabeçalhos e HTTPS revisados',
    description: 'Publicação com HTTPS e revisão de boas práticas como CSP, HSTS e proteção contra embedding.',
    impact: 'Médio',
  },
  {
    id: 'backup',
    category: 'Operação',
    title: 'Backup ou exportação planejada',
    description: 'Dados importantes têm rotina de exportação, backup ou recuperação compatível com o risco do sistema.',
    impact: 'Baixo',
  },
];

const categories = ['Todas', ...Array.from(new Set(checklistItems.map((item) => item.category)))];

function getInitialStatuses() {
  return checklistItems.reduce<Record<string, Status>>((statusMap, item, index) => {
    statusMap[item.id] = index < 5 ? 'Aprovado' : index < 8 ? 'Em revisão' : 'Pendente';
    return statusMap;
  }, {});
}

function getReadinessLabel(score: number) {
  if (score >= 85) {
    return 'Pronto para deploy';
  }

  if (score >= 60) {
    return 'Requer revisão';
  }

  return 'Não recomendado publicar';
}

function getStatusScore(status: Status) {
  if (status === 'Aprovado') {
    return 1;
  }

  if (status === 'Em revisão') {
    return 0.5;
  }

  return 0;
}

export default function ProjetoDevSecOpsChecklist() {
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [statuses, setStatuses] = useState<Record<string, Status>>(getInitialStatuses);

  const filteredItems = useMemo(() => {
    return checklistItems.filter((item) => (
      selectedCategory === 'Todas' || item.category === selectedCategory
    ));
  }, [selectedCategory]);

  const summary = useMemo(() => {
    const score = checklistItems.reduce((total, item) => total + getStatusScore(statuses[item.id]), 0);
    const approved = checklistItems.filter((item) => statuses[item.id] === 'Aprovado').length;
    const reviewing = checklistItems.filter((item) => statuses[item.id] === 'Em revisão').length;
    const pending = checklistItems.filter((item) => statuses[item.id] === 'Pendente').length;
    const percentage = Math.round((score / checklistItems.length) * 100);

    return {
      approved,
      reviewing,
      pending,
      percentage,
      label: getReadinessLabel(percentage),
    };
  }, [statuses]);

  const riskItems = useMemo(() => {
    return checklistItems.filter((item) => (
      item.impact === 'Alto' && statuses[item.id] !== 'Aprovado'
    ));
  }, [statuses]);

  function changeStatus(itemId: string, status: Status) {
    setStatuses((currentStatuses) => ({
      ...currentStatuses,
      [itemId]: status,
    }));
  }

  function markAllApproved() {
    setStatuses(checklistItems.reduce<Record<string, Status>>((statusMap, item) => {
      statusMap[item.id] = 'Aprovado';
      return statusMap;
    }, {}));
  }

  function resetChecklist() {
    setStatuses(getInitialStatuses());
  }

  return (
    <section className="case-page devsecops-page">
      <Link to="/projetos" className="back-link">Voltar para projetos</Link>

      <div className="case-hero">
        <div>
          <span className="eyebrow">Projeto de cibersegurança defensiva</span>
          <h1>Checklist DevSecOps para Deploy</h1>
          <p>
            Um simulador educacional para revisar segurança antes da publicação de um
            projeto. Ele não coleta dados reais, não consulta sistemas externos e usa
            somente cenários fictícios para demonstrar boas práticas de deploy seguro.
          </p>
          <div className="case-tags">
            <span>DevSecOps</span>
            <span>Checklist</span>
            <span>Deploy seguro</span>
            <span>Secrets</span>
            <span>Permissões</span>
            <span>Governança</span>
          </div>
        </div>

        <aside className="case-summary">
          <div>
            <strong>{summary.percentage}%</strong>
            <span>{summary.label}</span>
          </div>
          <div>
            <strong>{summary.approved}</strong>
            <span>itens aprovados</span>
          </div>
          <div>
            <strong>{riskItems.length}</strong>
            <span>riscos altos em aberto</span>
          </div>
        </aside>
      </div>

      <div className="devsecops-shell">
        <article className="readiness-panel">
          <div>
            <span>Prontidão para publicação</span>
            <strong>{summary.label}</strong>
          </div>
          <div className="readiness-track" aria-label={`Prontidão em ${summary.percentage}%`}>
            <span style={{ width: `${summary.percentage}%` }} />
          </div>
          <div className="readiness-counters">
            <span>{summary.approved} aprovados</span>
            <span>{summary.reviewing} em revisão</span>
            <span>{summary.pending} pendentes</span>
          </div>
        </article>

        <article className="devsecops-controls">
          <div>
            <label htmlFor="security-category">Categoria</label>
            <select
              id="security-category"
              value={selectedCategory}
              onChange={(event) => setSelectedCategory(event.target.value)}
            >
              {categories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          <button type="button" onClick={markAllApproved}>Aprovar checklist</button>
          <button type="button" onClick={resetChecklist}>Restaurar cenário</button>
        </article>

        <div className="devsecops-layout">
          <section className="security-checklist" aria-label="Checklist de segurança para deploy">
            {filteredItems.map((item) => (
              <article className="security-item" key={item.id}>
                <div>
                  <span>{item.category}</span>
                  <small className={`impact-${item.impact.toLowerCase()}`}>Impacto {item.impact}</small>
                </div>
                <h2>{item.title}</h2>
                <p>{item.description}</p>
                <div className="status-options" aria-label={`Status de ${item.title}`}>
                  {statusOptions.map((status) => (
                    <button
                      type="button"
                      key={status}
                      className={statuses[item.id] === status ? 'active' : ''}
                      onClick={() => changeStatus(item.id, status)}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </article>
            ))}
          </section>

          <aside className="security-report">
            <h2>Resumo executivo</h2>
            <p>
              Este relatório simula uma revisão pré-deploy. Ele ajuda a comunicar
              pendências de segurança de forma simples, sem expor informações internas.
            </p>

            <div className="report-box">
              <span>Status geral</span>
              <strong>{summary.label}</strong>
            </div>

            <div className="report-box">
              <span>Prioridade</span>
              <strong>{riskItems.length > 0 ? 'Resolver riscos altos' : 'Validar publicação'}</strong>
            </div>

            <div>
              <h3>Riscos altos em aberto</h3>
              {riskItems.length === 0 ? (
                <p>Nenhum risco alto pendente neste cenário.</p>
              ) : (
                <ul>
                  {riskItems.map((item) => (
                    <li key={item.id}>{item.title}</li>
                  ))}
                </ul>
              )}
            </div>
          </aside>
        </div>
      </div>

      <div className="case-grid case-wide">
        <article className="case-panel">
          <h2>O que o projeto demonstra</h2>
          <ul>
            <li>Raciocínio preventivo antes da publicação de aplicações.</li>
            <li>Classificação simples de impacto e acompanhamento de pendências.</li>
            <li>Comunicação clara entre desenvolvimento, segurança e operação.</li>
            <li>Uso de cenários fictícios para evitar exposição de dados reais.</li>
          </ul>
        </article>

        <article className="case-panel">
          <h2>Cuidados de segurança</h2>
          <p>
            O projeto é intencionalmente defensivo: não executa varreduras, não testa
            sites reais, não recebe credenciais e não armazena dados sensíveis. A proposta
            é mostrar cultura de segurança aplicada ao ciclo de entrega.
          </p>
        </article>
      </div>
    </section>
  );
}
