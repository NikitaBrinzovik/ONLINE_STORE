const {Sequelize} = require('sequelize')

module.exports = new Sequelize(
    process.env.DB_NAME, //НАЗВАНИЕ БАЗЫ
    process.env.DB_USER, //ПОЛЬЗОВАТЕЛЬ
    process.env.DB_PASSWORD, // пароль
    {
        dialect: 'postgres', // or SQL or...
        host: process.env.DB_HOST,
        port: process.env.DB_PORT
    }
)