import Router from "koa-router"
import { authController } from "../controller/auth.controller"
import { verifyLogin, handlePassword } from "../middleware/auth.middleware"

const authRouter = new Router()

// http request with a bunch of middlewares
authRouter.post("/login", verifyLogin, handlePassword, authController.login)

export = authRouter
// dynamic import in this case:
// import(`./${fileName}`).then((router) => {}).catch((err) => {})
/**{
  ...
  default: Router {
    opts: {},
    methods: [
      'HEAD',   'OPTIONS',
      'GET',    'PUT',
      'PATCH',  'POST',
      'DELETE'
    ],
    params: {},
    stack: [ [Layer] ]
  }
}**/