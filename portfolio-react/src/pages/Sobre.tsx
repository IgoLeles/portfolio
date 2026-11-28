import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import {
  credentialCategories,
  credentials,
  credentialsUpdatedAt,
  type CredentialCategory,
} from '../data/credentials';

type CategoryFilter = 'Todas as categorias' | CredentialCategory;

const skills = [
  'Salesforce Development', 'Apex', 'LWC', 'Flow', 'SOQL', 'SOSL',
  'Experience Cloud', 'Agentforce', 'Data Cloud', 'Copado', 'APIs REST',
  'Node.js', 'Angular', 'JavaScript', 'AWS', 'DevSecOps', 'QA Automation',
];

const credentialHighlights = [
  'Copado Certified Copado Data 360',
  'Copado Certified Agentia Advanced',
  'Copado Certified Copado AI',
  'Flosum Certified Professional',
  'Flosum Certified Expert',
  'OSF Academy - Salesforce Developer Core',
  'Formação Salesforce BALF360 - Operação Vértice',
  'Sottelli Training Force - Administração Salesforce',
  'Agentblazer Champion 2026',
];

const links = [
  { label: 'Portfólio Salesforce', href: 'https://github.com/IgoLeles/salesforce-dev-core-portfolio' },
  { label: 'Trailblazer', href: 'https://salesforce.com/trailblazer/igoquaresma' },
  { label: 'Credly', href: 'https://credly.com/users/ilq' },
  { label: 'IDCiber', href: 'https://idciber.org/' },
];

const professionalHistory = [
  {
    period: 'NOV 2026 — ATUAL',
    role: 'Salesforce Developer',
    company: 'Inetum · Remoto',
    summary: 'Desenvolvimento e sustentação Salesforce: Apex, Triggers, Flows e LWC, segmentação de regras por RecordType, portal do cliente (Experience Cloud) e arquitetura de Case, Omni-Channel e Entitlements.',
  },
  {
    period: 'AGO 2024 — JUN 2026',
    role: 'Analista de Desenvolvimento de Sistemas SR I',
    company: 'Solutic Group · Remoto',
    summary: 'Cliente: Petrobras (Well Management). Aplicações Angular e Node.js, autenticação JWT, integrações, AWS, testes e apoio técnico às decisões de arquitetura.',
  },
  {
    period: 'MAI 2023 — MAI 2024',
    role: 'Desenvolvedor Web / Cloud Support',
    company: 'Plushie Guardians · Web3 · Remoto',
    summary: 'Infraestrutura AWS, políticas de segurança, integrações e suporte técnico a equipes internacionais.',
  },
  {
    period: 'MAI 2021 — MAI 2023',
    role: 'Desenvolvedor Web / Analista de Integrações',
    company: 'NTL Nova Tecnologia · alocado no CBMERJ · Híbrido',
    summary: 'APIs, sistemas legados, serviços SOAP/REST, tratamento de dados e logs estruturados.',
  },
  {
    period: 'MAI 2018 — MAI 2021',
    role: 'Analista de Suporte II',
    company: 'NTL Nova Tecnologia · alocado no CBMERJ · Presencial',
    summary: 'Atendimento a usuários, monitoramento, SLAs, VMware e gerenciamento de identidades.',
  },
];

const academicEducation = [
  { title: 'Graduação em Defesa Cibernética', detail: 'Concluída em 2023' },
  { title: 'Inteligência Competitiva e Contrainteligência Corporativa', detail: 'Pós-graduação · 2024' },
  { title: 'Cybersecurity: Detecção de Ameaças e Proteção de Sistemas', detail: 'Pós-graduação · 2024' },
  { title: 'Cybercrime e Cybersecurity: Prevenção e Investigação', detail: 'Pós-graduação · 2024' },
];

function normalizeSearch(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase('pt-BR');
}

