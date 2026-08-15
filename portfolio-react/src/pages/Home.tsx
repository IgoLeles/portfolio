export default function Home() {
  const assetBase = import.meta.env.BASE_URL;

  return (
    <section className="home-view">
      <img src={`${assetBase}img/hero-home.png`} alt="Ambiente de desenvolvimento e segurança digital" className="hero-image" />
    </section>
  );
}
