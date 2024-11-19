// Controlador de productos
import crypto from 'node:crypto'
import connection from '../config/db.js'

export class ProductsController {
    static getAllProducts(req, res) {
        const consulta = "SELECT * FROM productos"

        try {
            connection.query(consulta, (error, results) => {

                if (error) {
                    return res.status(400).json({
                        error: true,
                        message: "Ocurrió un error al obtener los dato: " + error
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

    static getProductById(req, res) {
        const { id } = req.params
        const consulta = "SELECT * FROM productos WHERE id = ?"

        try {
            connection.query(consulta, [id], (error, results) => {

                if (error) {
                    return res.status(400).json({
                        error: true,
                        message: "Ocurrió un error al obtener los datos: " + error
                    })
                }

                if (results && results.length === 0) {
                    return res
                        .header('Content-Type', 'application/json')
                        .status(404)
                        .json({
                            message: "Usuario no encontrado"
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
                message: "Ocurrió un error al obtener los datos: " + error
            })

        }
    }

    static createProduct(req, res) {
        const consulta = "INSERT INTO productos (nombre, descripcion, precio, stock, categoria) VALUES (?, ?, ?, ?, ?)"

        try {
            const { nombre, descripcion, precio, stock, categoria } = req.body

            if (!nombre || !precio || !stock) {
                return res.status(400).json({
                    error: true,
                    message: "Los campos nombre, precio y stock son obligatorios"
                })
            }

            connection.query(consulta, [nombre, descripcion || null, precio, stock, categoria || null], (error, result) => {
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
                        message: "Producto creado con éxito"
                    })

            })
        } catch (error) {
            return res.status(400).json({
                error: true,
                message: "Ocurrió un error al insertar los datos: " + error
            })
        }
    }

    static updateProduct(req, res) {
        const { id } = req.params
        const consulta = "UPDATE productos SET nombre = ?, descripcion = ?, precio = ?, stock = ?, categoria = ? WHERE id = ?"

        try {
            const { nombre, descripcion, precio, stock, categoria } = req.body

            if (!nombre || !precio || !stock) {
                return res.status(400).json({
                    error: true,
                    message: "Los campos nombre, precio, stock son obligatorios"
                })
            }

            connection.query(consulta, [nombre, descripcion || null, precio, stock, categoria || null, id], (error, result) => {
                if (error) {
                    return res.status(400).json({
                        error: true,
                        message: "Ocurrió un error al actualizar los datos: " + error
                    })
                }

                return res
                    .header('Content-Type', 'application/json')
                    .status(200)
                    .json({
                        message: "Producto actualizado con éxito"
                    })

            })
        } catch (error) {
            return res.status(400).json({
                error: true,
                message: "Ocurrió un error al actualizar los datos: " + error
            })
        }
    }

    static deleteProduct(req, res) {
        const { id } = req.params
        const consulta = "DELETE FROM productos WHERE id = ?"

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
                        message: "Producto eliminado con éxito"
                    })

            })
        } catch (error) {
            return res.status(400).json({
                error: true,
                message: "Ocurrió un error al eliminar los datos: " + error
            })
        }
    }
}