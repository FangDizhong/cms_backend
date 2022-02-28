# CMS_backend

init project

```
npm init -y
```

1. install koa

```
npm install koa
npm install nodemon -D
npm install prettier --save-dev
npm install dotenv
```

2. ts

```
npm install typescript ts-node --save-d
npx tsc --init
npm install @types/node @types/koa --save-d
npm install cross-env --save
```

3. koa-plugin

```
pnpm install koa-router
pnpm i --save-dev @types/koa-router
pnpm install koa-bodyparser
pnpm i --save-dev @types/koa-bodyparser
pnpm install mysql2
```

4. husky

```
pnpx husky-init && pnpm install
```

```..husky\pre-commit
# 提交前执行prettier
npm run prettier
```

5. commitizen

```
pnpm install commitizen -D
pnpx commitizen init cz-conventional-changelog --save-dev --save-exact
```

```package.json
 "scripts": {
   //...
    "commit": "cz"
},
```

6. commitlint

```
pnpm i @commitlint/config-conventional @commitlint/cli -D
```

```commitlint.config.js
// 用于拦截不规范的git commit -m "<不规范message>"
module.exports = {
  extends: ["@commitlint/config-conventional"]
}
```

```..husky\commit-msg
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

# 用于拦截不规范的git commit -m "<不规范message>"
npx --no-install commitlint --edit
```

7. Koa-plugin

```
pnpm install jsonwebtoken
pnpm i -D @types/jsonwebtoken
```
