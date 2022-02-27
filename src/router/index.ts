import * as fs from "fs"
import Application from "koa"

const useRoutes = (app: Application) => {
  fs.readdirSync(__dirname).forEach((fileName) => {
    if (fileName == "index.ts") return

    import(`./${fileName}`)
      .then((router) => {
        // only *.default.* works because we can't get specific module name here
        // "export =" or "export default" syntax needed
        app.use(router.default.routes())
        app.use(router.default.allowedMethods())
      })
      .catch((err) => {
        console.log("Failed to load router" + fileName, err)
      })

    // const router = require(`./${file}`)
    // app.use(router.routes())
    // app.use(router.allowedMethods())
  })
}

export { useRoutes }
