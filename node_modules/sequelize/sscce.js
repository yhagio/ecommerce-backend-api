/*
 * Copy this file to ./sscce.js
 * Add code from issue
 * npm run sscce-{dialect}
 */

var Sequelize;
var DataTypes = Sequelize = require('./index');
var sequelize = require('./test/support').createSequelizeInstance({
  pool: {
    max: 10,
    min: 2,
    idle: 100000
  }
});

setInterval(function () {
  sequelize.query('SELECT SLEEP(1);');
}, 2000);
