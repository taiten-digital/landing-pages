import Nav from './sections/Nav';
import Hero from './sections/Hero';
import Marquee from './sections/Marquee';
import Sobre from './sections/Sobre';
import Barris from './sections/Barris';
import Marcas from './sections/Marcas';
import Pedido from './sections/Pedido';
import Avaliacao from './sections/Avaliacao';
import Contato from './sections/Contato';

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Sobre />
        <Barris />
        <Marcas />
        <Pedido />
        <Avaliacao />
        <Contato />
      </main>
    </>
  );
}
