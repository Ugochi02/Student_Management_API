const express = require('express');
const multer = require('multer')
require('dotenv').config();
const PORT = process.env.PORT || 2500;
const sequelize = require('./database/database');
const routes = require('./routes/studentRouter')
const app = express();
app.use(express.json());
app.use(routes);
app.use((err, req, res, next) => {
    if (err instanceof multer.MulterError){
        return res.status(400).json({
            message: err.message
        })
    }
})

const DBConnect = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connection established successfully')
    } catch (error) {
        console.log("Error connecting to Database: ", error.message)
    }
}

DBConnect();

app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`)
})