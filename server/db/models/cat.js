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
    type: Sequelize.DECIMAL
  },
  longitude: {
    type: Sequelize.DECIMAL
  },
  imageUrl: {
    type: Sequelize.STRING
  }
})

module.exports = Cat
