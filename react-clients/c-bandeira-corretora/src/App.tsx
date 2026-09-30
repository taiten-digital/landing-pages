import Nav from './sections/Nav';
import Hero from './sections/Hero';
import Servicos from './sections/Servicos';
import PorQue from './sections/PorQue';
import ComoFunciona from './sections/ComoFunciona';
import Sobre from './sections/Sobre';
import Contato from './sections/Contato';
import Footer from './sections/Footer';

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Servicos />
        <PorQue />
        <ComoFunciona />
        <Sobre />
        <Contato />
      </main>
      <Footer />
    </>
  );
}
