const Joi = require('joi')

const signIn = {
  property: 'body',
  schema: Joi.object({
    userName: Joi.string().required(),
    password: Joi.string().required()
  })
}

const signUp = {
  property: 'body',
  schema: Joi.object({
    userName: Joi.string().required(),
    password: Joi.string().required(),
    photo: Joi.string(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required()
  })
}

const update = {
  property: 'body',
  schema: Joi.object({
    photo: Joi.string(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required()
  })
}

const changePassword = {
  property: 'body',
  schema: Joi.object({
    password: Joi.string().required(),
    newPassword: Joi.string().required()
  })
}

module.exports = {
  signIn,
  signUp,
  update,
  changePassword
}
