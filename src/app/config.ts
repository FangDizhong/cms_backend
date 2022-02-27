// dotenv 用于加载.env文件到process.env对象中
import dotenv from "dotenv"

dotenv.config()

export default {
  APP_PORT: process.env.APP_PORT ?? "",
  MYSQL_HOST: process.env.MYSQL_HOST ?? "",
  MYSQL_PORT: process.env.MYSQL_PORT ?? "",
  MYSQL_DATABASE: process.env.MYSQL_DATABASE ?? "",
  MYSQL_USER: process.env.MYSQL_USER ?? "",
  MYSQL_PASSWORD: process.env.MYSQL_PASSWORD ?? ""
}

// export const {
//   APP_PORT,
//   MYSQL_HOST,
//   MYSQL_PORT,
//   MYSQL_DATABASE,
//   MYSQL_USER,
//   MYSQL_PASSWORD
// } = process.env
