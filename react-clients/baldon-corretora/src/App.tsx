import Nav from './sections/Nav';
import Hero from './sections/Hero';
import Protecao from './sections/Protecao';
import Seguros from './sections/Seguros';
import Avaliacoes from './sections/Avaliacoes';
import Contato from './sections/Contato';
import Footer from './sections/Footer';

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Protecao />
        <Seguros />
        <Avaliacoes />
        <Contato />
      </main>
      <Footer />
    </>
  );
}
