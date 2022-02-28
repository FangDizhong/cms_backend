import type { Context } from "koa"
import errorTypes from "../constants/error-types"

// error as response
const errorHandler = (error: Error, ctx: Context) => {
  let status, message

  // https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Status#%E6%9C%8D%E5%8A%A1%E7%AB%AF%E5%93%8D%E5%BA%94
  switch (error.message) {
    case errorTypes.NAME_OR_PASSWORD_REQUIRED:
      status = 400 // Bad Request
      message = "Username or password cannot be null!"
      break
    case errorTypes.USER_EXIST:
      status = 409 // Conflict
      message = "User already exists!"
      break
    case errorTypes.USER_NOT_EXIST:
      status = 400 // param error
      message = "User does not exist!"
      break
    case errorTypes.PASSWORD_NOT_CORRECT:
      status = 400 // param error
      message = "Password is not correct!"
      break
    case errorTypes.USER_NOT_AUTHORIZED:
      status = 401 // Unauthorized
      message = "user is not authorized!"
      break

    default:
      status = 404
      message = "NOT FOUND!"
  }

  ctx.status = status
  ctx.body = message
}

export { errorHandler }
