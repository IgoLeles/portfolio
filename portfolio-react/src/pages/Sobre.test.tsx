import { cleanup, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it } from 'vitest';
import Sobre from './Sobre';

afterEach(() => {
  cleanup();
});

describe('Página Sobre', () => {
  it('apresenta o inventário completo de credenciais', () => {
    render(<Sobre />);

    const directory = screen.getByRole('region', {
      name: 'Certificações, certificados e formações',
    });

    expect(within(directory).getByText('50')).toBeInTheDocument();
    expect(within(screen.getByText('Áreas').parentElement as HTMLElement).getByText('7')).toBeInTheDocument();
    expect(within(directory).getByText('50 resultados encontrados')).toBeInTheDocument();
  });

  it('filtra credenciais por área e busca sem depender de acentuação', async () => {
    const user = userEvent.setup();
    render(<Sobre />);
    const directory = screen.getByRole('region', {
      name: 'Certificações, certificados e formações',
    });

    await user.selectOptions(
      screen.getByRole('combobox', { name: 'Filtrar por área' }),
      'Dados, BI e inteligência artificial',
    );

    expect(within(directory).getByText('8 resultados encontrados')).toBeInTheDocument();
    expect(within(directory).getByText('Big Data Fundamentos 2.0 - Data Science Academy')).toBeInTheDocument();
    expect(within(directory).queryByText('Copado Certified Copado AI')).not.toBeInTheDocument();

    await user.selectOptions(
      screen.getByRole('combobox', { name: 'Filtrar por área' }),
      'Todas as categorias',
    );
    await user.type(screen.getByRole('searchbox', { name: 'Buscar credencial' }), 'tecnologo');

    expect(within(directory).getByText('1 resultado encontrado')).toBeInTheDocument();
    expect(within(directory).getByText(/Diploma de Tecnólogo em Defesa Cibernética/)).toBeInTheDocument();
  });
});
