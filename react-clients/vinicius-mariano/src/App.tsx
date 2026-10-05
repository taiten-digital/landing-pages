import Nav from './sections/Nav';
import Hero from './sections/Hero';
import Liberdade from './sections/Liberdade';
import Diagnostico from './sections/Diagnostico';
import Metodo from './sections/Metodo';
import Sobre from './sections/Sobre';
import Contato from './sections/Contato';
import Footer from './sections/Footer';

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Liberdade />
        <Diagnostico />
        <Metodo />
        <Sobre />
        <Contato />
      </main>
      <Footer />
    </>
  );
}
