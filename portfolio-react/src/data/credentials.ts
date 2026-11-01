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
export type CredentialKind =
  | 'Certificação'
  | 'Formação'
  | 'Curso'
  | 'Reconhecimento'
  | 'Graduação'
  | 'Participação';

export type Credential = {
  title: string;
  category: CredentialCategory;
  kind: CredentialKind;
  details?: string[];
};

export const credentialsUpdatedAt = '1º de novembro de 2026';

export const credentials: Credential[] = [
  { title: 'Copado Certified Copado Data 360', category: 'Salesforce e Salesforce DevOps', kind: 'Certificação', details: ['Emitida em 01/11/2026', 'ID 087119'] },
  { title: 'Copado Certified Agentia Advanced', category: 'Salesforce e Salesforce DevOps', kind: 'Certificação', details: ['Emitida em 28/10/2026', 'ID 086892'] },
  { title: 'Copado Certified Copado AI', category: 'Salesforce e Salesforce DevOps', kind: 'Certificação', details: ['Emitida em 18/07/2026', 'ID 074413'] },
  { title: 'Flosum Certified Professional', category: 'Salesforce e Salesforce DevOps', kind: 'Certificação', details: ['Emitida em 21/09/2026', 'Válida até 21/09/2027', 'ID 0000049184'] },
  { title: 'Flosum Certified Expert', category: 'Salesforce e Salesforce DevOps', kind: 'Certificação', details: ['Emitida em 21/09/2026', 'Válida até 21/09/2027', 'ID 0000049185'] },
  { title: 'OSF Academy - Salesforce Developer Core', category: 'Salesforce e Salesforce DevOps', kind: 'Formação', details: ['Programa OSF Digital', '6 semanas', 'Concluído em 06/04/2026', 'ID 001517'] },
  { title: 'Formação Salesforce BALF360 - Operação Vértice', category: 'Salesforce e Salesforce DevOps', kind: 'Formação', details: ['85 horas', 'Concluída em 09/07/2026'] },
  { title: 'Formação Salesforce - Sottelli', category: 'Salesforce e Salesforce DevOps', kind: 'Formação', details: ['Programa de formação', '64 horas'] },
  { title: 'Training Force - Agentforce - Sottelli', category: 'Salesforce e Salesforce DevOps', kind: 'Formação' },
  { title: 'Agentblazer Champion 2026', category: 'Salesforce e Salesforce DevOps', kind: 'Reconhecimento', details: ['Salesforce Trailhead'] },
  { title: 'Bootcamp Analista de Cybersecurity - IGTI', category: 'Cibersegurança e prevenção a fraudes', kind: 'Formação', details: ['148 horas'] },
  { title: 'Certified Online Fraud Prevention Specialist (COFPS) - Hack & Fix', category: 'Cibersegurança e prevenção a fraudes', kind: 'Certificação' },
  { title: 'Cybersecurity and Data - IBM SkillsBuild', category: 'Cibersegurança e prevenção a fraudes', kind: 'Curso', details: ['2026'] },
  { title: 'Cybersecurity Fundamentals - IBM SkillsBuild', category: 'Cibersegurança e prevenção a fraudes', kind: 'Curso', details: ['2026'] },
  { title: 'Diploma de Tecnólogo em Defesa Cibernética - Estácio', category: 'Cibersegurança e prevenção a fraudes', kind: 'Graduação', details: ['Concluída em 2023'] },
  { title: 'Google SecOps Foundation - Arki1', category: 'Cibersegurança e prevenção a fraudes', kind: 'Curso' },
  { title: 'Novas Tecnologias e o Mercado - Segurança Cibernética - Contic-Conif', category: 'Cibersegurança e prevenção a fraudes', kind: 'Curso' },
  { title: 'OSINT - Investigação em Redes Sociais - IDCIBER', category: 'Cibersegurança e prevenção a fraudes', kind: 'Curso' },
  { title: 'Compliance e proteção de dados - PUCRS', category: 'Cibersegurança e prevenção a fraudes', kind: 'Curso', details: ['Curso de extensão'] },
  { title: 'Curso Microsoft Azure Administrator (AZ-104)', category: 'Cloud, DevOps e infraestrutura', kind: 'Curso', details: ['32 horas'] },
  { title: 'Curso Microsoft Azure Data Fundamentals (DP-900) - Ka Solution', category: 'Cloud, DevOps e infraestrutura', kind: 'Curso' },
  { title: 'Masterclass Azure DevOps', category: 'Cloud, DevOps e infraestrutura', kind: 'Curso' },
  { title: 'Microsoft Certified Technology Specialist (MCTS) - Windows 7 Configuration', category: 'Cloud, DevOps e infraestrutura', kind: 'Certificação' },
  { title: 'Business Intelligence Foundation - CertiProf', category: 'Dados, BI e inteligência artificial', kind: 'Certificação' },
  { title: 'Big Data Fundamentos 2.0 - Data Science Academy', category: 'Dados, BI e inteligência artificial', kind: 'Curso' },
  { title: 'Imersão Inteligência Artificial - 2ª edição - Alura', category: 'Dados, BI e inteligência artificial', kind: 'Formação' },
  { title: 'Inteligência Artificial Fundamentos - Data Science Academy', category: 'Dados, BI e inteligência artificial', kind: 'Curso' },
  { title: 'Introdução à Ciência de Dados 2.0 - Data Science Academy', category: 'Dados, BI e inteligência artificial', kind: 'Curso' },
  { title: 'Introdução a Machine Learning', category: 'Dados, BI e inteligência artificial', kind: 'Curso' },
  { title: 'Python Fundamentos para Análise de Dados - Data Science Academy', category: 'Dados, BI e inteligência artificial', kind: 'Curso', details: ['54 horas'] },
  { title: 'Python Fundamentos para Análise de Dados 3.0 - Data Science Academy', category: 'Dados, BI e inteligência artificial', kind: 'Curso', details: ['60 horas'] },
  { title: '1 Million Prompters - Dubai Future Foundation', category: 'Dados, BI e inteligência artificial', kind: 'Formação', details: ['Engenharia de prompts', 'Certificado de conclusão'] },
  { title: 'Beginners Developer - 4Linux', category: 'Desenvolvimento, banco de dados e qualidade', kind: 'Curso' },
  { title: 'CRUD com PHP OO, MVC, Bootstrap 4 e jQuery - Udemy', category: 'Desenvolvimento, banco de dados e qualidade', kind: 'Curso' },
  { title: 'Introdução à Qualidade de Software', category: 'Desenvolvimento, banco de dados e qualidade', kind: 'Curso' },
  { title: 'Introdução ao banco de dados MySQL', category: 'Desenvolvimento, banco de dados e qualidade', kind: 'Curso' },
  { title: 'Linux - A introdução ao sistema operacional', category: 'Desenvolvimento, banco de dados e qualidade', kind: 'Curso' },
  { title: 'Primeiros passos com CodeIgniter - DevMedia', category: 'Desenvolvimento, banco de dados e qualidade', kind: 'Curso' },
  { title: 'SAP para Iniciantes - Ka Solution', category: 'Desenvolvimento, banco de dados e qualidade', kind: 'Curso' },
  { title: 'SQL Server 2019 - Do SQL à Administração - Udemy', category: 'Desenvolvimento, banco de dados e qualidade', kind: 'Curso' },
  { title: 'TreinaWeb Multi-stack #4 - Semana React Python', category: 'Desenvolvimento, banco de dados e qualidade', kind: 'Formação' },
  { title: 'Business Model Canvas Essentials - CertiProf', category: 'Agilidade, negócios e desenvolvimento profissional', kind: 'Certificação' },
  { title: 'Digital Marketing Professional Certificate (DMPC) - CertiProf', category: 'Agilidade, negócios e desenvolvimento profissional', kind: 'Certificação' },
  { title: 'Lean Six Sigma White Belt - CertiProf', category: 'Agilidade, negócios e desenvolvimento profissional', kind: 'Certificação' },
  { title: 'Scrum Foundation Professional Certificate (SFPC) - CertiProf', category: 'Agilidade, negócios e desenvolvimento profissional', kind: 'Certificação' },
  { title: 'Certificação em T&D - Da Gestão de Desempenho à Universidade Corporativa', category: 'Agilidade, negócios e desenvolvimento profissional', kind: 'Certificação' },
  { title: 'DIO Campus Expert - Turma 14', category: 'Agilidade, negócios e desenvolvimento profissional', kind: 'Formação' },
  { title: 'Profissional Adaptável - Inteligência Emocional, Finanças Pessoais e Liderança - PUCRS', category: 'Agilidade, negócios e desenvolvimento profissional', kind: 'Curso', details: ['Curso de extensão', '3 horas', '2022'] },
  { title: 'Neurociência do desenvolvimento - PUCRS', category: 'Agilidade, negócios e desenvolvimento profissional', kind: 'Curso', details: ['Curso de extensão'] },
  { title: 'Marketing e promoção pessoal - PUCRS', category: 'Agilidade, negócios e desenvolvimento profissional', kind: 'Curso', details: ['Curso de extensão'] },
  { title: 'Novas Tecnologias e o Mercado - 5G - Contic-Conif', category: 'Tecnologia, mercado e participações', kind: 'Curso' },
  { title: 'Novas Tecnologias e o Mercado - Internet das Coisas - Contic-Conif', category: 'Tecnologia, mercado e participações', kind: 'Curso' },
  { title: 'Novas Tecnologias e o Mercado - Redes de Fibra - Contic-Conif', category: 'Tecnologia, mercado e participações', kind: 'Curso' },
  { title: 'Participação no LEC PLD Summit 2026', category: 'Tecnologia, mercado e participações', kind: 'Participação' },
  { title: 'Participação no Painel Telebrasil 2021', category: 'Tecnologia, mercado e participações', kind: 'Participação' },
];
