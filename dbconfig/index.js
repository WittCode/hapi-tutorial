const Sequelize = require('sequelize');

const sequelize = new Sequelize('hapi_tutorial', 'root', 'toor', {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql'
});

async function testConnection() {

    try {
        await sequelize.authenticate();
        console.log("Connected!");
        const [results, metadata] = await sequelize.query('SELECT * FROM users');
        console.log(results);
        const [results2, metadata2] = await sequelize.query('UPDATE users SET username = "Bob" WHERE password = "soccer"');
        console.log(metadata2);
    } catch(err) {
        console.log("Can't connect to database!");
    }

}

testConnection();