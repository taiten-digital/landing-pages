import Nav from './sections/Nav';
import Hero from './sections/Hero';
import Servicos from './sections/Servicos';
import Sobre from './sections/Sobre';
import ComoFunciona from './sections/ComoFunciona';
import Contato from './sections/Contato';
import Footer from './sections/Footer';

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Servicos />
        <Sobre />
        <ComoFunciona />
        <Contato />
      </main>
      <Footer />
    </>
  );
}
