const paginate = require('../helpers/paginate');
const { Transactions } = require('../models');

const TransactionController = class {
    async create (req, res) {
        try {
            let transaction_id = ''
            await Transactions.create(req.body)
                .then((data) => {
                    transaction_id = data.id
                })
            
            await Transactions.findOne({
                where: {
                    id: transaction_id,
                },
                raw: true
        })
            .then((result) => {
                return res.status(200).json({
                    status: 'Success',
                    message: 'Registering transaction success!',
                    data: result
                })
            })
        } catch (error) {
            return res.status(500).json({
                status: 'Fail',
                message: 'Registering transaction failed'
            })
        }
    }

    async one (req, res) {
        try {
            const transaction = await Transactions.findOne({
                where: {
                    id: req.params
                },
                raw: true,
            })

            return res.status(200).json({
                status: 'Success',
                message: 'Fetching transaction by ID success!',
                data: transaction
            })
        } catch (error) {
            return res.status(500).json({
                status: 'Fail',
                message: 'Fetching one transaction by ID failed'
            })
        }
    }

    async all (req, res) {
        try {
            const transactions = await Transactions.findAll({ raw: true })
            
            return res.status(200).json({
                status: 'Success',
                message: 'Fetching all transactions success!',
                data: paginate(transactions, req.query.page)
            })
        } catch (error) {
            return res.status(500).json({
                status: 'Fail',
                message: 'Get all transaction failed'
            })
        }
    }

    async update (req, res) {
        try {
            await Transactions.update({...req.body}, {
                where: {
                    id: req.params
                }
            })
                .then((result) => {
                    if (result == 1) {
                        Transactions.findOne({
                            where: {
                                id: req.params
                            },
                            raw: true
                        })
                            .then((data) => {
                                return res.status(200).json({
                                    status: 'Success',
                                    message: 'Update transactions success!',
                                    data: data
                                })
                            })
                    }
                })
        } catch (error) {
            return res.status(500).json({
                message: 'Update transaction failed'
            })
        }
    }

    async delete (req, res) {
        try {
            await Transactions.findOne({
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

                    Transactions.destroy({
                        where: {
                            id: req.params
                        }
                    })

                    return res.status(200).json({
                        status: 'Success',
                        message: 'Deleting transaction success'
                    })
                })
        } catch (err) {
            return res.status(500).json({
                status: 'Fail',
                message: 'Delete transaction failed'
            })
        }
    }
}

module.exports = new TransactionController;