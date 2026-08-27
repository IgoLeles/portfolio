import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

type HeaderKey = 'csp' | 'hsts' | 'frameOptions' | 'contentType' | 'referrer' | 'permissions';
type ScenarioKey = 'portfolio' | 'saas' | 'ecommerce';
type HeaderState = Record<HeaderKey, boolean>;

type SecurityHeader = {
  key: HeaderKey;
  name: string;
  shortName: string;
  weight: number;
  purpose: string;
  recommendation: string;
  example: string;
};

const headers: SecurityHeader[] = [
  {
    key: 'csp',
    name: 'Content-Security-Policy',
    shortName: 'CSP',
    weight: 28,
    purpose: 'Ajuda a reduzir riscos de scripts, estilos e fontes carregados de origens inesperadas.',
    recommendation: "Começar restritivo, liberar apenas origens necessárias e evitar 'unsafe-inline' sempre que possível.",
    example: "Content-Security-Policy: default-src 'self'; img-src 'self' https:; script-src 'self'; style-src 'self' 'unsafe-inline'",
  },
  {
    key: 'hsts',
    name: 'Strict-Transport-Security',
    shortName: 'HSTS',
    weight: 18,
    purpose: 'Instrui o navegador a usar HTTPS nas próximas visitas.',
    recommendation: 'Aplicar somente quando todo o domínio e subdomínios estiverem prontos para HTTPS.',
    example: 'Strict-Transport-Security: max-age=31536000; includeSubDomains',
  },
  {
    key: 'frameOptions',
    name: 'X-Frame-Options',
    shortName: 'Frame',
    weight: 14,
    purpose: 'Reduz risco de a página ser incorporada em outro site sem intenção.',
    recommendation: "Usar DENY ou SAMEORIGIN conforme a necessidade de incorporação legítima.",
    example: 'X-Frame-Options: SAMEORIGIN',
  },
  {
    key: 'contentType',
    name: 'X-Content-Type-Options',
    shortName: 'MIME',
    weight: 12,
    purpose: 'Evita que o navegador tente interpretar arquivos como outro tipo de conteúdo.',
    recommendation: 'Manter nosniff em aplicações web, APIs e arquivos estáticos.',
    example: 'X-Content-Type-Options: nosniff',
  },
  {
    key: 'referrer',
    name: 'Referrer-Policy',
    shortName: 'Referrer',
    weight: 14,
    purpose: 'Controla quanta informação da URL anterior é enviada em navegações externas.',
    recommendation: 'Usar uma política equilibrada para reduzir vazamento de caminhos internos.',
    example: 'Referrer-Policy: strict-origin-when-cross-origin',
  },
  {
    key: 'permissions',
    name: 'Permissions-Policy',
    shortName: 'Permissões',
    weight: 14,
    purpose: 'Limita recursos do navegador, como câmera, microfone e geolocalização.',
    recommendation: 'Bloquear recursos não usados pela aplicação e liberar apenas quando houver necessidade real.',
    example: 'Permissions-Policy: camera=(), microphone=(), geolocation=()',
  },
];

const scenarios: Record<ScenarioKey, {
  title: string;
  description: string;
  defaults: HeaderState;
}> = {
  portfolio: {
    title: 'Portfólio público',
    description: 'Site estático fictício com páginas públicas, imagens e links externos.',
    defaults: {
      csp: false,
      hsts: true,
      frameOptions: true,
      contentType: true,
      referrer: false,
      permissions: true,
    },
  },
  saas: {
    title: 'SaaS com login',
    description: 'Aplicação fictícia com autenticação, painel administrativo e integrações.',
    defaults: {
      csp: false,
      hsts: true,
      frameOptions: true,
      contentType: true,
      referrer: true,
      permissions: false,
    },
  },
  ecommerce: {
    title: 'Mini e-commerce',
    description: 'Loja fictícia com catálogo, checkout simulado e scripts de terceiros controlados.',
    defaults: {
      csp: false,
      hsts: true,
      frameOptions: false,
      contentType: true,
      referrer: true,
      permissions: false,
    },
  },
};

const scenarioKeys = Object.keys(scenarios) as ScenarioKey[];

function getGrade(score: number) {
  if (score >= 86) {
    return {
      label: 'Forte',
      className: 'headers-strong',
      message: 'Boa cobertura para um cenário demonstrativo, mantendo revisão antes de produção.',
    };
  }

  if (score >= 64) {
    return {
      label: 'Em evolução',
      className: 'headers-evolving',
      message: 'A base está encaminhada, mas ainda existem lacunas importantes para fechar.',
    };
  }

  if (score >= 40) {
    return {
      label: 'Atenção',
      className: 'headers-warning',
      message: 'Há proteções úteis, mas faltam controles que reduzem riscos comuns em navegadores.',
    };
  }

  return {
    label: 'Frágil',
    className: 'headers-fragile',
    message: 'O cenário precisa de revisão antes de ser tratado como pronto para publicação.',
  };
}

