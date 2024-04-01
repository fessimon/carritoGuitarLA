import Header from "./components/Header"
import Guitarra from "./components/Guitarra"
import useCart from "./hooks/useCart"
function App() {
  const { 
    carrito,
    data,
    addToCart,
    removeCart,
    updateCant,
    decrementCant,
    vaciarCarrito,
    isEmpty,
    valorTotal } = useCart()

  return (
    <>
      <Header
        carrito={carrito}
        removeCart={removeCart}
        updateCant={updateCant}
        decrementCant={decrementCant}
        vaciarCarrito={vaciarCarrito}
        isEmpty={isEmpty}
        valorTotal={valorTotal}
      />
      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {
            data.map(guitarra => (
              <Guitarra
                key={guitarra.id}
                guitarra={guitarra}
                addToCart={addToCart}

              />
            ))
          }

        </div>
      </main>


      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
        </div>
      </footer>
    </>
  )
}

export default App
