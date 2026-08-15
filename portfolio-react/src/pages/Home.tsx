export default function Home() {
  const assetBase = import.meta.env.BASE_URL;

  return (
    <section className="home-view">
      <img src={`${assetBase}img/slide1.jpg`} alt="Imagem principal do portfolio" className="hero-image" />
    </section>
  );
}
