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
                    res
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
        
        
    }

    static updateProduct(req, res) {
        
    }

    static deleteProduct(req, res) {
        
    }
}