const { Sequelize } = require('sequelize')
require('dotenv').config()
const DATABASE = process.env.NODE_ENV === "development"
  ? 
  process.env.DEV_DATABASE
  : 
  process.env.DATABASE_URL;


const sequelize = process.env.NODE_ENV === "development"
  ?
  new Sequelize(DATABASE,'postgres','password',{
    host: 'localhost',
    dialect: 'postgres',
    logging: console.log
  })
  : 
  new Sequelize(DATABASE);  //heroku uses connection uri instead of passing parameters


module.exports = sequelize;