import Nav from './sections/Nav';
import Hero from './sections/Hero';
import ParaQuem from './sections/ParaQuem';
import Curso from './sections/Curso';
import Sobre from './sections/Sobre';
import Oferta from './sections/Oferta';
import Faq from './sections/Faq';
import ListaEspera from './sections/ListaEspera';
import Footer from './sections/Footer';

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <ParaQuem />
        <Curso />
        <Sobre />
        <Oferta />
        <Faq />
        <ListaEspera />
      </main>
      <Footer />
    </>
  );
}
