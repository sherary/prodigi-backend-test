const { QueryTypes } = require('sequelize');
const paginate = require('../helpers/paginate');
const { Products, sequelize } = require('../models');

const ProductController = class {
    async create (req, res) {
        try {
            let product_id = ''
        await Products.create(req.body)
            .then((data) => {
                product_id = data.id
            })
        
        await Products.findOne({
            where: {
                id: product_id,
            },
            raw: true
        })
            .then((result) => {
                return res.status(200).json({
                    status: 'Success',
                    message: 'Registering product success!',
                    data: result
                })
            })
        } catch (error) {
            return res.status(500).json({
                status: 'Fail',
                message: 'Registering product failed'
            })
        }
    }

    async one (req, res) {
        try {
            const product = await Products.findOne({
                where: {
                    id: req.params
                },
                raw: true,
            })

            return res.status(200).json({
                status: 'Success',
                message: 'Fetching product by ID success!',
                data: product
            })
        } catch (error) {
            return res.status(500).json({
                status: 'Fail',
                message: 'Fetching one product by ID failed'
            })
        }
    }

    async searchBy (req, res) {
        try {
            const product = 'p.title'
            const type = 't.name'
            const brand = 'b.name'
            const price = 'p.price'
            const discount = 'tr.discount'
            let string = ''
            let keyword = ''

            if (req.query) {
                if (req.query.title) {
                    string = product
                    keyword = req.query.title
                }
    
                if (req.query.brand) {
                    string = brand
                    keyword = req.query.brand
                }
    
                if (req.query.type) {
                    string = type
                    keyword = req.query.type
                }

                if (req.query.price) {
                    string = price
                    keyword = req.query.price
                }

                if (req.query.discount) {
                    string = discount
                    keyword = req.query.discount
                }

                // let fixedKeyword = typeof keyword == 'string' ? `%${keyword}%` : keyword
                let query = `SELECT p.id, p.title, p.description, t.name AS type, b.name brand_name, p.price, tr.discount, p.views, p.wishlisted, p.images FROM Products p 
                LEFT JOIN Types t ON t.id = p.type_id LEFT JOIN Brands b ON b.id = p.brand_id LEFT JOIN Transactions tr ON tr.product_id = p.id
                WHERE ${string} LIKE '%${keyword}%';`
                
                await sequelize.query(query, {
                    type: QueryTypes.SELECT
                })
                    .then((data) => {
                        // console.log(data, req.query)
                        return res.status(200).json({
                            status: 'Success finding product by name',
                            message: `${data.length} products found for ${keyword}`,
                            data: data
                        })
                    })
            } else {
                await Products.findAll({ raw: true })
                    .then((data) => {
                        return res.status(200).json({
                            status: 'No result',
                            message: `${data.length} products found for ${keyword}`,
                            data: data
                        })
                    })
            }
        } catch (error) {
            // console.log(error)
            return res.status(500).json({
                message: 'Failed to find product by name'
            })
        }
    }

    async all (req, res) {
        try {
            const products = await Products.findAll({ raw: true })
            
            return res.status(200).json({
                status: 'Success',
                message: 'Fetching all products success!',
                data: paginate(products, req.query.page)
            })
        } catch (error) {
            return res.status(500).json({
                status: 'Fail',
                message: 'Get all product failed'
            })
        }
    }

    async update (req, res) {
        try {
            await Products.update({...req.body}, {
                where: {
                    id: req.params
                }
            })
                .then((result) => {
                    if (result == 1) {
                        Products.findOne({
                            where: {
                                id: req.params
                            },
                            raw: true
                        })
                            .then((data) => {
                                return res.status(200).json({
                                    status: 'Success',
                                    message: 'Update products success!',
                                    data: data
                                })
                            })
                    }
                })
        } catch (error) {
            return res.status(500).json({
                message: 'Update product failed'
            })
        }
    }

    async delete (req, res) {
        try {
            await Products.findOne({
                where: {
                    id: req.params
                },
                raw: true
            })
                .then((data) => {
                    if (!data) {
                        return res.status(404).json({
                            status: 'Success',
                            message: 'Product already deleted'
                        })
                    }

                    Products.destroy({
                        where: {
                            id: req.params
                        }
                    })

                    return res.status(200).json({
                        status: 'Success',
                        message: 'Deleting product success'
                    })
                })
        } catch (err) {
            return res.status(500).json({
                status: 'Fail',
                message: 'Delete product failed'
            })
        }
    }
}

module.exports = new ProductController;