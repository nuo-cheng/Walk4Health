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
        type: Sequelize.STRING
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
    }

   
},{
	tableName: 'post_list',
	freezeTableName: true,	//prevent sequelize from pluralizing table names
	timestamps: false,
    underscored: false
    // classMethods:{
    //     associate: function(models) {
    //         post.belongsTo(models.user, { foreignKey: 'creator_id' });
    //     }
    // }
});

// db.sync({
//     force: true
// })

module.exports = Post; 