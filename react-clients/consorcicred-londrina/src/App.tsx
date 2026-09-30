import Nav from './sections/Nav';
import Hero from './sections/Hero';
import Parceiros from './sections/Parceiros';
import Solucoes from './sections/Solucoes';
import Sonhos from './sections/Sonhos';
import ComoFunciona from './sections/ComoFunciona';
import Duvidas from './sections/Duvidas';
import Contato from './sections/Contato';
import Footer from './sections/Footer';

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Parceiros />
        <Solucoes />
        <Sonhos />
        <ComoFunciona />
        <Duvidas />
        <Contato />
      </main>
      <Footer />
    </>
  );
}
