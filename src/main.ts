import app from "./app"
import "./app/database"

import config from "./app/config"

app.listen(config.APP_PORT, () => {
  console.log(`serve started at ${config.APP_PORT} successfully!`)
})
