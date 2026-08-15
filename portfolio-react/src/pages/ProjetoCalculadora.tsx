import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

const buttons = [
  'C',
  '⌫',
  '%',
  '÷',
  '7',
  '8',
  '9',
  '×',
  '4',
  '5',
  '6',
  '-',
  '1',
  '2',
  '3',
  '+',
  '0',
  '.',
  '=',
];

const stack = ['React', 'TypeScript', 'Eventos', 'Estado', 'CSS Responsivo'];

function calculate(expression: string) {
  const sanitized = expression
    .replace(/×/g, '*')
    .replace(/÷/g, '/')
    .replace(/%/g, '/100');

  if (!/^[\d+\-*/.() ]+$/.test(sanitized)) {
    return 'Erro';
  }

  try {
    const result = Function(`"use strict"; return (${sanitized})`)();
    return Number.isFinite(result) ? String(Number(result.toFixed(8))) : 'Erro';
  } catch {
    return 'Erro';
  }
}

export default function ProjetoCalculadora() {
  const [expression, setExpression] = useState('0');
  const [lastResult, setLastResult] = useState('');

  const preview = useMemo(() => {
    if (!expression || expression === '0') {
      return 'Pronta para calcular';
    }

    return expression;
  }, [expression]);

  function handleButton(value: string) {
    if (value === 'C') {
      setExpression('0');
      setLastResult('');
      return;
    }

    if (value === '⌫') {
      setExpression((current) => (current.length > 1 ? current.slice(0, -1) : '0'));
      return;
    }

    if (value === '=') {
      const result = calculate(expression);
      setLastResult(expression);
      setExpression(result);
      return;
    }

    setExpression((current) => {
      if (current === '0' || current === 'Erro') {
        return value;
      }

      return `${current}${value}`;
    });
  }

  return (
    <section className="case-page calculator-page">
      <Link to="/projetos" className="back-link">Voltar para projetos</Link>

      <div className="case-hero">
        <div>
          <span className="eyebrow">Projeto iniciante</span>
          <h1>Calculadora Básica</h1>
          <p>
            Uma interface simples para praticar eventos, estado, renderização condicional
            e organização de componentes. O objetivo é mostrar domínio dos fundamentos
            antes de avançar para projetos com integrações e regras mais complexas.
          </p>
          <div className="case-tags">
            {stack.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>

        <aside className="case-summary">
          <div>
            <strong>4</strong>
            <span>operações básicas</span>
          </div>
          <div>
            <strong>UI</strong>
            <span>responsiva</span>
          </div>
          <div>
            <strong>Estado</strong>
            <span>controlado no React</span>
          </div>
        </aside>
      </div>

      <div className="calculator-layout">
        <article className="calculator-shell" aria-label="Calculadora básica interativa">
          <div className="calculator-display">
            <span>{lastResult ? `${lastResult} =` : preview}</span>
            <strong>{expression}</strong>
          </div>

          <div className="calculator-keypad">
            {buttons.map((button) => (
              <button
                type="button"
                key={button}
                className={
                  button === '='
                    ? 'calculator-key calculator-key-equals'
                    : ['C', '⌫', '%', '÷', '×', '-', '+'].includes(button)
                      ? 'calculator-key calculator-key-action'
                      : 'calculator-key'
                }
                onClick={() => handleButton(button)}
              >
                {button}
              </button>
            ))}
          </div>
        </article>

        <article className="case-panel">
          <h2>O que o projeto demonstra</h2>
          <p>
            Mesmo sendo um projeto de entrada, a calculadora apresenta decisões importantes
            de interface: resposta imediata ao clique, visor legível, estados de erro,
            limpeza rápida e layout adaptado para telas menores.
          </p>
          <ul>
            <li>Captura de eventos de clique e atualização de estado.</li>
            <li>Separação entre visor, teclado e lógica de cálculo.</li>
            <li>Uso de feedback visual para ações, operadores e resultado.</li>
            <li>Base para evoluir depois com histórico, teclado físico e testes.</li>
          </ul>
        </article>
      </div>
    </section>
  );
}
