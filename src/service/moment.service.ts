import connection from "../app/database"

const GET_MOMENT_SQL = `
SELECT
  m.id id, m.content content, m.createAt createAt, m.updateAt updateAt,
  JSON_OBJECT('id',u.id,'name',u.name) author
FROM moment m
LEFT JOIN user u ON m.user_id = u.id`

class MomentService {
  async create(userID: number, content: string) {
    const statement = `INSERT INTO moment (content,user_id) VALUES (?,?);`
    const [result] = await connection.execute(statement, [content, userID])

    return result
  }

  async getMomentByID(momentID: number) {
    const statement = `
      ${GET_MOMENT_SQL}
      WHERE m.id = ?;`
    // [result]=[0], as any[] is to fix mysql2 ts error
    const [result] = (await connection.execute(statement, [momentID])) as any[]

    return result[0]
  }

  async getMomentList(offset: number, limit: number) {
    const statement = `
    SELECT
      m.id id, m.content content, m.createAt createAt, m.updateAt updateAt,
      JSON_OBJECT('id',u.id,'name',u.name) author,
      (SELECT COUNT(*) FROM comment c WHERE c.moment_id = m.id) commentCount,
      (SELECT COUNT(*) FROM moment_label ml WHERE ml.moment_id = m.id) labelCount
    FROM moment m
    LEFT JOIN user u ON m.user_id = u.id
    Limit ?,?;`

    // convert offset & size into string again because mysql2 type bug
    try {
      const [result] = await connection.execute(statement, [
        offset.toString(),
        limit.toString()
      ])
      return result
    } catch (error) {
      console.log(error)
    }
  }

  async updateMomentByID(momentID: number, content: string) {
    const statement = `UPDATE moment SET content = ? WHERE id = ?;`
    const [result] = await connection.execute(statement, [content, momentID])
    return result
  }

  async deleteMomentByID(momentID: number) {
    const statement = `DELETE FROM moment WHERE id = ?;`
    const [result] = await connection.execute(statement, [momentID])
    return result
  }
}

export = new MomentService()
