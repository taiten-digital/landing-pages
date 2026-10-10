import Nav from './sections/Nav';
import Hero from './sections/Hero';
import Acompanhamento from './sections/Acompanhamento';
import Cronograma from './sections/Cronograma';
import ProximosPassos from './sections/ProximosPassos';
import Entregas from './sections/Entregas';
import Combinados from './sections/Combinados';
import Footer from './sections/Footer';

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Acompanhamento />
        <Cronograma />
        <ProximosPassos />
        <Entregas />
        <Combinados />
      </main>
      <Footer />
    </>
  );
}
