const Joi = require('joi');
const { Users } = require('../models');

const schema = Joi.object().keys({
    name: Joi.string().min(4).max(40).required(),
    email: Joi.string().email().required(),
    username: Joi.string().alphanum().min(4).max(24).required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
})

exports.ValidateUser = async (req, res, next) => {
    try {
        const value = await schema.validateAsync({
            name: req.body.name,
            email: req.body.email,
            username: req.body.username,
            password: req.body.password
        })
        
        await Users.findOne({
            where: {
                email: req.body.email
            },
            raw: true
        })
            .then((data) => {
                if (data) {
                    return res.status(400).json({
                        status: 'Fail',
                        message: 'User already exist'
                    })
                } else {
                    next()
                }
            })
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            message: 'Failed to validate user input',
            error: err.message
        })
    }
}