export default function ProjetoSecurityHeaders() {
  const [scenarioKey, setScenarioKey] = useState<ScenarioKey>('portfolio');
  const [enabledHeaders, setEnabledHeaders] = useState<HeaderState>(scenarios.portfolio.defaults);

  const scenario = scenarios[scenarioKey];

  const score = useMemo(() => {
    return headers.reduce((total, header) => (
      enabledHeaders[header.key] ? total + header.weight : total
    ), 0);
  }, [enabledHeaders]);

  const grade = getGrade(score);
  const missingHeaders = headers.filter((header) => !enabledHeaders[header.key]);
  const activeHeaders = headers.filter((header) => enabledHeaders[header.key]);

  const configExample = useMemo(() => {
    return activeHeaders.map((header) => header.example).join('\n');
  }, [activeHeaders]);

  function applyScenario(nextScenarioKey: ScenarioKey) {
    setScenarioKey(nextScenarioKey);
    setEnabledHeaders(scenarios[nextScenarioKey].defaults);
  }

  function toggleHeader(headerKey: HeaderKey) {
    setEnabledHeaders((currentHeaders) => ({
      ...currentHeaders,
      [headerKey]: !currentHeaders[headerKey],
    }));
  }

  function enableRecommended() {
    setEnabledHeaders(headers.reduce<HeaderState>((headerMap, header) => {
      headerMap[header.key] = true;
      return headerMap;
    }, { ...enabledHeaders }));
  }

  return (
    <section className="case-page security-headers-page">
      <Link to="/projetos" className="back-link">Voltar para projetos</Link>

      <div className="case-hero">
        <div>
          <span className="eyebrow">Projeto de cibersegurança defensiva</span>
          <h1>Security Headers Analyzer Guiado</h1>
          <p>
            Um simulador visual para entender cabeçalhos HTTP de segurança sem consultar
            sites reais. A pessoa escolhe um cenário fictício, marca os cabeçalhos presentes
            e recebe uma leitura objetiva de cobertura, lacunas e recomendações.
          </p>
          <div className="case-tags">
            <span>AppSec</span>
            <span>HTTP Headers</span>
            <span>CSP</span>
            <span>Hardening</span>
            <span>Simulação segura</span>
          </div>
        </div>

        <aside className="case-summary">
          <div>
            <strong>{score}%</strong>
            <span>cobertura simulada</span>
          </div>
          <div>
            <strong>{grade.label}</strong>
            <span>postura do cenário</span>
          </div>
          <div>
            <strong>{missingHeaders.length}</strong>
            <span>lacunas encontradas</span>
          </div>
        </aside>
      </div>

      <div className="headers-shell">
        <article className="headers-builder">
          <div className="headers-scenarios" aria-label="Cenários de análise">
            {scenarioKeys.map((key) => (
              <button
                type="button"
                key={key}
                className={scenarioKey === key ? 'active' : ''}
                onClick={() => applyScenario(key)}
              >
                {scenarios[key].title}
              </button>
            ))}
          </div>

          <div className="headers-scenario-card">
            <span>Cenário guiado</span>
            <strong>{scenario.title}</strong>
            <p>{scenario.description}</p>
          </div>

          <div className="headers-list">
            {headers.map((header) => (
              <button
                type="button"
                key={header.key}
                className={enabledHeaders[header.key] ? 'active' : ''}
                onClick={() => toggleHeader(header.key)}
              >
                <span>{header.shortName}</span>
                <strong>{header.name}</strong>
                <small>{header.purpose}</small>
              </button>
            ))}
          </div>
        </article>

        <aside className="headers-report">
          <div className={`headers-grade ${grade.className}`}>
            <span>Resultado</span>
            <strong>{grade.label}</strong>
            <p>{grade.message}</p>
          </div>

          <div className="headers-score-track" aria-label={`Cobertura em ${score}%`}>
            <span style={{ width: `${score}%` }} />
          </div>

          <div className="headers-actions">
            <button type="button" onClick={enableRecommended}>Aplicar recomendados</button>
          </div>

          <div className="headers-gaps">
            <h2>Lacunas priorizadas</h2>
            {missingHeaders.length === 0 ? (
              <p>Nenhuma lacuna aberta neste cenário simulado.</p>
            ) : (
              <ul>
                {missingHeaders.map((header) => (
                  <li key={header.key}>
                    <strong>{header.name}</strong>
                    <span>{header.recommendation}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </aside>
      </div>

      <article className="headers-config-panel">
        <div>
          <span>Exemplo didático</span>
          <strong>Cabeçalhos selecionados</strong>
        </div>
        <pre>
          {configExample || 'Nenhum cabeçalho selecionado neste cenário.'}
        </pre>
      </article>

      <div className="case-grid case-wide">
        <article className="case-panel">
          <h2>O que o projeto demonstra</h2>
          <ul>
            <li>Conhecimento de hardening web e proteção no navegador.</li>
            <li>Priorização de lacunas sem depender de chamadas externas.</li>
            <li>Tradução de termos técnicos em recomendações compreensíveis.</li>
            <li>Construção de uma experiência segura para GitHub Pages.</li>
          </ul>
        </article>

        <article className="case-panel">
          <h2>Cuidados de segurança</h2>
          <p>
            O analisador é guiado e educativo: não consulta sites reais, não contorna CORS,
            não faz varredura, não coleta URLs e não valida infraestrutura de terceiros. O foco
            é explicar boas práticas sem expor ambientes.
          </p>
        </article>
      </div>
    </section>
  );
}
