import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import ProjetoBuscadorCep from './ProjetoBuscadorCep';

const validAddress = {
  cep: '01001-000',
  logradouro: 'Praça da Sé',
  complemento: 'lado ímpar',
  bairro: 'Sé',
  localidade: 'São Paulo',
  uf: 'SP',
  estado: 'São Paulo',
  regiao: 'Sudeste',
  ibge: '3550308',
  ddd: '11',
};

function response(body: unknown, ok = true) {
  return {
    ok,
    json: vi.fn().mockResolvedValue(body),
  } as unknown as Response;
}

function renderProject() {
  return render(
    <MemoryRouter>
      <ProjetoBuscadorCep />
    </MemoryRouter>,
  );
}

async function searchFor(user: ReturnType<typeof userEvent.setup>, cep: string) {
  await user.type(screen.getByLabelText('Digite o CEP'), cep);
  await user.click(screen.getByRole('button', { name: 'Buscar CEP' }));
}

describe('Projeto Buscador de CEP', () => {
  const fetchMock = vi.fn();

  beforeEach(() => {
    fetchMock.mockReset();
    vi.stubGlobal('fetch', fetchMock);
  });

  afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
  });

  it('bloqueia CEP incompleto antes de chamar a API', async () => {
    const user = userEvent.setup();
    renderProject();

    await searchFor(user, '01001');

    expect(screen.getByText('Informe um CEP com 8 dígitos.')).toBeInTheDocument();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('exibe endereço e mapa para uma consulta válida', async () => {
    const user = userEvent.setup();
    fetchMock
      .mockResolvedValueOnce(response(validAddress))
      .mockResolvedValueOnce(response([{ lat: '-23.5505', lon: '-46.6333' }]));
    renderProject();

    await searchFor(user, '01001000');

    expect(await screen.findByText('Praça da Sé')).toBeInTheDocument();
    expect(screen.getByText('São Paulo / SP')).toBeInTheDocument();
    expect(await screen.findByText('Endereço encontrado com visualização aproximada no mapa.')).toBeInTheDocument();
    expect(screen.getByTitle('Mapa aproximado do endereço')).toBeInTheDocument();
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it('trata CEP inexistente sem consultar o mapa', async () => {
    const user = userEvent.setup();
    fetchMock.mockResolvedValueOnce(response({ erro: true }));
    renderProject();

    await searchFor(user, '99999999');

    expect(await screen.findByText('CEP não encontrado na base do ViaCEP.')).toBeInTheDocument();
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(screen.queryByTitle('Mapa aproximado do endereço')).not.toBeInTheDocument();
  });

  it('apresenta erro amigável quando o ViaCEP falha', async () => {
    const user = userEvent.setup();
    fetchMock.mockResolvedValueOnce(response({}, false));
    renderProject();

    await searchFor(user, '01001000');

    expect(await screen.findByText('Não foi possível consultar esse CEP agora.')).toBeInTheDocument();
    expect(screen.queryByText('Praça da Sé')).not.toBeInTheDocument();
  });

  it('mantém o endereço quando não encontra coordenadas', async () => {
    const user = userEvent.setup();
    fetchMock
      .mockResolvedValueOnce(response(validAddress))
      .mockResolvedValueOnce(response([]));
    renderProject();

    await searchFor(user, '01001000');

    expect(await screen.findByText('Praça da Sé')).toBeInTheDocument();
    expect(await screen.findByText('Endereço encontrado. Mapa disponível por busca textual.')).toBeInTheDocument();
    expect(screen.queryByTitle('Mapa aproximado do endereço')).not.toBeInTheDocument();
  });

  it('normaliza a entrada para o formato de CEP', async () => {
    const user = userEvent.setup();
    renderProject();

    const input = screen.getByLabelText('Digite o CEP');
    await user.type(input, '01a0010009');

    expect(input).toHaveValue('01001-000');
  });
});
