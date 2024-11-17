// rutas para los productos
import { Router } from 'express'
import { ProductsController } from '../controllers/productsController.js'


const productsRouter = Router()

// Metodos
productsRouter.get('/', ProductsController.getAllProducts)
productsRouter.get('/:id', ProductsController.getProductById)
productsRouter.post('/', ProductsController.createProduct)
productsRouter.put('/:id', ProductsController.updateProduct)
productsRouter.delete('/:id', ProductsController.deleteProduct)

export default productsRouter