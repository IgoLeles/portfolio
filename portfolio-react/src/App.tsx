import { HashRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Sobre from './pages/Sobre';
import Projetos from './pages/Projetos';
import ProjetoOsfAcademy from './pages/ProjetoOsfAcademy';
import ProjetoBalf360 from './pages/ProjetoBalf360';
import ProjetoCalculadora from './pages/ProjetoCalculadora';
import ProjetoListaTarefas from './pages/ProjetoListaTarefas';
import ProjetoSalvadorAbas from './pages/ProjetoSalvadorAbas';
import Contato from './pages/Contato';

export default function App() {
  return (
    <HashRouter>
      <div className="app-shell">
        <Header />
        <main className="page-main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sobre" element={<Sobre />} />
            <Route path="/projetos" element={<Projetos />} />
            <Route path="/projetos/osf-academy" element={<ProjetoOsfAcademy />} />
            <Route path="/projetos/balf360" element={<ProjetoBalf360 />} />
            <Route path="/projetos/calculadora" element={<ProjetoCalculadora />} />
            <Route path="/projetos/lista-de-tarefas" element={<ProjetoListaTarefas />} />
            <Route path="/projetos/salvador-de-abas" element={<ProjetoSalvadorAbas />} />
            <Route path="/contato" element={<Contato />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
}
