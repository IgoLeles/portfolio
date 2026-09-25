export const credentialCategories = [
  'Salesforce e Salesforce DevOps',
  'Cibersegurança e prevenção a fraudes',
  'Cloud, DevOps e infraestrutura',
  'Dados, BI e inteligência artificial',
  'Desenvolvimento, banco de dados e qualidade',
  'Agilidade, negócios e desenvolvimento profissional',
  'Tecnologia, mercado e participações',
] as const;

export type CredentialCategory = typeof credentialCategories[number];

export type Credential = {
  title: string;
  category: CredentialCategory;
};

export const credentialsUpdatedAt = '24 de setembro de 2026';

export const credentials: Credential[] = [
  { title: 'Copado Certified Copado AI', category: 'Salesforce e Salesforce DevOps' },
  { title: 'Flosum Certified Professional', category: 'Salesforce e Salesforce DevOps' },
  { title: 'Flosum Certified Expert', category: 'Salesforce e Salesforce DevOps' },
  { title: 'Formação de Especialistas Salesforce - Fase 1 - Sottelli', category: 'Salesforce e Salesforce DevOps' },
  { title: 'Formação de Especialistas Salesforce - Fase 2 - Sottelli', category: 'Salesforce e Salesforce DevOps' },
  { title: 'Formação de Especialistas Salesforce - Fase 3 - Sottelli', category: 'Salesforce e Salesforce DevOps' },
  { title: 'Formação Salesforce BALF 360 - Operação Vértice', category: 'Salesforce e Salesforce DevOps' },
  { title: 'Salesforce Developer Core - OSF Digital', category: 'Salesforce e Salesforce DevOps' },
  { title: 'Training Force - Agentforce - Sottelli', category: 'Salesforce e Salesforce DevOps' },
  { title: 'Bootcamp Analista de Cybersecurity - IGTI - 148h', category: 'Cibersegurança e prevenção a fraudes' },
  { title: 'Certified Online Fraud Prevention Specialist (COFPS) - Hack & Fix', category: 'Cibersegurança e prevenção a fraudes' },
  { title: 'Cybersecurity and Data - IBM', category: 'Cibersegurança e prevenção a fraudes' },
  { title: 'Cybersecurity Fundamentals - IBM', category: 'Cibersegurança e prevenção a fraudes' },
  { title: 'Diploma de Tecnólogo em Defesa Cibernética - Estácio', category: 'Cibersegurança e prevenção a fraudes' },
  { title: 'Google SecOps Foundation - Arki1', category: 'Cibersegurança e prevenção a fraudes' },
  { title: 'Novas Tecnologias e o Mercado - Segurança Cibernética - Contic-Conif', category: 'Cibersegurança e prevenção a fraudes' },
  { title: 'OSINT - Investigação em Redes Sociais - IDCIBER', category: 'Cibersegurança e prevenção a fraudes' },
  { title: 'Curso Microsoft Azure Administrator (AZ-104) - 32h', category: 'Cloud, DevOps e infraestrutura' },
  { title: 'Curso Microsoft Azure Data Fundamentals (DP-900) - Ka Solution', category: 'Cloud, DevOps e infraestrutura' },
  { title: 'Masterclass Azure DevOps', category: 'Cloud, DevOps e infraestrutura' },
  { title: 'Microsoft Certified Technology Specialist (MCTS) - Windows 7 Configuration', category: 'Cloud, DevOps e infraestrutura' },
  { title: 'Business Intelligence Foundation - CertiProf', category: 'Dados, BI e inteligência artificial' },
  { title: 'Big Data Fundamentos 2.0 - Data Science Academy', category: 'Dados, BI e inteligência artificial' },
  { title: 'Imersão Inteligência Artificial - 2ª edição - Alura', category: 'Dados, BI e inteligência artificial' },
  { title: 'Inteligência Artificial Fundamentos - Data Science Academy', category: 'Dados, BI e inteligência artificial' },
  { title: 'Introdução à Ciência de Dados 2.0 - Data Science Academy', category: 'Dados, BI e inteligência artificial' },
  { title: 'Introdução a Machine Learning', category: 'Dados, BI e inteligência artificial' },
  { title: 'Python Fundamentos para Análise de Dados - 54h - Data Science Academy', category: 'Dados, BI e inteligência artificial' },
  { title: 'Python Fundamentos para Análise de Dados 3.0 - 60h - Data Science Academy', category: 'Dados, BI e inteligência artificial' },
  { title: 'Beginners Developer - 4Linux', category: 'Desenvolvimento, banco de dados e qualidade' },
  { title: 'CRUD com PHP OO, MVC, Bootstrap 4 e jQuery - Udemy', category: 'Desenvolvimento, banco de dados e qualidade' },
  { title: 'Introdução à Qualidade de Software', category: 'Desenvolvimento, banco de dados e qualidade' },
  { title: 'Introdução ao banco de dados MySQL', category: 'Desenvolvimento, banco de dados e qualidade' },
  { title: 'Linux - A introdução ao sistema operacional', category: 'Desenvolvimento, banco de dados e qualidade' },
  { title: 'Primeiros passos com CodeIgniter - DevMedia', category: 'Desenvolvimento, banco de dados e qualidade' },
  { title: 'SAP para Iniciantes - Ka Solution', category: 'Desenvolvimento, banco de dados e qualidade' },
  { title: 'SQL Server 2019 - Do SQL à Administração - Udemy', category: 'Desenvolvimento, banco de dados e qualidade' },
  { title: 'TreinaWeb Multi-stack #4 - Semana React Python', category: 'Desenvolvimento, banco de dados e qualidade' },
  { title: 'Business Model Canvas Essentials - CertiProf', category: 'Agilidade, negócios e desenvolvimento profissional' },
  { title: 'Digital Marketing Professional Certificate (DMPC) - CertiProf', category: 'Agilidade, negócios e desenvolvimento profissional' },
  { title: 'Lean Six Sigma White Belt - CertiProf', category: 'Agilidade, negócios e desenvolvimento profissional' },
  { title: 'Scrum Foundation Professional Certificate (SFPC) - CertiProf', category: 'Agilidade, negócios e desenvolvimento profissional' },
  { title: 'Certificação em T&D - Da Gestão de Desempenho à Universidade Corporativa', category: 'Agilidade, negócios e desenvolvimento profissional' },
  { title: 'DIO Campus Expert - Turma 14', category: 'Agilidade, negócios e desenvolvimento profissional' },
  { title: 'Profissional Adaptável - Inteligência Emocional, Finanças Pessoais e Liderança - PUCRS', category: 'Agilidade, negócios e desenvolvimento profissional' },
  { title: 'Novas Tecnologias e o Mercado - 5G - Contic-Conif', category: 'Tecnologia, mercado e participações' },
  { title: 'Novas Tecnologias e o Mercado - Internet das Coisas - Contic-Conif', category: 'Tecnologia, mercado e participações' },
  { title: 'Novas Tecnologias e o Mercado - Redes de Fibra - Contic-Conif', category: 'Tecnologia, mercado e participações' },
  { title: 'Participação no LEC PLD Summit 2026', category: 'Tecnologia, mercado e participações' },
  { title: 'Participação no Painel Telebrasil 2021', category: 'Tecnologia, mercado e participações' },
];
