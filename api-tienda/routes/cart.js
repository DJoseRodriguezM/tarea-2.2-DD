// rutas para el carrito 
import { Router } from 'express'
import { CartController } from '../controllers/cartController.js'

const cartRouter = Router()

// Metodos
cartRouter.get('/:userId', CartController.getCartByUser)
cartRouter.post('/', CartController.addToCart)
cartRouter.delete('/:id', CartController.removeFromCart)


export default cartRouter