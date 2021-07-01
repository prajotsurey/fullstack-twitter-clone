const sequalize = require('sequelize')

const DATABASE = process.env.NODE_ENV === "test"
? process.env.TEST_DATABASE
: process.env.DEV_DATABASE

const db = new sequalize(DATABASE,'postgres','password',{
  host: 'localhost',
  dialect: 'postgres',
})

module.exports = db;