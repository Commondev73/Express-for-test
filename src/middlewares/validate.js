const validate = (schema, property) => {
  return (req, res, next) => {
    try {
      const { error } = schema.validate(req[property])
      if (error) {
        const { details } = error
        const message = details.map((i) => i.message).join(',')
        res.status(400).json({ statusCode: 401, error: message })
      } else {
        next()
      }
    } catch (error) {
      console.log(error)
      res.status(422).json({ statusCode: 422, error })
    }
  }
}

module.exports = {
  Validate: validate
}
