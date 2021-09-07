require('dotenv').config();
module.exports = {
  "development": {
    "username": "postgres",
    "password": "password",
    "database": process.env.DEV_DATABASE,
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "localhost",
    "dialect": "postgres",
    "use_env_variable": "DATABASE_URL"
  }
}