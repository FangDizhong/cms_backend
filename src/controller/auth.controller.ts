import jwt from "jsonwebtoken"

import type { Context, Next } from "koa"

import config from "../app/config"
// import authService from "../service/auth.service"

class AuthController {
  async login(ctx: Context, next: Next) {
    // 1 receive userInfo from middleware after verifyLogin
    const { id, name } = ctx.user

    // 2 create token
    const token = jwt.sign({ id, name }, config.PRIVATE_KEY, {
      expiresIn: 60 * 60 * 24,
      algorithm: "RS256"
    })

    // 3 return data
    // ctx.body = result
    ctx.body = { id, name, token }
  }

  async success(ctx: Context, next: Next) {
    ctx.body = "VerifyAuth success!"
  }
}

const authController = new AuthController()
export { authController }
