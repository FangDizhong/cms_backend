import jwt from "jsonwebtoken"

import type { Context, Next } from "koa"

import errorTypes from "../constants/error-types"
import authService from "../service/user.service"
import { md5password } from "../utils/password-handler"
import config from "../app/config"

const verifyLogin = async (ctx: Context, next: Next) => {
  const { name, password } = ctx.request.body

  // 1. verify not null
  // if (!name || !password || name === "" || password === "") {
  if (!name || !password) {
    const error = new Error(errorTypes.NAME_OR_PASSWORD_REQUIRED)
    return ctx.app.emit("error", error, ctx)
  }

  // 2. verify user exists
  // "as any[]" is to fix mysql2 ts error
  const result = (await authService.getUserByName(name)) as any[]
  const user = result[0]
  if (!user) {
    const error = new Error(errorTypes.USER_NOT_EXIST)
    return ctx.app.emit("error", error, ctx)
  }

  // 3. verify password(encryption)
  if (md5password(password) !== user.password) {
    const error = new Error(errorTypes.PASSWORD_NOT_CORRECT)
    return ctx.app.emit("error", error, ctx)
  }

  ctx.user = user

  await next()
}

const verifyAuth = async (ctx: Context, next: Next) => {
  console.log("verifyAuth middleware")

  // 1. get token
  const authorization = ctx.headers.authorization
  const token = authorization!.replace("Bearer ", "")

  // 2. verify token
  try {
    const result = jwt.verify(token, config.PUBLIC_KEY, {
      algorithms: ["RS256"]
    })
    ctx.user = result
  } catch (err) {
    const error = new Error(errorTypes.USER_NOT_AUTHORIZED)
    ctx.app.emit("error", error, ctx)
  }

  await next()
}

export { verifyLogin, verifyAuth }
