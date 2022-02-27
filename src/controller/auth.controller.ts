import * as Koa from "koa"
// import authService from "../service/auth.service"

class AuthController {
  async login(ctx: Koa.Context, next: Koa.Next) {
    // 1 receive auth's queryInfo
    // const auth = ctx.request.body
    const { name } = ctx.request.body

    // 2 query Database
    // const result = await authService.create(auth)

    // 3 return data
    // ctx.body = result
    ctx.body = `login succeeded! welcome ${name} back!`
  }
}

const authController = new AuthController()
export { authController }
