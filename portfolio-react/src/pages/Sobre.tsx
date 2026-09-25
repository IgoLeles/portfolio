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
  'Salesforce Development', 'Apex', 'Flow', 'LWC', 'SOQL', 'SOSL',
  'Agentforce', 'Data Cloud', 'APIs REST', 'Node.js', 'Angular',
  'JavaScript', 'AWS', 'DevSecOps', 'QA Automation', 'COBOL (em estudo)',
];

const credentialHighlights = [
  'Agentblazer Champion 2026',
  'Copado Certified Copado AI',
  'Flosum Certified Expert',
  'Salesforce Developer Core - OSF Digital',
  'BALF360 - Operação Vértice',
  'Certified Online Fraud Prevention Specialist (COFPS)',
];

const links = [
  { label: 'Portfólio Salesforce', href: 'https://github.com/IgoLeles/salesforce-dev-core-portfolio' },
  { label: 'Trailblazer', href: 'https://salesforce.com/trailblazer/igoquaresma' },
  { label: 'Credly', href: 'https://credly.com/users/ilq' },
  { label: 'IDCiber', href: 'https://idciber.org/' },
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
            src={`${assetBase}img/igo-profile-real.jpg`}
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
            Desenvolvedor Full Stack com experiência em desenvolvimento de aplicações
            corporativas, integrações de sistemas, APIs REST e infraestrutura em nuvem.
          </p>
          <p>
            Atualmente atuo com foco no ecossistema Salesforce, desenvolvendo competências
            em Apex, Salesforce Flow, Lightning Web Components, Agentforce, Data Cloud e
            automação de processos de negócios.
          </p>
          <p>
            Sou Agentblazer Champion 2026, certificado pelo programa Salesforce Developer
            Core da OSF Digital e formado pelo BALF360, programa intensivo de formação
            Salesforce da Reforce Academy.
          </p>
          <p>
            Minha trajetória combina desenvolvimento de software, engenharia de qualidade,
            cibersegurança e arquitetura de soluções, permitindo uma visão abrangente de
            segurança, escalabilidade e entrega de valor em ambientes corporativos.
          </p>
          <p>
            Também estou iniciando estudos em COBOL, com foco em manutenção,
            modernização e integração de sistemas legados em ambientes corporativos.
          </p>
          <p>
            Também integro o Comitê Público do Instituto de Defesa Cibernética{' '}(
            <a href="https://idciber.org/" target="_blank" rel="noreferrer">IDCiber</a>
            ), contribuindo com uma visão voltada à cultura de segurança digital,
            colaboração institucional e defesa cibernética responsável.
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
          </div>

          <p className="availability">
            Aberto a oportunidades remotas, vagas internacionais e posições focadas em Salesforce.
          </p>

          <img
            src={`${assetBase}img/igo-brand-banner-v2.png`}
            alt="Igo Quaresma - Technology, Security, Human Insight"
            className="brand-signature"
          />
        </article>
      </div>

      <section className="credential-directory" aria-labelledby="credential-directory-title">
        <div className="credential-directory-heading">
          <div>
            <span className="eyebrow">Aprendizado contínuo</span>
            <h2 id="credential-directory-title">Certificações, certificados e formações</h2>
            <p>
              Um inventário organizado da minha trajetória de estudos, atualizado conforme
              novas credenciais são conquistadas.
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
                    <li key={credential.title}>{credential.title}</li>
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
