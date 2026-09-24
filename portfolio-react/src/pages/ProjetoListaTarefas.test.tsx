import { cleanup, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import ProjetoListaTarefas from './ProjetoListaTarefas';

const storageKey = 'portfolio-task-list-demo';

function renderProject() {
  return render(
    <MemoryRouter>
      <ProjetoListaTarefas />
    </MemoryRouter>,
  );
}

describe('Projeto Lista de Tarefas', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  afterEach(() => {
    cleanup();
  });

  it('cadastra uma tarefa com a prioridade selecionada', async () => {
    const user = userEvent.setup();
    renderProject();

    await user.type(screen.getByRole('textbox', { name: 'Nova tarefa' }), 'Preparar evidências de QA');
    await user.selectOptions(screen.getByRole('combobox', { name: 'Prioridade' }), 'Alta');
    await user.click(screen.getByRole('button', { name: 'Adicionar' }));

    const task = screen.getByText('Preparar evidências de QA').closest('.todo-item');
    expect(task).not.toBeNull();
    expect(within(task as HTMLElement).getByText('Alta')).toBeInTheDocument();
  });

  it('não cadastra uma tarefa com título vazio', async () => {
    const user = userEvent.setup();
    renderProject();

    const initialRemoveButtons = screen.getAllByRole('button', { name: 'Remover tarefa' });
    await user.type(screen.getByRole('textbox', { name: 'Nova tarefa' }), '   ');
    await user.click(screen.getByRole('button', { name: 'Adicionar' }));

    expect(screen.getAllByRole('button', { name: 'Remover tarefa' })).toHaveLength(initialRemoveButtons.length);
  });

  it('conclui uma tarefa e a exibe no filtro de concluídas', async () => {
    const user = userEvent.setup();
    renderProject();

    const targetTask = screen.getByText('Reunião com o cliente').closest('.todo-item');
    expect(targetTask).not.toBeNull();
    await user.click(within(targetTask as HTMLElement).getByRole('button', { name: 'Marcar como concluída' }));
    await user.click(screen.getByRole('button', { name: 'Concluídas' }));

    expect(screen.getByText('Reunião com o cliente')).toBeInTheDocument();
    expect(screen.queryByText('Finalizar proposta comercial')).not.toBeInTheDocument();
  });

  it('filtra somente as tarefas pendentes', async () => {
    const user = userEvent.setup();
    renderProject();

    await user.click(screen.getByRole('button', { name: 'Pendentes' }));

    expect(screen.getByText('Finalizar proposta comercial')).toBeInTheDocument();
    expect(screen.queryByText('Revisar telas do aplicativo')).not.toBeInTheDocument();
  });

  it('remove uma tarefa da lista', async () => {
    const user = userEvent.setup();
    renderProject();

    const targetTask = screen.getByText('Enviar relatório de desempenho').closest('.todo-item');
    expect(targetTask).not.toBeNull();
    await user.click(within(targetTask as HTMLElement).getByRole('button', { name: 'Remover tarefa' }));

    expect(screen.queryByText('Enviar relatório de desempenho')).not.toBeInTheDocument();
  });

  it('recupera tarefas persistidas no navegador', () => {
    window.localStorage.setItem(storageKey, JSON.stringify([
      { id: 99, title: 'Tarefa recuperada', priority: 'Média', due: 'Hoje', completed: false },
    ]));

    renderProject();

    expect(screen.getByText('Tarefa recuperada')).toBeInTheDocument();
    expect(screen.queryByText('Reunião com o cliente')).not.toBeInTheDocument();
  });
});
