const validate = (schema, property) => {
  return (req, res, next) => {
    try {
      const { error } = schema.validate(req[property])
      const valid = error == null
      if (valid) {
        next()
      } else {
        const { details } = error
        const message = details.map((i) => i.message).join(',')
        console.log('Error', message)
        res.status(400).json({ error: message })
      }
    } catch (error) {
      console.log(error)
      res.boom.badImplementation(error)
    }
  }
}

module.exports = {
  Validate: validate
}
