import Nav from './sections/Nav';
import Hero from './sections/Hero';
import Servicos from './sections/Servicos';
import Galeria from './sections/Galeria';
import Sobre from './sections/Sobre';
import Avaliacoes from './sections/Avaliacoes';
import Unidades from './sections/Unidades';
import Contato from './sections/Contato';
import Footer from './sections/Footer';

export default function App() {
  return (
    <>
      <Nav />
      <main id="top">
        <Hero />
        <Servicos />
        <Galeria />
        <Sobre />
        <Avaliacoes />
        <Unidades />
        <Contato />
      </main>
      <Footer />
    </>
  );
}
