import connection from "../app/database"

class CommentService {
  async create(
    content: string,
    momentID: number,
    userID: number,
    commentID: number
  ) {
    const statement = `INSERT INTO comment (content, moment_id, user_id, comment_id) VALUES (?,?,?,?);`
    const [result] = await connection.execute(statement, [
      content,
      momentID,
      userID,
      commentID
    ])

    return result
  }

  async getCommentsByMomentID(momentID: number) {
    const statement = `
    SELECT
      c.id, c.content,c.comment_id commentID, c.createAt,c.updateAt,
      JSON_OBJECT('id',u.id,'name',u.name) user
    FROM comment c
    LEFT JOIN user u ON u.id=c.user_id
    WHERE moment_id = ?;`
    const [result] = await connection.execute(statement, [momentID])

    return result
  }

  async updateCommentByID(commentID: number, content: string) {
    const statement = `UPDATE comment SET content = ? WHERE id = ?;`
    const [result] = await connection.execute(statement, [content, commentID])

    return result
  }

  async deleteCommentByID(commentID: number) {
    const statement = `DELETE FROM comment WHERE id = ?;`
    const [result] = await connection.execute(statement, [commentID])

    return result
  }
}

export = new CommentService()
