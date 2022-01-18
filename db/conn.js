const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('tought', 'root', 'password', {
    host: 'localhost',
    dialect: 'mysql',
})

try {
    sequelize.authenticate()
    console.log('Conectado com sucesso!')
} catch (err) {
    console.log(`Não foi possivel conectar erro: ${err}`)
}

module.exports = sequelize