import Nav from './sections/Nav'
import Hero from './sections/Hero'
import Sabores from './sections/Sabores'
import Combina from './sections/Combina'
import Pedido from './sections/Pedido'
import Artesanal from './sections/Artesanal'
import Contato from './sections/Contato'

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Sabores />
        <Combina />
        <Pedido />
        <Artesanal />
        <Contato />
      </main>
    </>
  )
}
