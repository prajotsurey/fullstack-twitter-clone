const { Sequelize } = require('sequelize')
require('dotenv').config()
const DATABASE = process.env.NODE_ENV === "test"
? process.env.TEST_DATABASE
: process.env.DEV_DATABASE


const sequelize = new Sequelize(DATABASE,'postgres','password',{
  host: 'localhost',
  dialect: 'postgres',
  logging: console.log
})

module.exports = sequelize;