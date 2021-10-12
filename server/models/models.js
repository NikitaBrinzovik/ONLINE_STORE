// ОПИСАНИЕ МОДЕЛЕЙ И ТИПОВ СВЯЗИ МЕЖДУ НИМИ.  таблицу нарисовал в draw io

const sequelize = require('../db')
const {DataTypes} = require('sequelize') //этот класс описывает типа поля str int arr ..

//============= ОПИСЫВАЕМ МОДЕЛИ
//берём модель Юзер и описыаем поля (id и тд)
const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true,},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: 'USER'},
})

const Basket = sequelize.define('basket', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const BasketDevice = sequelize.define('basket_device', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const Device = sequelize.define('device', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    price: {type: DataTypes.INTEGER, allowNull: false},
    rating: {type: DataTypes.INTEGER, defaultValue: 0},
    img: {type: DataTypes.STRING, allowNull: false},
})

const Type = sequelize.define('type', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
})

const Brand = sequelize.define('brand', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
})
const Rating = sequelize.define('rating', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    rate: {type: DataTypes.INTEGER, allowNull: false},
})

const DeviceInfo = sequelize.define('device_info', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false}
})

const TypeBrand = sequelize.define('type_brand', { //эта таблица для свзи таблиц(многих к многим)
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})

//==========ОПИСЫВАЕМ СВЯЗИ ЭТИХ МОДЕЛЕЙ:

User.hasOne(Basket)
Basket.belongsTo(User)

User.hasMany(Rating)
Rating.belongsTo(User)

Basket.hasMany(BasketDevice)
BasketDevice.belongsTo(Basket)

Device.hasMany(BasketDevice)
BasketDevice.belongsTo(Device)

Device.hasMany(Rating)
Rating.belongsTo(Device)

Device.hasMany(DeviceInfo, {as: 'info'})
DeviceInfo.belongsTo(Device)

Type.hasMany(Device)
Device.belongsTo(Type)

Brand.hasMany(Device)
Device.belongsTo(Brand)

Brand.belongsToMany(Type, {through: TypeBrand})
Type.belongsToMany(Brand, {through: TypeBrand})

//=========== ЭКСПОРТИРУЕМ ЭТИ МОДЕЛИ

module.exports = {
    User,
    Basket,
    Type,
    Brand,
    Device,
    BasketDevice,
    Rating,
    DeviceInfo,
    TypeBrand,
}