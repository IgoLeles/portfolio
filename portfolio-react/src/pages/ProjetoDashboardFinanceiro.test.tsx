import { cleanup, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import ProjetoDashboardFinanceiro from './ProjetoDashboardFinanceiro';

function renderProject() {
  return render(
    <MemoryRouter>
      <ProjetoDashboardFinanceiro />
    </MemoryRouter>,
  );
}

function kpis() {
  return within(document.querySelector('.finance-kpis') as HTMLElement);
}

function transactionRows() {
  return document.querySelectorAll('.finance-table > div');
}

describe('Projeto Dashboard Financeiro', () => {
  afterEach(() => {
    cleanup();
  });

  it('reconcilia os indicadores consolidados', () => {
    renderProject();

    expect(kpis().getByText(/34\.700,00/)).toBeInTheDocument();
    expect(kpis().getByText(/4\.780,00/)).toBeInTheDocument();
    expect(kpis().getByText(/29\.920,00/)).toBeInTheDocument();
    expect(kpis().getByText('12')).toBeInTheDocument();
    expect(transactionRows()).toHaveLength(12);
  });

  it('filtra e reconcilia as movimentações de janeiro', async () => {
    const user = userEvent.setup();
    renderProject();

    await user.selectOptions(screen.getByLabelText('Mês'), 'Janeiro');

    expect(kpis().getByText(/10\.000,00/)).toBeInTheDocument();
    expect(kpis().getByText(/740,00/)).toBeInTheDocument();
    expect(kpis().getByText(/9\.260,00/)).toBeInTheDocument();
    expect(transactionRows()).toHaveLength(3);
  });

  it('consolida a categoria Projeto em todos os meses', async () => {
    const user = userEvent.setup();
    renderProject();

    await user.selectOptions(screen.getByLabelText('Categoria'), 'Projeto');

    expect(kpis().getAllByText(/23\.300,00/)).toHaveLength(2);
    expect(kpis().getByText('4')).toBeInTheDocument();
    expect(transactionRows()).toHaveLength(4);
  });

  it('combina filtros e apresenta saldo negativo corretamente', async () => {
    const user = userEvent.setup();
    renderProject();

    await user.selectOptions(screen.getByLabelText('Mês'), 'Março');
    await user.selectOptions(screen.getByLabelText('Categoria'), 'Infraestrutura');

    expect(kpis().getByText(/-R\$\s?860,00/)).toBeInTheDocument();
    expect(kpis().getByText('1')).toBeInTheDocument();
    expect(screen.getByText('Monitoramento e segurança')).toBeInTheDocument();
    expect(transactionRows()).toHaveLength(1);
  });

  it('sincroniza a distribuição por categoria com os filtros', async () => {
    const user = userEvent.setup();
    renderProject();

    await user.selectOptions(screen.getByLabelText('Categoria'), 'Assinaturas');

    const categoryChart = document.querySelector('.category-bars') as HTMLElement;
    expect(within(categoryChart).getByRole('img', { name: /Assinaturas:.*1\.130,00/ })).toBeInTheDocument();
    expect(categoryChart.querySelectorAll(':scope > div')).toHaveLength(1);
  });

  it('mantém os quatro meses descritos no gráfico de fluxo', async () => {
    const user = userEvent.setup();
    renderProject();

    await user.selectOptions(screen.getByLabelText('Mês'), 'Abril');
    const monthlyChart = document.querySelector('.bar-chart') as HTMLElement;

    expect(within(monthlyChart).getAllByRole('img')).toHaveLength(4);
    expect(within(monthlyChart).getByRole('img', { name: /Janeiro: entradas.*10\.000,00.*saídas.*740,00/ })).toBeInTheDocument();
  });

  it('explica quando uma combinação de filtros não possui dados', async () => {
    const user = userEvent.setup();
    renderProject();

    await user.selectOptions(screen.getByLabelText('Mês'), 'Janeiro');
    await user.selectOptions(screen.getByLabelText('Categoria'), 'Cursos');

    expect(screen.getByText('Nenhuma movimentação encontrada para os filtros selecionados.')).toBeInTheDocument();
    expect(screen.getByText('Nenhuma categoria possui movimentações para os filtros selecionados.')).toBeInTheDocument();
    expect(transactionRows()).toHaveLength(0);
  });
});
