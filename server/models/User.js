const Sequelize = require('sequelize');
const db = require('../db');

const User = db.define('user', {
    
    email: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    },
   
},{
	tableName: 'user_list',
	freezeTableName: true,	//prevent sequelize from pluralizing table names
	timestamps: false,
	underscored: false,
});


module.exports = User; 