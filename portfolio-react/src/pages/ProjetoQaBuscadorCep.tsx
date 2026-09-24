import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

type ApiStatus = 'Aprovado' | 'Planejado';
type ApiCategory = 'Validação' | 'Contrato' | 'Resiliência' | 'Integração';

type ApiTestCase = {
  id: string;
  title: string;
  category: ApiCategory;
  status: ApiStatus;
  request: string;
  expected: string;
};

const apiCases: ApiTestCase[] = [
  {
    id: 'API-001',
    title: 'Consultar CEP válido',
    category: 'Contrato',
    status: 'Aprovado',
    request: 'GET /ws/01001000/json/',
    expected: 'Retorna CEP, logradouro, bairro, localidade, UF, IBGE e DDD.',
  },
  {
    id: 'API-002',
    title: 'Bloquear CEP incompleto antes da API',
    category: 'Validação',
    status: 'Aprovado',
    request: 'Entrada: 01001',
    expected: 'Exibe orientação de 8 dígitos e não realiza requisição externa.',
  },
  {
    id: 'API-003',
    title: 'Tratar CEP inexistente',
    category: 'Contrato',
    status: 'Aprovado',
    request: 'Resposta: { "erro": true }',
    expected: 'Informa que o CEP não foi encontrado e não consulta coordenadas.',
  },
  {
    id: 'API-004',
    title: 'Tratar falha HTTP do ViaCEP',
    category: 'Resiliência',
    status: 'Aprovado',
    request: 'Resposta HTTP não bem-sucedida',
    expected: 'Remove resultados anteriores e apresenta mensagem de indisponibilidade.',
  },
  {
    id: 'API-005',
    title: 'Manter endereço sem geolocalização',
    category: 'Integração',
    status: 'Aprovado',
    request: 'OpenStreetMap sem resultado',
    expected: 'Mantém o endereço e oferece busca textual no mapa.',
  },
  {
    id: 'API-006',
    title: 'Exibir marcador quando há coordenadas',
    category: 'Integração',
    status: 'Aprovado',
    request: 'Nominatim: latitude e longitude',
    expected: 'Monta o mapa aproximado com marcador e link para zoom.',
  },
  {
    id: 'API-007',
    title: 'Validar estado de carregamento',
    category: 'Resiliência',
    status: 'Planejado',
    request: 'Resposta da API com atraso controlado',
    expected: 'Desabilita o envio e apresenta “Buscando...” até a conclusão.',
  },
  {
    id: 'API-008',
    title: 'Validar limite e estabilidade do serviço',
    category: 'Resiliência',
    status: 'Planejado',
    request: 'Carga controlada em ambiente autorizado',
    expected: 'Registra latência e erros sem gerar tráfego indevido na API pública.',
  },
];

const contractFields = [
  { field: 'cep', type: 'string', required: 'Sim', purpose: 'CEP formatado retornado pelo serviço' },
  { field: 'logradouro', type: 'string', required: 'Não', purpose: 'Nome da rua ou avenida' },
  { field: 'bairro', type: 'string', required: 'Não', purpose: 'Bairro associado ao CEP' },
  { field: 'localidade', type: 'string', required: 'Sim', purpose: 'Município do endereço' },
  { field: 'uf', type: 'string', required: 'Sim', purpose: 'Sigla da unidade federativa' },
  { field: 'ibge', type: 'string', required: 'Não', purpose: 'Código IBGE do município' },
  { field: 'ddd', type: 'string', required: 'Não', purpose: 'Código telefônico regional' },
];

const statusFilters = ['Todos', 'Aprovado', 'Planejado'] as const;

