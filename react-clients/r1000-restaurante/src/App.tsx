import Nav from './sections/Nav';
import Hero from './sections/Hero';
import Cardapio from './sections/Cardapio';
import Pedir from './sections/Pedir';
import OndeEstamos from './sections/OndeEstamos';
import Footer from './sections/Footer';

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Cardapio />
        <Pedir />
        <OndeEstamos />
      </main>
      <Footer />
    </>
  );
}
