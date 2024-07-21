import type { UserConfig } from "vite"

type Param = {
  open: boolean
  path: string
}

export default (param: Param): UserConfig => {
  return {
    server: {
      open: param.open, 
      port: 3000,
      warmup: { clientFiles: [param.path] }
    }
  }
}