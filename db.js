const mysql = require('mysql2');
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "12345678",
    database: "expencestrack",
})
db.connect((err) => {
    if (err) {
        console.error('error connecting:', err);
    }
    else{
        console.log('connected as database');
    }
})
module.exports = db;