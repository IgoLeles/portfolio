export default function Home() {
  const assetBase = import.meta.env.BASE_URL;

  return (
    <section className="home-view">
      <div className="home-banner-frame">
        <img src={`${assetBase}img/hero-home.png`} alt="Igo Quaresma - Technology, Security, Human Insight" className="hero-image" />
      </div>
    </section>
  );
}
