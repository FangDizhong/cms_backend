//
import connection from "../app/database"

class AuthService {
  async verifyResourceAuth(
    resourceName: string,
    momentID: number,
    userID: number
  ) {
    try {
      // verify whether userID had sent momentID
      const statement = `SELECT * FROM ${resourceName} WHERE id = ? AND user_id = ?;`
      // [result]=[0], as any[] is to fix mysql2 ts error
      const [result] = (await connection.execute(statement, [
        momentID,
        userID
      ])) as any[]

      return result.length !== 0
    } catch (err) {
      console.log(err)
    }
  }
}

export = new AuthService()
