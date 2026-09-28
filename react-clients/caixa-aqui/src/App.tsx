import Nav from './sections/Nav';
import Hero from './sections/Hero';
import Simulador from './sections/Simulador';
import Servicos from './sections/Servicos';
import ComoFunciona from './sections/ComoFunciona';
import Avaliacoes from './sections/Avaliacoes';
import Contato from './sections/Contato';
import Footer from './sections/Footer';

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Simulador />
        <Servicos />
        <ComoFunciona />
        <Avaliacoes />
        <Contato />
      </main>
      <Footer />
    </>
  );
}
