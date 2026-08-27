import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

type PolicyProfile = 'Uso pessoal' | 'Equipe pequena' | 'Ambiente corporativo';

const profiles: PolicyProfile[] = ['Uso pessoal', 'Equipe pequena', 'Ambiente corporativo'];

const profileDefaults: Record<PolicyProfile, {
  minLength: number;
  mfa: boolean;
  passphrase: boolean;
  manager: boolean;
  breached: boolean;
  rotation: boolean;
}> = {
  'Uso pessoal': {
    minLength: 12,
    mfa: true,
    passphrase: true,
    manager: true,
    breached: true,
    rotation: false,
  },
  'Equipe pequena': {
    minLength: 14,
    mfa: true,
    passphrase: true,
    manager: true,
    breached: true,
    rotation: false,
  },
  'Ambiente corporativo': {
    minLength: 16,
    mfa: true,
    passphrase: true,
    manager: true,
    breached: true,
    rotation: true,
  },
};

const controls = [
  {
    key: 'mfa',
    title: 'MFA obrigatório',
    description: 'Exige um segundo fator para reduzir impacto de credenciais vazadas.',
  },
  {
    key: 'passphrase',
    title: 'Frases-senha permitidas',
    description: 'Incentiva combinações longas, memoráveis e difíceis de adivinhar.',
  },
  {
    key: 'manager',
    title: 'Gerenciador recomendado',
    description: 'Evita reutilização de senhas e melhora a geração de credenciais únicas.',
  },
  {
    key: 'breached',
    title: 'Bloqueio de senhas vazadas',
    description: 'Impede uso de senhas comuns ou presentes em listas de vazamentos.',
  },
  {
    key: 'rotation',
    title: 'Troca em caso de suspeita',
    description: 'Evita rotação fixa sem motivo e prioriza troca por evento de risco.',
  },
] as const;

function getMaturity(score: number) {
  if (score >= 85) {
    return 'Robusta';
  }

  if (score >= 65) {
    return 'Intermediária';
  }

  return 'Básica';
}

function getLengthScore(length: number) {
  if (length >= 16) {
    return 30;
  }

  if (length >= 14) {
    return 24;
  }

  if (length >= 12) {
    return 18;
  }

  return 10;
}

