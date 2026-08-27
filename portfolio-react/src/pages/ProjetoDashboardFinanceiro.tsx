import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

type TransactionType = 'Entrada' | 'Saída';
type Month = 'Janeiro' | 'Fevereiro' | 'Março' | 'Abril';

type Transaction = {
  id: number;
  description: string;
  category: string;
  type: TransactionType;
  month: Month;
  value: number;
};

const currency = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

const months: Array<Month | 'Todos'> = ['Todos', 'Janeiro', 'Fevereiro', 'Março', 'Abril'];
const categories = ['Todas', 'Consultoria', 'Projeto', 'Assinaturas', 'Cursos', 'Infraestrutura'];

const transactions: Transaction[] = [
  { id: 1, description: 'Consultoria Salesforce', category: 'Consultoria', type: 'Entrada', month: 'Janeiro', value: 6800 },
  { id: 2, description: 'Landing page institucional', category: 'Projeto', type: 'Entrada', month: 'Janeiro', value: 3200 },
  { id: 3, description: 'Cloud e domínio', category: 'Infraestrutura', type: 'Saída', month: 'Janeiro', value: 740 },
  { id: 4, description: 'Treinamento técnico', category: 'Cursos', type: 'Saída', month: 'Fevereiro', value: 920 },
  { id: 5, description: 'Automação de processos', category: 'Projeto', type: 'Entrada', month: 'Fevereiro', value: 5400 },
  { id: 6, description: 'Ferramentas SaaS', category: 'Assinaturas', type: 'Saída', month: 'Fevereiro', value: 520 },
  { id: 7, description: 'Integração REST API', category: 'Projeto', type: 'Entrada', month: 'Março', value: 7800 },
  { id: 8, description: 'Certificação e simulados', category: 'Cursos', type: 'Saída', month: 'Março', value: 1130 },
  { id: 9, description: 'Monitoramento e segurança', category: 'Infraestrutura', type: 'Saída', month: 'Março', value: 860 },
  { id: 10, description: 'Dashboard executivo', category: 'Consultoria', type: 'Entrada', month: 'Abril', value: 4600 },
  { id: 11, description: 'Assinaturas de produtividade', category: 'Assinaturas', type: 'Saída', month: 'Abril', value: 610 },
  { id: 12, description: 'Projeto Experience Cloud', category: 'Projeto', type: 'Entrada', month: 'Abril', value: 6900 },
];

function sumValues(items: Transaction[], type?: TransactionType) {
  return items
    .filter((item) => !type || item.type === type)
    .reduce((total, item) => total + item.value, 0);
}