export default function Sobre() {
  const assetBase = import.meta.env.BASE_URL;
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<CategoryFilter>('Todas as categorias');

  const visibleGroups = useMemo(() => {
    const normalizedQuery = normalizeSearch(query.trim());
    const filteredCredentials = credentials.filter((credential) => {
      const matchesCategory = category === 'Todas as categorias'
        || credential.category === category;
      const matchesQuery = !normalizedQuery
        || normalizeSearch(credential.title).includes(normalizedQuery);

      return matchesCategory && matchesQuery;
    });

    return credentialCategories
      .map((credentialCategory) => ({
        category: credentialCategory,
        items: filteredCredentials.filter((credential) => (
          credential.category === credentialCategory
        )),
      }))
      .filter((group) => group.items.length > 0);
  }, [category, query]);

  const visibleCount = visibleGroups.reduce((total, group) => total + group.items.length, 0);

  return (
    <section className="about-page">
      <div className="about-view">
        <div className="about-photo-frame">
          <img
            src={`${assetBase}img/igo-profile-real.png`}
            alt="Igo Quaresma em retrato pessoal"
            className="about-photo"
          />
          <div className="about-photo-identity">
            <img
              src={`${assetBase}img/igo-brand-mark-v2.png`}
              alt=""
              aria-hidden="true"
            />
            <div>
              <strong>Igo Quaresma</strong>
              <span>Technology · Security · Human Insight</span>
            </div>
          </div>
        </div>

        <article className="about-copy">
          <span className="eyebrow">Sobre mim</span>
          <h1>Igo Quaresma</h1>
          <p className="lead">
            Salesforce Developer com quase 20 anos em TI, do suporte e infraestrutura ao
            desenvolvimento full stack, e formação em Defesa Cibernética.
          </p>
          <p>
            Comecei no suporte, perto de quem usa a tecnologia, analisando incidentes e
            acompanhando o funcionamento diário dos sistemas. Por isso, como desenvolvedor,
            parto sempre da necessidade de quem vai usar a solução.
          </p>
          <p>
            Hoje desenvolvo e sustento soluções Salesforce com Apex, Triggers, Flows,
            LWC e Experience Cloud, em processos de atendimento como Case, Omni-Channel e
            Entitlements. Antes, atuei no projeto Petrobras Well Management pela Solutic Group,
            com Angular, Node.js, JWT e AWS.
          </p>
          <p>
            A formação em Defesa Cibernética e as especializações em segurança ampliam minha
            visão sobre proteção de dados, investigação, confiabilidade e sustentação de aplicações.
          </p>
          <p>
            Integro o Comitê Público do Instituto de Defesa Cibernética{' '}(
            <a href="https://idciber.org/" target="_blank" rel="noreferrer">IDCiber</a>
            ), onde contribuo com temas de cultura de segurança digital.
          </p>

          <div className="about-section">
            <h2>Especialidades</h2>
            <div className="skill-list">
              {skills.map((skill) => <span key={skill}>{skill}</span>)}
            </div>
          </div>

          <div className="about-section">
            <h2>Credenciais em destaque</h2>
            <ul className="credential-list">
              {credentialHighlights.map((credential) => (
                <li key={credential}>{credential}</li>
              ))}
            </ul>
          </div>

          <div className="about-links">
            {links.map((link) => (
              <a href={link.href} target="_blank" rel="noreferrer" key={link.href}>
                {link.label}
              </a>
            ))}
            <a href={`${assetBase}curriculo.html`}>Currículo completo</a>
          </div>

          <p className="availability">
            Aberto a conversas sobre Salesforce, AppSec e Agentforce.
          </p>

          <img
            src={`${assetBase}img/igo-brand-banner-v2.png`}
            alt="Igo Quaresma - Technology, Security, Human Insight"
            className="brand-signature"
          />
        </article>
      </div>

      <section className="about-background" aria-labelledby="professional-history-title">
        <div className="about-background-heading">
          <span className="eyebrow">Experiência e formação</span>
          <h2 id="professional-history-title">Trajetória profissional</h2>
          <p>
            Experiência profissional separada dos projetos e programas de formação,
            conforme o currículo atualizado.
          </p>
        </div>

        <div className="professional-history">
          {professionalHistory.map((experience) => (
            <article key={`${experience.period}-${experience.company}`}>
              <span>{experience.period}</span>
              <h3>{experience.role}</h3>
              <strong>{experience.company}</strong>
              <p>{experience.summary}</p>
            </article>
          ))}
        </div>

        <div className="academic-education">
          <h2>Formação acadêmica</h2>
          <div>
            {academicEducation.map((education) => (
              <article key={education.title}>
                <h3>{education.title}</h3>
                <p>{education.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="credential-directory" aria-labelledby="credential-directory-title">
        <div className="credential-directory-heading">
          <div>
            <span className="eyebrow">Aprendizado contínuo</span>
            <h2 id="credential-directory-title">Certificações, certificados e formações</h2>
            <p>
              Certificações, programas de formação, cursos, reconhecimentos e participações
              apresentados de acordo com sua natureza. OSF Digital, BALF360 e Sottelli são
              programas de formação, não certificações oficiais Salesforce.
            </p>
          </div>
          <dl className="credential-stats">
            <div><dt>Títulos únicos</dt><dd>{credentials.length}</dd></div>
            <div><dt>Áreas</dt><dd>{credentialCategories.length}</dd></div>
            <div><dt>Atualizado</dt><dd>{credentialsUpdatedAt}</dd></div>
          </dl>
        </div>

        <div className="credential-toolbar">
          <label className="credential-search">
            <span>Buscar credencial</span>
            <div>
              <Search size={18} aria-hidden="true" />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Ex.: Salesforce, segurança, Python"
              />
            </div>
          </label>

          <label className="credential-category-filter">
            <span>Filtrar por área</span>
            <select
              value={category}
              onChange={(event) => setCategory(event.target.value as CategoryFilter)}
            >
              <option>Todas as categorias</option>
              {credentialCategories.map((credentialCategory) => (
                <option key={credentialCategory}>{credentialCategory}</option>
              ))}
            </select>
          </label>
        </div>

        <p className="credential-results" role="status" aria-live="polite">
          {visibleCount} {visibleCount === 1 ? 'resultado encontrado' : 'resultados encontrados'}
        </p>

        {visibleGroups.length > 0 ? (
          <div className="credential-groups">
            {visibleGroups.map((group) => (
              <article className="credential-group" key={group.category}>
                <div className="credential-group-title">
                  <h3>{group.category}</h3>
                  <span>{group.items.length}</span>
                </div>
                <ul>
                  {group.items.map((credential) => (
                    <li key={credential.title}>
                      <strong>{credential.title}</strong>
                      <span>
                        {[credential.kind, ...(credential.details ?? [])].join(' · ')}
                      </span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        ) : (
          <div className="credential-empty">
            <strong>Nenhuma credencial encontrada.</strong>
            <span>Tente outro termo ou selecione todas as categorias.</span>
          </div>
        )}
      </section>
    </section>
  );
}
