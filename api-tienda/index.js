import express, { json } from 'express'
import productsRouter from './routes/products.js'
import cartRouter from './routes/cart.js'
import { corsMiddleware } from './middlewares/cors.js'

const app = express()

//Middleware
app.disable('x-powered-by')
app.use(json())
app.use(corsMiddleware())

const PORT = process.env.PORT || 3000

//Rutas
app.use('/products', productsRouter) // Rutas de productos
app.use('/cart', cartRouter) // Rutas de carrito

// Middleware para manejo de rutas inexistentes
app.use((req, res) => {
    res.status(404).json({
        message: "URL no encontrada"
    })
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})