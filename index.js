const express = require('express');
const app = express();
const db = require('./models');
const userRoutes = require('./routers/userRoutes');
const adminRoutes = require('./routers/adminRoutes');
const typeRoutes = require('./routers/typeRoutes');
require('dotenv').config();

const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/users', userRoutes);
app.use('/admins', adminRoutes);
app.use('/types', typeRoutes);

db.sequelize.sync().then(() => {
    console.log(`Database connected!`);
    app.listen(PORT, () => {
        console.log(`🚀Server run on ${process.env.HOST}:${PORT}🚀`);
    })
}).catch(error => {
    console.error(error);
})

module.exports = app;
