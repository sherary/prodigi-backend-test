const { Products } = require('../models');

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

    async all (req, res) {
        try {
            const products = await Products.findAll({ raw: true })
            return res.status(200).json({
                status: 'Success',
                message: 'Fetching all products success!',
                data: products
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