import mysql from "mysql2"
import config from "../app/config"

// connect to database globally
const connection = mysql.createPool({
  host: config.MYSQL_HOST,
  port: parseInt(config.MYSQL_PORT, 10),
  database: config.MYSQL_DATABASE,
  user: config.MYSQL_USER,
  password: config.MYSQL_PASSWORD
})

connection.getConnection((err, conn) => {
  conn.connect((err) => {
    if (err) {
      console.log("Connection failed!", err)
    } else {
      console.log("Connection succeeded!")
    }
  })
})

export default connection.promise()
