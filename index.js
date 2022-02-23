const express = require('express');
const app = express();
const db = require('./models');
const userRoutes = require('./routers/userRoutes');
const adminRoutes = require('./routers/adminRoutes');
const typeRoutes = require('./routers/typeRoutes');
const brandRoutes = require('./routers/brandRoutes');
const productRoutes = require('./routers/productRoutes');
const transactionRoutes = require('./routers/transactionRoutes');
require('dotenv').config();

const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/users', userRoutes);
app.use('/admins', adminRoutes);
app.use('/types', typeRoutes);
app.use('/brands', brandRoutes);
app.use('/products', productRoutes);
app.use('/transactions', transactionRoutes);

db.sequelize.sync().then(() => {
    console.log(`Database connected!`);
    app.listen(PORT, () => {
        console.log(`🚀Server run on ${process.env.HOST}:${PORT}🚀`);
    })
}).catch(error => {
    console.error(error);
})

module.exports = app;
