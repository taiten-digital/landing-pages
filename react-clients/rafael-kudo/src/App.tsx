import Nav from './sections/Nav';
import Hero from './sections/Hero';
import Sobre from './sections/Sobre';
import Metodo from './sections/Metodo';
import Numeros from './sections/Numeros';
import Planos from './sections/Planos';
import { Contato } from './sections/Contato';
import Footer from './sections/Footer';

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Sobre />
        <Metodo />
        <Numeros />
        <Planos />
        <Contato />
      </main>
      <Footer />
    </>
  );
}
