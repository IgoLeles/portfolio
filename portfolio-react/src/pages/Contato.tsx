import { ExternalLink } from 'lucide-react';

export default function Contato() {
  return (
    <section className="contact-view glass">
      <span className="kicker">Contato</span>
      <h1>Vamos conversar sobre o seu projeto?</h1>
      <div className="contact-links">
        <a
          href="https://www.linkedin.com/in/igoquaresma/"
          target="_blank"
          rel="noreferrer"
          aria-label="LinkedIn"
          className="contact-button"
        >
          <ExternalLink aria-hidden="true" />
          <span>LinkedIn</span>
        </a>
        <a
          href="https://github.com/IgoLeles"
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub"
          className="contact-button"
        >
          <ExternalLink aria-hidden="true" />
          <span>GitHub</span>
        </a>
      </div>
    </section>
  );
}
