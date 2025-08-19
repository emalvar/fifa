const { Sequelize } = require('sequelize');
const { sequelize } = require('../database/db');
const Jugador = require('./Jugador')(sequelize, Sequelize);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Jugador = Jugador;

module.exports = db;
