import type { Context, Next } from "koa"
import errorTypes from "../constants/error-types"
import userService from "../service/user.service"
import { md5password } from "../utils/password-handler"

const verifyUser = async (ctx: Context, next: Next) => {
  const { name, password } = ctx.request.body

  // 1. verify not null
  // if (!name || !password || name === "" || password === "") {
  if (!name || !password) {
    const error = new Error(errorTypes.NAME_OR_PASSWORD_REQUIRED)
    return ctx.app.emit("error", error, ctx)
  }

  // 2. verify unique
  // "as any[]" is to fix mysql2 ts error
  const result = (await userService.getUserByName(name)) as any[]

  if (result.length) {
    const error = new Error(errorTypes.USER_EXIST)
    return ctx.app.emit("error", error, ctx)
  }

  await next()
}

const handlePassword = async (ctx: Context, next: Next) => {
  const { password } = ctx.request.body
  ctx.request.body.password = md5password(password)

  await next()
}

export { verifyUser, handlePassword }
