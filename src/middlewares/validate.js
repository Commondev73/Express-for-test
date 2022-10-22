const validate = (schema, property) => {
  return (req, res, next) => {
    try {
      const { error } = schema.validate(req[property])
      if (error) {
        console.log('error', message)
        res.status(400).json({ statusCode: 401, error })
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
