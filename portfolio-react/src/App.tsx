import { HashRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Sobre from './pages/Sobre';
import Projetos from './pages/Projetos';
import ProjetoOsfAcademy from './pages/ProjetoOsfAcademy';
import ProjetoBalf360 from './pages/ProjetoBalf360';
import ProjetoBuscadorCep from './pages/ProjetoBuscadorCep';
import ProjetoCalculadora from './pages/ProjetoCalculadora';
import ProjetoDashboardFinanceiro from './pages/ProjetoDashboardFinanceiro';
import ProjetoDevSecOpsChecklist from './pages/ProjetoDevSecOpsChecklist';
import ProjetoListaTarefas from './pages/ProjetoListaTarefas';
import ProjetoMiniEcommerce from './pages/ProjetoMiniEcommerce';
import ProjetoSalesforcePortfolioApp from './pages/ProjetoSalesforcePortfolioApp';
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
            <Route path="/projetos/buscador-de-cep" element={<ProjetoBuscadorCep />} />
            <Route path="/projetos/calculadora" element={<ProjetoCalculadora />} />
            <Route path="/projetos/dashboard-financeiro" element={<ProjetoDashboardFinanceiro />} />
            <Route path="/projetos/devsecops-checklist" element={<ProjetoDevSecOpsChecklist />} />
            <Route path="/projetos/lista-de-tarefas" element={<ProjetoListaTarefas />} />
            <Route path="/projetos/mini-ecommerce" element={<ProjetoMiniEcommerce />} />
            <Route path="/projetos/salesforce-portfolio-app" element={<ProjetoSalesforcePortfolioApp />} />
            <Route path="/projetos/salvador-de-abas" element={<ProjetoSalvadorAbas />} />
            <Route path="/contato" element={<Contato />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
}
