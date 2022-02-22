const { Brands } = require('../models');

const BrandController = class {
    async create (req, res) {
        try {
            let brand_id = ''
            await Brands.create(req.body)
                .then((data) => {
                    brand_id = data.id
                })
            
            await Brands.findOne({
                where: {
                    id: brand_id,
                },
                raw: true
            })
                .then((result) => {
                    return res.status(200).json({
                        status: 'Success',
                        message: 'Registering brand success!',
                        data: result
                    })
                })
        } catch (err) {
            return res.status(500).json({
                status: 'Fail',
                message: 'Registering brand failed'
            })
        }
    }

    async all (req, res) {
        try {
            const brand = await Brands.findAll({ raw: true })
            return res.status(200).json({
                status: 'Success',
                message: 'Fetching all brand success!',
                data: brand
            })
        } catch (err) {
            return res.status(500).json({
                status: 'Fail',
                message: 'Get all brand failed'
            })
        }
    }

    async one (req, res) {
        try {
            const brand = await Brands.findOne({
                where: {
                    id: req.params
                },
                raw: true,
            })
            return res.status(200).json({
                status: 'Success',
                message: 'Fetching brand by ID succes!',
                data: brand
            })
        } catch (err) {
            return res.status(500).json({
                status: 'Fail',
                message: 'Fetching one brand by ID failed'
            })
        }
    }

    async update (req, res) {
        try {
            await Brands.update({...req.body}, { 
                where: {
                    id: req.params
                }
            })
                .then((result) => {
                    if (result == 1) {
                        Brands.findOne({
                            where: {
                                id: req.params
                            },
                            raw: true
                        })
                            .then((data) => {
                                return res.status(200).json({
                                    status: 'Success',
                                    message: 'Update brand success!',
                                    data: data
                                })
                            })
                    }
                })
        } catch (err) {
            console.log(err)
            return res.status(500).json({
                message: 'Update brand failed'
            })
        }
    }

    async delete (req, res) {
        try {
            await Brands.findOne({
                where: {
                    id: req.params
                },
                raw: true
            })
                .then((data) => {
                    if (!data) {
                        return res.status(404).json({
                            status: 'Success',
                            message: 'Brand already deleted!',
                        })
                    }

                    Brands.destroy({
                        where: {
                            id: req.params
                        }
                    })

                    return res.status(200).json({
                        status: 'Success',
                        message: 'Deleting brand success!'
                    })
                })
        } catch (err) {
            console.log(err)
            return res.status(500).json({
                status: 'Fail',
                message: 'Delete brand failed'
            })
        }
    } 
}

module.exports = new BrandController;