import { Snackbar } from '@varlet/ui'
import '@varlet/ui/es/snackbar/style/index'

export const initVarletUI = app => {
  app.use(Snackbar)
  return app
}
