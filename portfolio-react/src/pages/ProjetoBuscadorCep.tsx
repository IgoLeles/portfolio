import { FormEvent, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

type Address = {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  estado?: string;
  regiao?: string;
  ibge: string;
  ddd: string;
  erro?: boolean;
};

type Coordinates = {
  lat: number;
  lon: number;
};

type Status = 'idle' | 'loading' | 'success' | 'error';

const examples = ['01001-000', '30140-071', '20040-020'];

function onlyDigits(value: string) {
  return value.replace(/\D/g, '');
}

function formatCep(value: string) {
  const digits = onlyDigits(value).slice(0, 8);

  if (digits.length <= 5) {
    return digits;
  }

  return `${digits.slice(0, 5)}-${digits.slice(5)}`;
}

function buildAddressQuery(address: Address) {
  return [
    address.logradouro,
    address.bairro,
    address.localidade,
    address.uf,
    'Brasil',
  ].filter(Boolean).join(', ');
}

async function findCoordinates(address: Address): Promise<Coordinates | null> {
  const query = encodeURIComponent(buildAddressQuery(address));
  const response = await fetch(
    `https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&q=${query}`,
  );

  if (!response.ok) {
    return null;
  }

  const data = await response.json() as Array<{ lat: string; lon: string }>;
  const firstResult = data[0];

  if (!firstResult) {
    return null;
  }

  return {
    lat: Number(firstResult.lat),
    lon: Number(firstResult.lon),
  };
}

export default function ProjetoBuscadorCep() {
  const [cep, setCep] = useState('');
  const [address, setAddress] = useState<Address | null>(null);
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState('Digite um CEP para consultar.');

  const cleanCep = onlyDigits(cep);
  const mapQuery = address ? buildAddressQuery(address) : '';
  const mapSearchUrl = `https://www.openstreetmap.org/search?query=${encodeURIComponent(mapQuery)}`;
  const mapEmbedUrl = useMemo(() => {
    if (!coordinates) {
      return '';
    }

    const padding = 0.008;
    const left = coordinates.lon - padding;
    const right = coordinates.lon + padding;
    const bottom = coordinates.lat - padding;
    const top = coordinates.lat + padding;

    return `https://www.openstreetmap.org/export/embed.html?bbox=${left}%2C${bottom}%2C${right}%2C${top}&layer=mapnik&marker=${coordinates.lat}%2C${coordinates.lon}`;
  }, [coordinates]);
  const mapZoomUrl = coordinates
    ? `https://www.openstreetmap.org/?mlat=${coordinates.lat}&mlon=${coordinates.lon}#map=17/${coordinates.lat}/${coordinates.lon}`
    : mapSearchUrl;

  async function searchCep(event?: FormEvent<HTMLFormElement>) {
    event?.preventDefault();

    if (cleanCep.length !== 8) {
      setStatus('error');
      setAddress(null);
      setCoordinates(null);
      setMessage('Informe um CEP com 8 dígitos.');
      return;
    }

    setStatus('loading');
    setAddress(null);
    setCoordinates(null);
    setMessage('Consultando endereço...');

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);

      if (!response.ok) {
        throw new Error('Formato inválido.');
      }

      const data = await response.json() as Address;

      if (data.erro) {
        setStatus('error');
        setMessage('CEP não encontrado na base do ViaCEP.');
        return;
      }

      setAddress(data);
      setStatus('success');
      setMessage('Endereço encontrado. Tentando localizar no mapa...');

      const location = await findCoordinates(data);
      setCoordinates(location);
      setMessage(
        location
          ? 'Endereço encontrado com visualização aproximada no mapa.'
          : 'Endereço encontrado. Mapa disponível por busca textual.',
      );
    } catch {
      setStatus('error');
      setAddress(null);
      setCoordinates(null);
      setMessage('Não foi possível consultar esse CEP agora.');
    }
  }

  function useExample(example: string) {
    setCep(example);
  }

  return (
    <section className="case-page cep-page">
      <Link to="/projetos" className="back-link">Voltar para projetos</Link>

      <div className="case-hero">
        <div>
          <span className="eyebrow">Projeto intermediário</span>
          <h1>Buscador de CEP</h1>
          <p>
            Consulta de endereço por CEP usando API pública, com validação de entrada,
            estados de carregamento, tratamento de erro, resultado estruturado e conexão
            com mapa para visualização aproximada.
          </p>
          <div className="case-tags">
            <span>React</span>
            <span>TypeScript</span>
            <span>ViaCEP</span>
            <span>OpenStreetMap</span>
            <span>Estados de UI</span>
          </div>
        </div>

        <aside className="case-summary">
          <div>
            <strong>API</strong>
            <span>consulta externa</span>
          </div>
          <div>
            <strong>Mapa</strong>
            <span>zoom aproximado</span>
          </div>
          <div>
            <strong>UX</strong>
            <span>loading e erro</span>
          </div>
        </aside>
      </div>

      <div className="cep-layout">
        <article className="cep-search-panel">
          <form onSubmit={searchCep} className="cep-form">
            <label htmlFor="cep-input">Digite o CEP</label>
            <div>
              <input
                id="cep-input"
                value={cep}
                onChange={(event) => setCep(formatCep(event.target.value))}
                placeholder="00000-000"
                inputMode="numeric"
                aria-describedby="cep-status"
              />
              <button type="submit" disabled={status === 'loading'}>
                {status === 'loading' ? 'Buscando...' : 'Buscar CEP'}
              </button>
            </div>
          </form>

          <div className="cep-examples" aria-label="CEPs de exemplo">
            {examples.map((example) => (
              <button type="button" key={example} onClick={() => useExample(example)}>
                {example}
              </button>
            ))}
          </div>

          <p id="cep-status" className={`cep-status cep-status-${status}`}>
            {message}
          </p>

          {address && (
            <div className="cep-result">
              <div>
                <span>Logradouro</span>
                <strong>{address.logradouro || 'Não informado'}</strong>
              </div>
              <div>
                <span>Bairro</span>
                <strong>{address.bairro || 'Não informado'}</strong>
              </div>
              <div>
                <span>Cidade / UF</span>
                <strong>{address.localidade} / {address.uf}</strong>
              </div>
              <div>
                <span>Região</span>
                <strong>{address.regiao || address.estado || 'Brasil'}</strong>
              </div>
              <div>
                <span>IBGE</span>
                <strong>{address.ibge || 'Não informado'}</strong>
              </div>
              <div>
                <span>DDD</span>
                <strong>{address.ddd || 'Não informado'}</strong>
              </div>
            </div>
          )}
        </article>

        <article className="cep-map-panel">
          <div>
            <h2>Visualização no mapa</h2>
            <p>
              O endereço do CEP é convertido em uma busca aproximada no OpenStreetMap.
              Quando há coordenadas, o mapa abre com marcador e zoom.
            </p>
          </div>

          <div className="cep-map-frame">
            {mapEmbedUrl ? (
              <iframe
                title="Mapa aproximado do endereço"
                src={mapEmbedUrl}
                loading="lazy"
              />
            ) : (
              <div className="cep-map-placeholder">
                <strong>Mapa aguardando consulta</strong>
                <span>Busque um CEP para visualizar a localização aproximada.</span>
              </div>
            )}
          </div>

          <div className="cep-map-actions">
            <a
              href={address ? mapZoomUrl : 'https://www.openstreetmap.org/'}
              target="_blank"
              rel="noreferrer"
            >
              Abrir no mapa
            </a>
          </div>
        </article>
      </div>

      <div className="case-grid case-wide">
        <article className="case-panel">
          <h2>O que foi feito</h2>
          <ul>
            <li>Validação do CEP antes da chamada externa.</li>
            <li>Consulta ao ViaCEP com tratamento de CEP inválido ou inexistente.</li>
            <li>Estados claros de carregamento, sucesso e erro.</li>
            <li>Mapa aproximado com OpenStreetMap e link para abrir com zoom.</li>
          </ul>
        </article>

        <article className="case-panel">
          <h2>Cuidados técnicos</h2>
          <p>
            O ViaCEP retorna endereço, mas não coordenadas. Por isso, o mapa usa uma
            segunda busca geográfica aproximada e informa essa limitação ao visitante.
            Em produto real, esse ponto poderia evoluir com cache, backend e provedor
            geográfico dedicado.
          </p>
        </article>
      </div>
    </section>
  );
}
