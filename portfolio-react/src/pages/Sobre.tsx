export default function Sobre() {
  const assetBase = import.meta.env.BASE_URL;

  return (
    <section className="content-panel about-panel">
      <img src={`${assetBase}img/homem_novo.png`} alt="Foto de Igo Quaresma" className="profile-photo" />
      <div>
        <h1>Igo Quaresma</h1>
        <p>
          Desenvolvedor em formação, criando projetos web com foco em interfaces claras,
          organizadas e responsivas.
        </p>
        <p>
          Este portfólio apresenta estudos, projetos e formas de contato em uma versão
          moderna feita com React e TypeScript.
        </p>
      </div>
    </section>
  );
}
