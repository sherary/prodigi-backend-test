const paginate = require('../helpers/paginate');
const { Types } = require('../models');

const TypeController = class {
    async create (req, res) {
        try {
            let type_id = ''
            await Types.create(req.body)
                .then((data) => {
                    type_id = data.id
                })
            
            await Types.findOne({
                where: {
                    id: type_id,
                    raw: true
                }
            })
                .then((result) => {
                    return res.status(200).json({
                        status: 'Success',
                        message: 'Registering type success!',
                        data: result
                    })
                })
        } catch (err) {
            return res.status(500).json({
                status: 'Fail',
                message: 'Registering type failed'
            })
        }
    }

    async all (req, res) {
        try {
            const types = await Types.findAll({ raw: true })
            
            return res.status(200).json({
                status: 'Success',
                message: 'Fetching all types success!',
                data: paginate(types, req.query.page)
            })
        } catch (err) {
            return res.status(500).json({
                status: 'Fail',
                message: 'Get all types failed'
            })
        }
    }

    async one (req, res) {
        try {
            const type = await Types.findOne({
                where: {
                    id: req.params
                },
                types: true,
            })
            return res.status(200).json({
                status: 'Success',
                message: 'Fetching types by ID succes!',
                data: type
            })
        } catch (err) {
            return res.status(500).json({
                status: 'Fail',
                message: 'Fetching one type by ID failed'
            })
        }
    }

    async update (req, res) {
        try {
            await Types.update({
                name: req.body.name,
            }, { 
                where: {
                    id: req.params.type_id
                }
            })
                .then((result) => {
                    if (result == 1) {
                        Types.findOne({
                            where: {
                                id: req.params
                            },
                            types: true
                        })
                            .then((data) => {
                                return res.status(200).json({
                                    status: 'Success',
                                    message: 'Update type success!',
                                    data: data
                                })
                            })
                    }
                })
        } catch (err) {
            console.log(err)
            return res.status(500).json({
                message: 'Update type failed'
            })
        }
    }

    async delete (req, res) {
        try {
            await Types.findOne({
                where: {
                    id: req.params
                },
                types: true
            })
                .then((data) => {
                    if (!data) {
                        return res.status(404).json({
                            status: 'Success',
                            message: 'Type already deleted!',
                        })
                    }

                    Types.destroy({
                        where: {
                            id: req.params
                        }
                    })

                    return res.status(200).json({
                        status: 'Success',
                        message: 'Deleting type success!'
                    })
                })
        } catch (err) {
            console.log(err)
            return res.status(500).json({
                message: 'Delete type failed'
            })
        }
    } 
}

module.exports = new TypeController;