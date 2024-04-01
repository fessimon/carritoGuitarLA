import { useEffect, useState, useMemo } from "react"
import { db } from "../data/db"

const useCart = () => {
    const stateInicialCarrito = () => {
        const localStorageCarrito = localStorage.getItem("carrito")
        return localStorageCarrito ? JSON.parse(localStorageCarrito) : []
      }
    
      const [data, setData] = useState(db)
      const [carrito, setCarrito] = useState(stateInicialCarrito)
    
      const MAX_ITEM = 5
      const MIN_ITEM = 1
    
      useEffect(() => {
          localStorage.setItem("carrito", JSON.stringify(carrito))
      }, [carrito])

    const addToCart = (item) => {
        //inmutabilidad
        const itemExist = carrito.findIndex((guitarra) => guitarra.id === item.id)
        if (itemExist >= 0) {
            if (carrito[itemExist].quantity > MAX_ITEM) return
            const updateCarrito = [...carrito]
            updateCarrito[itemExist].quantity++
            setCarrito(updateCarrito)
        } else {
            item.quantity = 1
            setCarrito([...carrito, item])
        }
    }
    const removeCart = (id) => {
        setCarrito(previoCarritoLleno => previoCarritoLleno.filter(guitarra => guitarra.id !== id))
     }
    const updateCant = (id) => { 
        const updateCarrito = carrito.map((guitarra) => {
            if (guitarra.id === id && guitarra.quantity < MAX_ITEM) {
              return {
                ...guitarra,
                quantity: guitarra.quantity + 1
              }
      
            }
            return guitarra
          })
          setCarrito(updateCarrito)
    }
    const decrementCant = (id) => {
        const updateCarrito = carrito.map((guitarra) => {
            if (guitarra.id === id && guitarra.quantity > MIN_ITEM) {
              return {
                ...guitarra,
                quantity: guitarra.quantity - 1
              }
            }
            return guitarra
          })
          setCarrito(updateCarrito)
     }
    const vaciarCarrito = () => { 
        setCarrito([])
    }
    /*State Derivado: va a evaluar el state sin crear otro 
  saca la logica del return convirtiendolo en funcion fuera del html 
  const isEmpty = carrito.length === 0
  
   * metodo reduce, array method qie toma dos parametros 
   * el primero es el valor inicial y el segundo es el callback
   * el valor inicial es 0
   * el item es el elemento actual es decir el array carrito
   */
  //uso de useMemo
  const isEmpty = useMemo(() => carrito.length === 0, [carrito])
  const valorTotal = useMemo(() => carrito.reduce((total, item) => total + (item.quantity * item.price), 0), [carrito])
    return {
        carrito, 
        data,
        addToCart,
        removeCart,
        updateCant,
        decrementCant,
        vaciarCarrito,
        isEmpty,
        valorTotal
    }
}
export default useCart