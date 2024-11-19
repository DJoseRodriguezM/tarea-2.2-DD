// Controlador del carrito
import connection from '../config/db.js'

export class CartController {
    static getCartByUser(req, res) {
        const { userId } = req.params
        const consultaGeneral = "SELECT * FROM carrito WHERE usuario_id = ?"

        try {
            connection.query(consultaGeneral, [userId], async (error, results) => {
                if (error) {
                    return res.status(400).json({
                        error: true,
                        message: "Ocurrió un error al obtener los datos: " + error
                    })
                }

                if (results && results.length === 0) {
                    return res
                        .json({
                            message: "Usuario no encontrado"
                        })
                }

                let resultsEnd = [...results]
                const consultaProductos = "SELECT * FROM productos WHERE id = ?"
                const consultaDetalle = "SELECT * FROM detalles_producto WHERE id = ?"

                await Promise.all(results.map((element, index) => {
                    return new Promise((resolve, reject) => {
                        connection.query(consultaProductos, [element.producto_id], (error, productoResults) => {
                            if (error) {
                                reject(error)
                            } else {
                                resultsEnd[index].producto = productoResults[0]
                                resolve()
                            }
                        })
                    })
                }))

                await Promise.all(results.map((element, index) => {
                    return new Promise((resolve, reject) => {
                        connection.query(consultaDetalle, [element.detalle_id], (error, detalleResults) => {
                            if (error) {
                                reject(error)
                            } else {
                                resultsEnd[index].detalle = detalleResults[0]
                                resolve()
                            }
                        })
                    })
                }))

                return res
                    .header('Content-Type', 'application/json')
                    .status(200)
                    .json(resultsEnd)
            })
        } catch (error) {
            return res.status(400).json({
                error: true,
                message: "Ocurrió un error al obtener los datos" + error
            })
        }
    }

    static addToCart(req, res) {
        const { userId, productId, cantidad } = req.body

        if (!userId || !productId || !cantidad) {
            return res.status(400).json({
                error: true,
                message: "Todos los campos (userId, productId, cantidad) son requeridos"
            })
        }

        const consulta = "INSERT INTO carrito (usuario_id, producto_id, cantidad) VALUES (?, ?, ?)"

        try {
            connection.query(consulta, [userId, productId, cantidad], (error, results) => {

                if (error) {
                    return res.status(400).json({
                        error: true,
                        message: "Ocurrió un error al insertar los datos: " + error
                    })
                }

                return res
                    .header('Content-Type', 'application/json')
                    .status(200)
                    .json({
                        message: "Producto añadido al carrito"
                    })

            })

        } catch (error) {

            return res.status(400).json({
                error: true,
                message: "Ocurrió un error al insertar los datos" + error
            })

        }
    }

    static removeFromCart(req, res) {
        const { id } = req.params

        const consulta = "DELETE FROM carrito WHERE id = ? "

        try {
            connection.query(consulta, [id], (error, results) => {

                if (error) {
                    return res.status(400).json({
                        error: true,
                        message: "Ocurrió un error al eliminar los datos: " + error
                    })
                }

                if (results && results.affectedRows === 0) {
                    return res.status(404)
                        .json({
                            message: "Producto no encontrado"
                        })
                }

                return res
                    .header('Content-Type', 'application/json')
                    .status(200)
                    .json({
                        message: "Producto eliminado del carrito"
                    })

            })

        } catch (error) {

            return res.status(400).json({
                error: true,
                message: "Ocurrió un error al eliminar los datos" + error
            })

        }
    }
}