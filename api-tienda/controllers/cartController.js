// Controlador del carrito
import connection from '../config/db.js'

export class CartController {
    static getCartByUser(req, res) {
    const { userId } = req.params

    const consulta = "SELECT * FROM carrito WHERE id = ?"

    try {
        connection.query(consulta, [userId], (error, results) => {

            if (error) {
                return res.status(400).json({
                    error: true,
                    message: "Ocurrió un error al obtener los datos: " + error
                })
            }
            return res
                .header('Content-Type', 'application/json')
                .status(200)
                .json(results)
        })
    } catch (error) {
        return res.status(400).json({
            error: true,
            message: "Ocurrió un error al obtener los datos" + error
        })
    }
    }

    static addToCart(req, res) {
        
    }

    static removeFromCart(req, res) {
        
    }
}