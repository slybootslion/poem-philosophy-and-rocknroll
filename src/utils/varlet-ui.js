import { Snackbar, Dialog } from '@varlet/ui'
import '@varlet/ui/es/snackbar/style/index'
import '@varlet/ui/es/dialog/style/index'

export const initVarletUI = app => {
  app.use(Snackbar)
  app.use(Dialog)
  return app
}
