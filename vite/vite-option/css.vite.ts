import type { UserConfig } from "vite";

import os from 'node:os'

export default (): UserConfig => {
  const cpus = os.cpus().length

  return {
    css: {
      transformer: 'postcss',
      preprocessorMaxWorkers: cpus
    }
  }
}