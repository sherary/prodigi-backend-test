const express = require('express');
const app = express();
const db = require('./models');
const userRoutes = require('./routers/userRoutes');
require('dotenv').config();

const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/users', userRoutes);

db.sequelize.sync().then(() => {
    console.log(`Database connected!`);
    app.listen(PORT, () => {
        console.log(`🚀Server run on ${process.env.HOST}:${PORT}🚀`);
    })
}).catch(error => {
    console.error(error);
})

module.exports = app;
