import Nav from './sections/Nav';
import Hero from './sections/Hero';
import Contemplados from './sections/Contemplados';
import Modalidades from './sections/Modalidades';
import ComoFunciona from './sections/ComoFunciona';
import Comparativo from './sections/Comparativo';
import Contato from './sections/Contato';
import Footer from './sections/Footer';

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Contemplados />
        <Modalidades />
        <ComoFunciona />
        <Comparativo />
        <Contato />
      </main>
      <Footer />
    </>
  );
}
