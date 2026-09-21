import Nav from './sections/Nav';
import Hero from './sections/Hero';
import Sobre from './sections/Sobre';
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
        <Servicos />
        <Faq />
        <Contato />
      </main>
      <Footer />
    </>
  );
}
