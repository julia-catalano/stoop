const Sequelize = require('sequelize')
const db = require('../db')

const Cat = db.define('cat', {
  name: {
    type: Sequelize.STRING
  },
  time: {
    type: Sequelize.STRING
  },
  latitude: {
    type: Sequelize.DECIMAL,
    allowNull: false
  },
  longitude: {
    type: Sequelize.DECIMAL,
    allowNull: false
  },
  imageUrl: {
    type: Sequelize.STRING
  },
  hideUser: {
    type: Sequelize.BOOLEAN
  }
})

module.exports = Cat
