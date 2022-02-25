const paginate = require('../helpers/paginate');
const { Admins } = require('../models');

const AdminController = class {
    async register (req, res) {
        try {
            let user_id = ''
            await Admins.create(req.body)
                .then((data) => {
                    user_id = data.id
                })
            
            await Admins.findOne({
                where: {
                    id: user_id
                },
                raw: true
            })
                .then((data) => {
                    await Admins.update({
                        online: true
                    }, {
                        where: {
                            id: data.id
                        }
                    })

                    return res.status(200).json({
                        status: 'Success',
                        message: 'Register success!',
                        data: data
                    })
                })
        } catch (err) {
            console.log(err)
            return res.status(500).json({
                status: 'Fail',
                message: 'Register admin failed'
            })
        }
    }

    async all (req, res) {
        try {
            const users = await Admins.findAll({ raw: true })

            return res.status(200).json({
                status: 'Success',
                message: 'Fetching all admins success!',
                data: paginate(users, req.query.page)
            })
        } catch (err) {
            return res.status(500).json({
                status: 'Fail',
                message: 'Get all admins failed'
            })
        }
    }

    async login (req, res) {
        const user = await Admins.findOne({
            where: {
                username: req.user.username
            },
            raw: true,
        })

        await Admins.update({
            online: true,
        }, {
            where: {
                username: req.user.username
            }
        })

        return res.status(200).json({
            message: 'Success logging in',
            data: user,
            token: req.user.token
        })
    }

    async logout (req, res) {
        await Admins.update({
            online: false,
        }, {
            where: {
                username: req.user.username
            }
        })

        return res.status(200).json({
            message: 'Success logging out',
        })
    }

    async one (req, res) {
        try {
            const user = await Admins.findOne({
                where: {
                    id: req.params.user_id
                },
                raw: true,
            })
            return res.status(200).json({
                status: 'Success',
                message: 'Fetching admin by ID succes!',
                data: user
            })
        } catch (err) {
            return res.status(500).json({
                status: 'Fail',
                message: 'Fetching one admin by ID failed'
            })
        }
    }

    async update (req, res) {
        try {
            await Admins.update({
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
                        Admins.findOne({
                            where: {
                                id: req.params.user_id
                            },
                            raw: true
                        })
                            .then((data) => {
                                return res.status(200).json({
                                    status: 'Success',
                                    message: 'Update admin success!',
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
            await Admins.findOne({
                where: {
                    id: req.params.user_id,
                },
                raw: true
            })
                .then((data) => {
                    if (!data) {
                        return res.status(404).json({
                            status: 'Success',
                            message: 'Admin already deleted!',
                        })
                    }

                    Admins.destroy({
                        where: {
                            id: req.params.user_id
                        }
                    })

                    return res.status(200).json({
                        status: 'Success',
                        message: 'Deleting admin success!'
                    })
                })
        } catch (err) {
            console.log(err)
            return res.status(500).json({
                message: 'Delete failed'
            })
        }
    } 
};

module.exports = new AdminController;