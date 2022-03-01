import Router from "koa-router"
import authController from "../controller/auth.controller"
import { verifyLogin, verifyToken } from "../middleware/auth.middleware"

const authRouter = new Router()

// http request with a bunch of middlewares
authRouter.post("/login", verifyLogin, authController.login)
authRouter.get("/test", verifyToken, authController.success)

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
