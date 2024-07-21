import type { UserConfig } from "vite"

type Param = {
  path: string
}

export default (param: Param): UserConfig => {
  return {
    resolve: {
      extensions: ['.ts', '.tsx'],
      alias: { '@': param.path },
    }
  }
}