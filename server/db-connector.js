// // Get an instance of mysql we can use in the app
// var mysql = require('mysql')

// // Create a 'connection pool' using the provided credentials
// var pool = mysql.createPool({
//     connectionLimit : 10,
//     host            : 'classmysql.engr.oregonstate.edu',
//     user            : 'cs340_macfarro',
//     password        : 'W2JsB5i0YASM',
//     database        : 'cs340_macfarro'
// })

// // Export it for use in our application
// module.exports.pool = pool;



var mysql = require('mysql')
var pool = mysql.createPool({
    connectionLimit: 10,
    host            : 'classmysql.engr.oregonstate.edu',
    user            : 'cs340_parkmans',
    password        : '0423',
    database        : 'cs340_parkmans'
})

module.exports.pool = pool;