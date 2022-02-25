const { QueryTypes } = require('sequelize');
const paginate = require('../helpers/paginate');
const { Products, Admins, sequelize } = require('../models');

const ProductController = class {
    async create(req, res) {
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

    async one(req, res) {
        try {
            Products.findOne({
                    where: {
                        id: req.params.product_id
                    },
                    raw: true,
                })
                .then((data) => {
                    Products.update({
                        views: data.views + 1,
                    }, {
                        where: {
                            id: data.id
                        }
                    })
                    data["views"] = data.views + 1
                    return res.status(200).json({
                        status: 'Success',
                        message: 'Get product details',
                        data: data
                    })
                })
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                status: 'Fail',
                message: 'Fetching one product by ID failed'
            })
        }
    }

    async searchBy(req, res) {
        try {
            const product = `WHERE p.title LIKE '%${req.query.title}%'`
            const type = `WHERE t.name LIKE '%${req.query.type}%'`
            const brand = `WHERE b.name LIKE '%${req.query.brand}%'`
            const price = `WHERE p.price = ${Number(req.query.price)}`
            const discount = `WHERE tr.discount = ${Number(req.query.discount)}`
            let searchQuery = ''

            if (Object.keys(req.query).length > 0) {
                if (req.query.title) {
                    searchQuery = product
                } 
                if (req.query.type) {
                    searchQuery = type
                }
                if (req.query.brand) {
                    searchQuery = brand
                }
                if (req.query.price) {
                    searchQuery = price
                }
                if (req.query.discount) {
                    searchQuery = discount
                }

                let query = `SELECT p.id, p.title, p.description, t.name AS type, b.name brand_name, p.price, tr.discount, p.views, p.wishlisted, p.images FROM Products p 
                LEFT JOIN Types t ON t.id = p.type_id LEFT JOIN Brands b ON b.id = p.brand_id LEFT JOIN Transactions tr ON tr.product_id = p.id
                ${searchQuery};`

                await sequelize.query(query, {
                        type: QueryTypes.SELECT
                    })
                    .then((data) => {
                        return res.status(200).json({
                            status: 'Success finding product by name',
                            message: `${data.length} products found for ${Object.values(req.query)}`,
                            data: paginate(data, req.query.page)
                        })
                    })
            } else {
                await Products.findAll({
                        raw: true
                })
                    .then((data) => {
                        return res.status(200).json({
                            status: 'No query',
                            message: `${data.length} products found`,
                            data: paginate(data, req.query.page)
                        })
                    })
            }
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'Failed to find product by name'
        })
    }
    }

    async all(req, res) {
        try {
            const products = await Products.findAll({
                raw: true
            })

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
    
    async mostWishlist (req, res) {
        try {
            const product = await Products.findAll({
                where: {
                    admin_id: req.user.admin_id
                },
                raw: true,
                attributes: ['id', 'title', 'description', 'brand_id', 'type_id', 'price', 'views', 'wishlisted', 'images'],
                order: [['wishlisted', 'DESC']],
                limit: 1
            })

            return res.status(200).json({
                status: 'Success',
                message: 'Get most wishlisted item done',
                data: product
            })

        } catch (error) {
            return res.status(500).json({
                status: 'Fail',
                message: 'Failed to fetch most wishlisted item'
            })
        }
    }

    async mostWatched (req, res) {
        try {
            const product = await Products.findAll({
                where: {
                    admin_id: req.user.admin_id
                },
                raw: true,
                attributes: ['id', 'title', 'description', 'brand_id', 'type_id', 'price', 'views', 'wishlisted', 'images'],
                order: [['views', 'DESC']],
                limit: 1
            })

            return res.status(200).json({
                status: 'Success',
                message: 'Get most viewed item done',
                data: product
            })

        } catch (error) {
            return res.status(500).json({
                status: 'Fail',
                message: 'Failed to fetch most wishlisted item'
            })
        }
    }

    async update(req, res) {
        try {
            await Products.update({
                    ...req.body
                }, {
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

    async delete(req, res) {
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