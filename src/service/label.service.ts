import connection from "../app/database"

class LabelService {
  async create(name: string) {
    const statement = `INSERT INTO label (name) VALUE (?);`
    const [result] = await connection.execute(statement, [name])
    return result
  }

  async getLabelByName(name: string) {
    const statement = `SELECT * FROM label WHERE name = ?;`
    const [result] = await connection.execute(statement, [name])
    return result
  }

  async getLabelForMomentByID(momentID: number, labelID: number) {
    const statement = `SELECT * FROM moment_label WHERE moment_id = ? AND label_id =?;`
    const [result] = await connection.execute(statement, [momentID, labelID])
    return result
  }

  async getLabelsByMomentID(momentID: number) {
    const statement = `
    SELECT l.id labelID, l.name labelName
    FROM moment_label ml
    LEFT JOIN label l ON l.id=ml.label_id
    WHERE moment_id = ?;
    `
    const [result] = await connection.execute(statement, [momentID])
    return result
  }

  async addLabelForMoment(momentID: number, labelID: number) {
    const statement = `INSERT INTO moment_label (moment_id,label_id) VALUES (?,?);`
    const [result] = await connection.execute(statement, [momentID, labelID])
    return result
  }
}
export = new LabelService()
