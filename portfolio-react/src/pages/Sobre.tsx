export default function Sobre() {
  const assetBase = import.meta.env.BASE_URL;

  const skills = [
    'Salesforce Development',
    'Apex',
    'Flow',
    'LWC',
    'SOQL',
    'SOSL',
    'Agentforce',
    'Data Cloud',
    'APIs REST',
    'Node.js',
    'Angular',
    'JavaScript',
    'AWS',
    'DevSecOps',
  ];

  const credentials = [
    'Copado AI - Salesforce DevOps',
    'Agentblazer Champion 2026',
    'Salesforce Developer Core - OSF Digital',
    'BALF360 - Operação Vértice',
    'Formação de Especialistas Salesforce - Sottelli',
  ];

  const links = [
    {
      label: 'Portfólio Salesforce',
      href: 'https://github.com/IgoLeles/salesforce-dev-core-portfolio',
    },
    {
      label: 'Trailblazer',
      href: 'https://salesforce.com/trailblazer/igoquaresma',
    },
    {
      label: 'Credly',
      href: 'https://credly.com/users/ilq',
    },
  ];

  return (
    <section className="about-view">
      <div className="about-photo-frame">
        <img
          src={`${assetBase}img/igo-profile-office.png`}
          alt="Igo Quaresma em ambiente profissional de tecnologia"
          className="about-photo"
        />
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
          Minha trajetória combina desenvolvimento de software, cibersegurança e
          arquitetura de soluções, permitindo uma visão abrangente de qualidade,
          segurança e escalabilidade em ambientes corporativos.
        </p>

        <div className="about-section">
          <h2>Especialidades</h2>
          <div className="skill-list">
            {skills.map((skill) => (
              <span key={skill}>{skill}</span>
            ))}
          </div>
        </div>

        <div className="about-section">
          <h2>Certificações e formações</h2>
          <ul className="credential-list">
            {credentials.map((credential) => (
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
      </article>
    </section>
  );
}
