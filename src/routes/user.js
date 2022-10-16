const Controller = require('../contorllers/user')
const { Auth, Validate } = require('../middlewares')
const { signIn, signUp, update, changePassword } = require('../validations/user')

module.exports = (app) => {
  app.post('/api/auth/sign-in', Validate(signIn.schema, signIn.property), Controller.signIn)

  app.post('/api/auth/sign-up', Validate(signUp.schema, signUp.property), Controller.signUp)

  app.post('/api/auth/refresh-token', Controller.refreshToken)

  // Auth
  app.get('/api/auth/profile', Auth, Controller.getProfile)

  app.post('/api/auth/update-profile', Auth, Validate(update.schema, update.property), Controller.updateProfile)

  app.post(
    '/api/auth/change-password',
    Auth,
    Validate(changePassword.schema, changePassword.property),
    Controller.changePassword
  )
}
