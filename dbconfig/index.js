const Sequelize = require('sequelize');

const sequelize = new Sequelize('hapi_tutorial', 'root', 'toor', {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql'
});

module.exports.connect = sequelize;