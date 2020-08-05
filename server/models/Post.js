const Sequelize = require('sequelize');
const db = require('../db');

const Post = db.define('post', {
    
    price: {
        type: Sequelize.INTEGER
    },
    distance: {
        type: Sequelize.NUMBER
    },
    time: {
        type: Sequelize.TIME
    },
    zipcode: {
        type: Sequelize.INTEGER
    },
    done: {
        type: Sequelize.BOOLEAN
    },
    creator_id: {
        type: Sequelize.INTEGER
    },
    receiver_id: {
        type: Sequelize.INTEGER
    },
    receiver_name: {
        type: Sequelize.STRING
    },
    creator_name: {
        type: Sequelize.STRING
    },
    rating: {
        type: Sequelize.INTEGER
    }

   
},{
	tableName: 'post_list',
	freezeTableName: true,	//prevent sequelize from pluralizing table names
	timestamps: false,
    underscored: false
    
});



module.exports = Post; 