export default function ProjetoDashboardFinanceiro() {
  const [selectedMonth, setSelectedMonth] = useState<Month | 'Todos'>('Todos');
  const [selectedCategory, setSelectedCategory] = useState('Todas');

  const filteredTransactions = useMemo(() => {
    return transactions.filter((transaction) => {
      const matchesMonth = selectedMonth === 'Todos' || transaction.month === selectedMonth;
      const matchesCategory = selectedCategory === 'Todas' || transaction.category === selectedCategory;

      return matchesMonth && matchesCategory;
    });
  }, [selectedCategory, selectedMonth]);

  const summary = useMemo(() => {
    const income = sumValues(filteredTransactions, 'Entrada');
    const expenses = sumValues(filteredTransactions, 'Saída');

    return {
      income,
      expenses,
      balance: income - expenses,
      transactions: filteredTransactions.length,
    };
  }, [filteredTransactions]);

  const monthlyChart = useMemo(() => {
    const data = months
      .filter((month): month is Month => month !== 'Todos')
      .map((month) => {
        const monthTransactions = transactions.filter((transaction) => transaction.month === month);
        return {
          month,
          income: sumValues(monthTransactions, 'Entrada'),
          expenses: sumValues(monthTransactions, 'Saída'),
        };
      });
    const maxValue = Math.max(...data.flatMap((item) => [item.income, item.expenses]));

    return data.map((item) => ({
      ...item,
      incomeHeight: `${Math.max(8, (item.income / maxValue) * 100)}%`,
      expensesHeight: `${Math.max(8, (item.expenses / maxValue) * 100)}%`,
    }));
  }, []);

  const categoryChart = useMemo(() => {
    const totals = categories
      .filter((category) => category !== 'Todas')
      .map((category) => ({
        category,
        total: sumValues(filteredTransactions.filter((transaction) => transaction.category === category)),
      }))
      .filter((item) => item.total > 0);
    const maxValue = Math.max(...totals.map((item) => item.total), 1);

    return totals.map((item) => ({
      ...item,
      width: `${(item.total / maxValue) * 100}%`,
    }));
  }, [filteredTransactions]);

  return (
    <section className="case-page finance-page">
      <Link to="/projetos" className="back-link">Voltar para projetos</Link>

      <div className="case-hero">
        <div>
          <span className="eyebrow">Projeto avançado</span>
          <h1>Dashboard Financeiro</h1>
          <p>
            Um painel para acompanhar entradas, saídas, saldo e categorias, com filtros
            por mês e tipo de movimentação. A proposta é demonstrar leitura de dados,
            indicadores, gráficos e tomada de decisão em uma interface objetiva.
          </p>
          <div className="case-tags">
            <span>React</span>
            <span>TypeScript</span>
            <span>Filtros</span>
            <span>Indicadores</span>
            <span>Charts em CSS</span>
          </div>
        </div>

        <aside className="case-summary">
          <div>
            <strong>{currency.format(summary.balance)}</strong>
            <span>saldo filtrado</span>
          </div>
          <div>
            <strong>{currency.format(summary.income)}</strong>
            <span>entradas</span>
          </div>
          <div>
            <strong>{summary.transactions}</strong>
            <span>movimentações</span>
          </div>
        </aside>
      </div>

      <div className="finance-dashboard">
        <article className="finance-toolbar">
          <div>
            <label htmlFor="month-filter">Mês</label>
            <select id="month-filter" value={selectedMonth} onChange={(event) => setSelectedMonth(event.target.value as Month | 'Todos')}>
              {months.map((month) => (
                <option key={month} value={month}>{month}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="category-filter">Categoria</label>
            <select id="category-filter" value={selectedCategory} onChange={(event) => setSelectedCategory(event.target.value)}>
              {categories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </article>

        <div className="finance-kpis">
          <div>
            <span>Entradas</span>
            <strong>{currency.format(summary.income)}</strong>
          </div>
          <div>
            <span>Saídas</span>
            <strong>{currency.format(summary.expenses)}</strong>
          </div>
          <div>
            <span>Saldo</span>
            <strong>{currency.format(summary.balance)}</strong>
          </div>
          <div>
            <span>Registros</span>
            <strong>{summary.transactions}</strong>
          </div>
        </div>

        <div className="finance-grid">
          <article className="finance-panel">
            <h2>Fluxo mensal</h2>
            <div className="bar-chart" aria-label="Gráfico de entradas e saídas por mês">
              {monthlyChart.map((item) => (
                <div className="bar-group" key={item.month}>
                  <div className="bars">
                    <span className="bar-income" style={{ height: item.incomeHeight }} title={`Entradas: ${currency.format(item.income)}`} />
                    <span className="bar-expense" style={{ height: item.expensesHeight }} title={`Saídas: ${currency.format(item.expenses)}`} />
                  </div>
                  <small>{item.month.slice(0, 3)}</small>
                </div>
              ))}
            </div>
            <div className="chart-legend">
              <span>Entradas</span>
              <span>Saídas</span>
            </div>
          </article>

          <article className="finance-panel">
            <h2>Distribuição por categoria</h2>
            <div className="category-bars">
              {categoryChart.map((item) => (
                <div key={item.category}>
                  <span>{item.category}</span>
                  <div>
                    <strong style={{ width: item.width }} />
                  </div>
                  <small>{currency.format(item.total)}</small>
                </div>
              ))}
            </div>
          </article>
        </div>

        <article className="finance-panel">
          <h2>Últimas movimentações</h2>
          <div className="finance-table">
            {filteredTransactions.map((transaction) => (
              <div key={transaction.id}>
                <strong>{transaction.description}</strong>
                <span>{transaction.category}</span>
                <span>{transaction.month}</span>
                <small className={transaction.type === 'Entrada' ? 'money-in' : 'money-out'}>
                  {transaction.type === 'Entrada' ? '+' : '-'} {currency.format(transaction.value)}
                </small>
              </div>
            ))}
          </div>
        </article>
      </div>

      <div className="case-grid case-wide">
        <article className="case-panel">
          <h2>O que o projeto demonstra</h2>
          <ul>
            <li>Transformação de dados financeiros em indicadores de leitura rápida.</li>
            <li>Filtros combinados para mês e categoria sem recarregar a página.</li>
            <li>Gráficos responsivos feitos com CSS e dados derivados por estado.</li>
            <li>Separação clara entre resumo executivo, análise visual e registros detalhados.</li>
          </ul>
        </article>

        <article className="case-panel">
          <h2>Próximos passos</h2>
          <p>
            Em uma versão maior, esse painel poderia receber importação de CSV,
            persistência em banco, exportação de relatórios, metas por categoria e
            autenticação para uso pessoal ou corporativo.
          </p>
        </article>
      </div>
    </section>
  );
}
