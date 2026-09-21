import Nav from './sections/Nav';
import Hero from './sections/Hero';
import Sobre from './sections/Sobre';
import Depoimentos from './sections/Depoimentos';
import Servicos from './sections/Servicos';
import Faq from './sections/Faq';
import Contato from './sections/Contato';
import Footer from './sections/Footer';

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Sobre />
        <Depoimentos />
        <Servicos />
        <Faq />
        <Contato />
      </main>
      <Footer />
    </>
  );
}
