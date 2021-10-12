require('dotenv').config()
const express = require('express')
const sequelize = require('./db') //импортируем объект, который создали в файле db
const models = require('./models/models')
const PORT = process.env.PORT || 5000

const app = express()

//функия для подключения к базе данных. она асинх, так как все операции с БД ассинхронны
const start = async () => {
    try {

        await sequelize.authenticate()//с помощью этой функции уставливается подключение к БД
        await sequelize.sync()//ф-ия сверяет состояние БД со схемой БД
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))

    } catch (e) {
        console.log(e)
    }

}

start() //запускаем сервак