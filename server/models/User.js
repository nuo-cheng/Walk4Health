const Sequelize = require('sequelize');
const db = require('../db');

const User = db.define('user', {

    email: {
        type: Sequelize.STRING
    },
    name: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    },
    gender: {
        type: Sequelize.STRING
    },
    age: {
        type: Sequelize.INTEGER
    },

   
},{
	tableName: 'user_list',
	freezeTableName: true,	//prevent sequelize from pluralizing table names
	timestamps: false,
    underscored: false
    // classMethods: {
    //     associate: function (models) {
    //           user.hasMany(models.post, { foreignKey : 'id' , targetKey: 'creator_id'});
    //     }
    // }
});


module.exports = User; 