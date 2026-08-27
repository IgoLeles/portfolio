import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  description: string;
};

type CartItem = Product & {
  quantity: number;
};

const currency = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

const products: Product[] = [
  {
    id: 1,
    name: 'Setup Salesforce Admin',
    category: 'Serviços',
    price: 1290,
    description: 'Organização inicial de objetos, campos, perfis e páginas para uma org de estudos.',
  },
  {
    id: 2,
    name: 'Landing Page Profissional',
    category: 'Frontend',
    price: 890,
    description: 'Página responsiva para apresentação de perfil, serviço, produto ou case técnico.',
  },
  {
    id: 3,
    name: 'Integração REST API',
    category: 'Backend',
    price: 1680,
    description: 'Consumo de API externa com tratamento de erro, autenticação e resposta estruturada.',
  },
  {
    id: 4,
    name: 'Dashboard Executivo',
    category: 'Dados',
    price: 1450,
    description: 'Painel com indicadores, filtros e visualização de dados para acompanhamento gerencial.',
  },
  {
    id: 5,
    name: 'Revisão DevSecOps',
    category: 'Segurança',
    price: 980,
    description: 'Checklist de boas práticas para repositório, variáveis, dependências e publicação.',
  },
  {
    id: 6,
    name: 'Automação com Flow',
    category: 'Salesforce',
    price: 1120,
    description: 'Fluxo Salesforce para automatizar etapas operacionais e reduzir tarefas manuais.',
  },
];

const categories = ['Todas', 'Salesforce', 'Frontend', 'Backend', 'Dados', 'Segurança', 'Serviços'];

export default function ProjetoMiniEcommerce() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('Todas');
  const [cart, setCart] = useState<CartItem[]>([]);

  const filteredProducts = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return products.filter((product) => {
      const matchesCategory = category === 'Todas' || product.category === category;
      const matchesSearch = !normalizedSearch
        || product.name.toLowerCase().includes(normalizedSearch)
        || product.description.toLowerCase().includes(normalizedSearch);

      return matchesCategory && matchesSearch;
    });
  }, [category, search]);

  const cartSummary = useMemo(() => {
    const items = cart.reduce((total, item) => total + item.quantity, 0);
    const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    const discount = subtotal >= 3000 ? subtotal * 0.08 : 0;
    const total = subtotal - discount;

    return { items, subtotal, discount, total };
  }, [cart]);

  function addToCart(product: Product) {
    setCart((currentCart) => {
      const existingItem = currentCart.find((item) => item.id === product.id);

      if (existingItem) {
        return currentCart.map((item) => (
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        ));
      }

      return [...currentCart, { ...product, quantity: 1 }];
    });
  }

  function updateQuantity(productId: number, quantity: number) {
    if (quantity <= 0) {
      setCart((currentCart) => currentCart.filter((item) => item.id !== productId));
      return;
    }

    setCart((currentCart) => (
      currentCart.map((item) => (
        item.id === productId ? { ...item, quantity } : item
      ))
    ));
  }

  return (
    <section className="case-page ecommerce-page">
      <Link to="/projetos" className="back-link">Voltar para projetos</Link>

      <div className="case-hero">
        <div>
          <span className="eyebrow">Projeto avançado</span>
          <h1>Mini E-commerce</h1>
          <p>
            Um fluxo de compra completo em pequena escala, com catálogo, busca,
            categorias, carrinho, quantidades e resumo financeiro. A ideia é demonstrar
            estado global de interface sem depender de checkout real.
          </p>
          <div className="case-tags">
            <span>React</span>
            <span>TypeScript</span>
            <span>Estado global</span>
            <span>Catálogo</span>
            <span>Carrinho</span>
            <span>UX</span>
          </div>
        </div>

        <aside className="case-summary">
          <div>
            <strong>{products.length}</strong>
            <span>produtos</span>
          </div>
          <div>
            <strong>{cartSummary.items}</strong>
            <span>itens no carrinho</span>
          </div>
          <div>
            <strong>{currency.format(cartSummary.total)}</strong>
            <span>total simulado</span>
          </div>
        </aside>
      </div>

      <div className="shop-layout">
        <section className="shop-catalog">
          <div className="shop-toolbar">
            <label htmlFor="product-search">Buscar produto</label>
            <input
              id="product-search"
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Buscar por nome ou descrição"
            />

            <div className="shop-categories" aria-label="Categorias do catálogo">
              {categories.map((item) => (
                <button
                  type="button"
                  key={item}
                  className={category === item ? 'active' : ''}
                  onClick={() => setCategory(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="product-grid">
            {filteredProducts.map((product) => (
              <article className="product-card" key={product.id}>
                <span>{product.category}</span>
                <h2>{product.name}</h2>
                <p>{product.description}</p>
                <strong>{currency.format(product.price)}</strong>
                <button type="button" onClick={() => addToCart(product)}>
                  Adicionar
                </button>
              </article>
            ))}
          </div>
        </section>

        <aside className="cart-panel">
          <div>
            <h2>Carrinho</h2>
            <span>{cartSummary.items} itens selecionados</span>
          </div>

          <div className="cart-items">
            {cart.length === 0 ? (
              <p>Escolha um produto para montar o resumo da compra.</p>
            ) : (
              cart.map((item) => (
                <div className="cart-item" key={item.id}>
                  <strong>{item.name}</strong>
                  <span>{currency.format(item.price)}</span>
                  <div>
                    <button type="button" onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                    <small>{item.quantity}</small>
                    <button type="button" onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="cart-summary">
            <div>
              <span>Subtotal</span>
              <strong>{currency.format(cartSummary.subtotal)}</strong>
            </div>
            <div>
              <span>Desconto</span>
              <strong>{currency.format(cartSummary.discount)}</strong>
            </div>
            <div>
              <span>Total</span>
              <strong>{currency.format(cartSummary.total)}</strong>
            </div>
          </div>

          <button type="button" className="checkout-button" disabled={cart.length === 0}>
            Finalizar simulação
          </button>
        </aside>
      </div>

      <div className="case-grid case-wide">
        <article className="case-panel">
          <h2>O que o projeto demonstra</h2>
          <ul>
            <li>Catálogo com busca textual e filtros por categoria.</li>
            <li>Carrinho com adição, remoção indireta e alteração de quantidade.</li>
            <li>Cálculo derivado de subtotal, desconto e total.</li>
            <li>Organização de estado compartilhado entre catálogo, resumo e cards.</li>
          </ul>
        </article>

        <article className="case-panel">
          <h2>Próximos passos</h2>
          <p>
            O fluxo pode evoluir para autenticação, favoritos, checkout integrado,
            histórico de pedidos, painel administrativo, persistência local e testes
            automatizados para regras de carrinho.
          </p>
        </article>
      </div>
    </section>
  );
}
