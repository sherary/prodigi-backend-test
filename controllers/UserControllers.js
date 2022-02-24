const { Users } = require('../models');
const paginate = require('../helpers/paginate');

const UserController = class {
    async register (req, res) {
        try {
            let user_id = ''
            await Users.create(req.body)
                .then((data) => {
                    user_id = data.id
                })
            
            await Users.findOne({
                where: {
                    id: user_id
                },
                raw: true
            })
                .then((result) => {
                    return res.status(200).json({
                        status: 'Success',
                        message: 'Register success!',
                        data: result
                    })
                })
        } catch (err) {
            console.log(err)
            return res.status(500).json({
                status: 'Fail',
                message: 'Register account failed'
            })
        }
    }

    async all (req, res) {
        try {
            const users = await Users.findAll({ raw: true })

            return res.status(200).json({
                status: 'Success',
                message: 'Fetching all users success!',
                data: paginate(users, req.query.page)
            })
        } catch (err) {
            console.log(err)
            return res.status(500).json({
                status: 'Fail',
                message: 'Get all users failed'
            })
        }
    }

    async one (req, res) {
        try {
            const user = await Users.findOne({
                where: {
                    id: req.params.user_id
                },
                raw: true,
            })
            return res.status(200).json({
                status: 'Success',
                message: 'Fetching user by ID succes!',
                data: user
            })
        } catch (err) {
            return res.status(500).json({
                status: 'Fail',
                message: 'Fetching one user by ID failed'
            })
        }
    }

    async update (req, res) {
        try {
            await Users.update({
                name: req.body.name,
                email: req.body.email,
                username: req.body.username,
            }, { 
                where: {
                    id: req.params.user_id
                }
            })
                .then((result) => {
                    if (result == 1) {
                        Users.findOne({
                            where: {
                                id: req.params.user_id
                            },
                            raw: true
                        })
                            .then((data) => {
                                return res.status(200).json({
                                    status: 'Success',
                                    message: 'Update user success!',
                                    data: data
                                })
                            })
                    }
                })
        } catch (err) {
            console.log(err)
            return res.status(500).json({
                message: 'Update failed'
            })
        }
    }

    async delete (req, res) {
        try {
            await Users.findOne({
                where: {
                    id: req.params.user_id,
                },
                raw: true
            })
                .then((data) => {
                    if (!data) {
                        return res.status(404).json({
                            status: 'Success',
                            message: 'User already deleted!',
                        })
                    }

                    Users.destroy({
                        where: {
                            id: req.params.user_id
                        }
                    })

                    return res.status(200).json({
                        status: 'Success',
                        message: 'Deleting user success!'
                    })
                })
        } catch (err) {
            console.log(err)
            return res.status(500).json({
                message: 'Delete failed'
            })
        }
    }
}

module.exports = new UserController;