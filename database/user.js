require('dotenv').config({ path: '/home/navgurukul/Desktop/employee/.env' })
console.log(process.env.db_name);
const knex = require('knex')({
    client: 'mysql',
    connection: {
        host: process.env.db_host,
        user: process.env.db_user,
        password: process.env.db_pass,
        database: process.env.db_name
    },
    useNullAsDefault: true

})

knex.schema.createTable("users", function (table) {
    table.increments('employee_id').primary()
    table.string("firstname")
    table.string("lastname")
    table.string("email")
    table.string("password")
    table.string("organization")
}).then((result) => {
    console.log("table is successfully created");

}).catch((err) => {
    console.log("table already created");

});
module.exports = knex