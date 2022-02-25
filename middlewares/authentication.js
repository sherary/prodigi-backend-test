const { Admins } = require('../models');

exports.adminOnly = async (req, res, next) => {
    const admin = await Admins.findOne({
        where: {
            username: req.user.username
        },
        raw: true,
    })

    if (admin.username !== req.user.username) return res.status(422).json({
        status: 'Fail',
        message: 'Permission needed'
    })

    if (!admin) {
        res.status(403).json({
            status: 'Fail',
            message: 'No admin account found'
        })
    } else {
        req.user["admin_id"] = admin.id
        next()
    }
}