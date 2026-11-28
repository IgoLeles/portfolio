export default function Footer() {
  const assetBase = import.meta.env.BASE_URL;

  return (
    <footer className="glass-footer">
      <img src={`${assetBase}img/logo-iq-small.png`} alt="" />
      <small>Igo Quaresma · Technology · Security · Human Insight · 2026</small>
    </footer>
  );
}
