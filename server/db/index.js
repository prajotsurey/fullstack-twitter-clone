const sequalize = require('sequelize')

const DATABASE = process.env.NODE_ENV === "test"
? process.env.TEST_DATABASE
: process.env.DEV_DATABASE

const db = new sequalize(DATABASE,'postgres','password',{
  host: 'localhost',
  dialect: 'postgres',
  logging: console.log
})

module.exports = db;