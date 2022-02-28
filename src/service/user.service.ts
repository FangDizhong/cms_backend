import connection from "../app/database"

// Database Handler
class UserService {
  async create(user: any) {
    const { name, password } = user
    const statement = `INSERT INTO user (name,password) VALUES (?,?);`

    const result = await connection.execute(statement, [name, password])

    console.log("add user into DB:", user)
    return result[0]
  }

  async getUserByName(name: string) {
    const statement = `SELECT * FROM user WHERE name = ?;`
    const result = await connection.execute(statement, [name])

    return result[0]
  }
}

const userService = new UserService()
export default userService