export default function ProjetoQaBuscadorCep() {
  const [statusFilter, setStatusFilter] = useState<(typeof statusFilters)[number]>('Todos');

  const visibleCases = useMemo(() => (
    statusFilter === 'Todos'
      ? apiCases
      : apiCases.filter((testCase) => testCase.status === statusFilter)
  ), [statusFilter]);

  const automatedTests = apiCases.filter((testCase) => testCase.status === 'Aprovado').length;
  const plannedTests = apiCases.filter((testCase) => testCase.status === 'Planejado').length;

  return (
    <section className="case-page qa-page qa-api-page">
      <Link to="/projetos" className="back-link">Voltar para projetos</Link>

      <div className="case-hero">
        <div>
          <span className="eyebrow">Case de QA de API</span>
          <h1>QA do Buscador de CEP</h1>
          <p>
            Validação da integração com ViaCEP e OpenStreetMap, considerando contrato de
            dados, respostas incompletas, CEP inexistente, falhas externas e comportamento
            da interface. As dependências são simuladas na automação para gerar resultados
            confiáveis sem sobrecarregar serviços públicos.
          </p>
          <div className="case-actions">
            <Link to="/projetos/buscador-de-cep">Testar aplicação</Link>
            <button
              type="button"
              onClick={() => document.getElementById('api-cenarios')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Examinar cenários
            </button>
          </div>
        </div>

        <aside className="case-summary">
          <div>
            <strong>{apiCases.length}</strong>
            <span>cenários de API</span>
          </div>
          <div>
            <strong>{automatedTests}</strong>
            <span>testes automatizados</span>
          </div>
          <div>
            <strong>2 APIs</strong>
            <span>integrações cobertas</span>
          </div>
        </aside>
      </div>

      <div className="qa-overview-grid">
        <article className="case-panel qa-scope-panel">
          <span className="qa-panel-label">Estratégia</span>
          <h2>Camadas validadas</h2>
          <ul>
            <li>Validação da entrada antes de qualquer chamada externa.</li>
            <li>Contrato e regras de negócio da resposta do ViaCEP.</li>
            <li>Resiliência diante de erro HTTP ou indisponibilidade.</li>
            <li>Integração geográfica sem impedir a exibição do endereço.</li>
          </ul>
        </article>

        <article className="case-panel qa-automation-panel">
          <span className="qa-panel-label">Automação isolada</span>
          <h2>Serviços simulados</h2>
          <div className="qa-run-status">
            <span aria-hidden="true">✓</span>
            <div>
              <strong>Respostas externas sob controle</strong>
              <small>Sucesso, erro de negócio, erro HTTP e ausência de coordenadas</small>
            </div>
          </div>
          <p>
            O mock das APIs elimina oscilações de rede e permite reproduzir cenários de
            falha com segurança, sem enviar carga de testes aos provedores públicos.
          </p>
          <div className="case-tags">
            <span>Vitest</span>
            <span>Testing Library</span>
            <span>Fetch Mock</span>
          </div>
        </article>
      </div>

      <article className="case-panel qa-api-flow-panel">
        <div className="qa-section-heading">
          <div>
            <span className="qa-panel-label">Fluxo da integração</span>
            <h2>Da entrada ao mapa</h2>
          </div>
          <p>Cada dependência possui uma responsabilidade e uma alternativa de recuperação.</p>
        </div>
        <div className="qa-api-flow" aria-label="Fluxo da consulta de CEP">
          <div><span>1</span><strong>Validar CEP</strong><small>8 dígitos</small></div>
          <b aria-hidden="true">›</b>
          <div><span>2</span><strong>Consultar ViaCEP</strong><small>endereço</small></div>
          <b aria-hidden="true">›</b>
          <div><span>3</span><strong>Validar contrato</strong><small>campos e erro</small></div>
          <b aria-hidden="true">›</b>
          <div><span>4</span><strong>Buscar coordenadas</strong><small>mapa opcional</small></div>
        </div>
      </article>

      <article className="case-panel qa-contract-panel">
        <div className="qa-section-heading">
          <div>
            <span className="qa-panel-label">Contrato de dados</span>
            <h2>Campos verificados</h2>
          </div>
          <p>Campos opcionais recebem tratamento para não quebrar a apresentação do resultado.</p>
        </div>
        <div className="qa-contract-table" role="table" aria-label="Contrato da resposta do ViaCEP">
          <div className="qa-table-head" role="row">
            <span>Campo</span><span>Tipo</span><span>Obrigatório</span><span>Finalidade</span>
          </div>
          {contractFields.map((item) => (
            <div role="row" key={item.field}>
              <code>{item.field}</code>
              <span>{item.type}</span>
              <span>{item.required}</span>
              <span>{item.purpose}</span>
            </div>
          ))}
        </div>
      </article>

      <article className="case-panel qa-api-example">
        <div>
          <span className="qa-panel-label">Evidência técnica</span>
          <h2>Exemplo de resposta validada</h2>
          <p>Recorte didático do contrato usado nos testes, sem dados pessoais ou credenciais.</p>
        </div>
        <pre>{`{
  "cep": "01001-000",
  "logradouro": "Praça da Sé",
  "bairro": "Sé",
  "localidade": "São Paulo",
  "uf": "SP",
  "ibge": "3550308",
  "ddd": "11"
}`}</pre>
      </article>

      <article className="case-panel qa-test-panel" id="api-cenarios">
        <div className="qa-section-heading">
          <div>
            <span className="qa-panel-label">Execução</span>
            <h2>Cenários de API e interface</h2>
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
                <span>{testCase.category}</span>
              </div>
              <h3>{testCase.title}</h3>
              <p className="qa-api-request"><strong>Entrada:</strong> {testCase.request}</p>
              <p><strong>Resultado esperado:</strong> {testCase.expected}</p>
              <span className={`qa-status qa-status-${testCase.status.toLowerCase()}`}>
                {testCase.status}
              </span>
            </article>
          ))}
        </div>
        <p className="qa-list-summary">
          Exibindo {visibleCases.length} de {apiCases.length} cenários. {plannedTests} testes permanecem no plano de evolução.
        </p>
      </article>

      <div className="case-grid case-wide">
        <article className="case-panel">
          <h2>Critérios de saída</h2>
          <ul>
            <li>Validações locais não enviam entradas incompletas para a API.</li>
            <li>Erros externos produzem mensagens compreensíveis e estado consistente.</li>
            <li>Campos opcionais ausentes não interrompem a interface.</li>
            <li>A falha do mapa não impede o uso do endereço retornado.</li>
          </ul>
        </article>
        <article className="case-panel">
          <h2>Próxima evolução</h2>
          <p>
            O case pode receber uma coleção Postman ou Bruno, validação formal de schema,
            métricas de tempo de resposta em ambiente controlado e execução contínua no CI.
          </p>
          <div className="case-tags">
            <span>Postman</span>
            <span>Schema</span>
            <span>Performance</span>
            <span>CI</span>
          </div>
        </article>
      </div>
    </section>
  );
}
