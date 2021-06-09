const mysql = require("mysql");

let options = {
    host     : 'localhost', //실제로 연결할 데이터베이스의 위치
    port     : 3306,
    user     : 'root',
    password : '1234',
    database : 'pension' //데이터베이스 이름

};

let myConnection = {
    options: options,
    connection : () => {
        return mysql.createConnection(options)
    },
    init : (con) => {
        con.connect(function (err) {
            if (err) {
              console.error('mysql connection error :' + err);
            } else {
              console.info('mysql is connected successfully.');
            }
        })
    }
};

module.exports = myConnection;