export default function ProjetoPoliticaSenhas() {
  const [profile, setProfile] = useState<PolicyProfile>('Equipe pequena');
  const [minLength, setMinLength] = useState(profileDefaults['Equipe pequena'].minLength);
  const [mfa, setMfa] = useState(profileDefaults['Equipe pequena'].mfa);
  const [passphrase, setPassphrase] = useState(profileDefaults['Equipe pequena'].passphrase);
  const [manager, setManager] = useState(profileDefaults['Equipe pequena'].manager);
  const [breached, setBreached] = useState(profileDefaults['Equipe pequena'].breached);
  const [rotation, setRotation] = useState(profileDefaults['Equipe pequena'].rotation);

  const settings = { mfa, passphrase, manager, breached, rotation };

  const score = useMemo(() => {
    const controlsScore = [
      mfa ? 20 : 0,
      passphrase ? 15 : 0,
      manager ? 15 : 0,
      breached ? 15 : 0,
      rotation ? 5 : 0,
    ].reduce((total, item) => total + item, 0);

    return Math.min(100, getLengthScore(minLength) + controlsScore);
  }, [breached, manager, mfa, minLength, passphrase, rotation]);

  const maturity = getMaturity(score);

  const policyText = useMemo(() => {
    return [
      `Perfil: ${profile}`,
      `Tamanho mínimo recomendado: ${minLength} caracteres.`,
      passphrase
        ? 'Frases-senha são recomendadas, priorizando comprimento e facilidade de memorização.'
        : 'Senhas devem combinar letras, números e símbolos sem depender de padrões previsíveis.',
      mfa
        ? 'MFA deve ser obrigatório para contas críticas e recomendado para todos os acessos.'
        : 'MFA ainda não está obrigatório neste cenário e deve ser avaliado antes de produção.',
      manager
        ? 'Uso de gerenciador de senhas é recomendado para evitar reutilização de credenciais.'
        : 'Sem gerenciador de senhas, aumenta o risco de reutilização e armazenamento inseguro.',
      breached
        ? 'Senhas conhecidas em vazamentos ou muito comuns devem ser bloqueadas.'
        : 'O bloqueio de senhas vazadas ainda não foi definido neste cenário.',
      rotation
        ? 'Troca de senha deve ocorrer diante de suspeita, vazamento, troca de função ou incidente.'
        : 'Rotação fixa por calendário não é exigida; a troca é priorizada por evento de risco.',
    ].join('\n');
  }, [breached, manager, mfa, minLength, passphrase, profile, rotation]);

  function applyProfile(nextProfile: PolicyProfile) {
    const defaults = profileDefaults[nextProfile];
    setProfile(nextProfile);
    setMinLength(defaults.minLength);
    setMfa(defaults.mfa);
    setPassphrase(defaults.passphrase);
    setManager(defaults.manager);
    setBreached(defaults.breached);
    setRotation(defaults.rotation);
  }

  function toggleControl(key: keyof typeof settings) {
    const setters = {
      mfa: setMfa,
      passphrase: setPassphrase,
      manager: setManager,
      breached: setBreached,
      rotation: setRotation,
    };

    setters[key]((currentValue) => !currentValue);
  }

  return (
    <section className="case-page password-policy-page">
      <Link to="/projetos" className="back-link">Voltar para projetos</Link>

      <div className="case-hero">
        <div>
          <span className="eyebrow">Projeto de cibersegurança defensiva</span>
          <h1>Gerador de Política de Senhas</h1>
          <p>
            Uma ferramenta educativa para montar diretrizes de senha e acesso sem
            solicitar senhas reais. O foco é orientar boas práticas, MFA, frases-senha,
            gerenciadores e resposta a credenciais vazadas.
          </p>
          <div className="case-tags">
            <span>Cibersegurança</span>
            <span>Política de acesso</span>
            <span>MFA</span>
            <span>Frases-senha</span>
            <span>UX segura</span>
          </div>
        </div>

        <aside className="case-summary">
          <div>
            <strong>{score}%</strong>
            <span>maturidade {maturity.toLowerCase()}</span>
          </div>
          <div>
            <strong>{minLength}</strong>
            <span>caracteres mínimos</span>
          </div>
          <div>
            <strong>{Object.values(settings).filter(Boolean).length}/5</strong>
            <span>controles ativos</span>
          </div>
        </aside>
      </div>

      <div className="password-policy-shell">
        <article className="policy-builder">
          <div className="policy-profiles" aria-label="Perfis de política">
            {profiles.map((item) => (
              <button
                type="button"
                key={item}
                className={profile === item ? 'active' : ''}
                onClick={() => applyProfile(item)}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="length-control">
            <div>
              <label htmlFor="password-length">Tamanho mínimo</label>
              <strong>{minLength} caracteres</strong>
            </div>
            <input
              id="password-length"
              type="range"
              min="10"
              max="24"
              value={minLength}
              onChange={(event) => setMinLength(Number(event.target.value))}
            />
          </div>

          <div className="policy-controls">
            {controls.map((control) => (
              <button
                type="button"
                key={control.key}
                className={settings[control.key] ? 'active' : ''}
                onClick={() => toggleControl(control.key)}
              >
                <strong>{control.title}</strong>
                <span>{control.description}</span>
              </button>
            ))}
          </div>
        </article>

        <aside className="policy-result">
          <div>
            <span>Resultado</span>
            <strong>Política {maturity}</strong>
          </div>
          <div className="policy-score-track" aria-label={`Maturidade em ${score}%`}>
            <span style={{ width: `${score}%` }} />
          </div>
          <pre>{policyText}</pre>
        </aside>
      </div>

      <div className="case-grid case-wide">
        <article className="case-panel">
          <h2>O que o projeto demonstra</h2>
          <ul>
            <li>Criação de política de segurança sem coletar credenciais reais.</li>
            <li>Escolha de controles defensivos e cálculo de maturidade.</li>
            <li>Comunicação clara para pessoas técnicas e não técnicas.</li>
            <li>Uso de estado de interface para gerar uma recomendação dinâmica.</li>
          </ul>
        </article>

        <article className="case-panel">
          <h2>Cuidados de segurança</h2>
          <p>
            O projeto não testa força de senha, não armazena entradas do visitante e
            não incentiva digitar credenciais reais. Toda a experiência é baseada em
            diretrizes e exemplos de política.
          </p>
        </article>
      </div>
    </section>
  );
}
