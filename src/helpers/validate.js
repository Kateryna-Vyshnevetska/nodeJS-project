exports.validate = (schema, reqPart = "body") => {
  return (req, res, next) => {
    if (Object.keys(req[reqPart]).length === 0) {
      return res.status(400).send({"message": "missing fields"})
    }
    const validationResult = schema.validate(req[reqPart]);
    if (validationResult.error) {
      return res.status(400).json(validationResult.error);
    }
  next();
  }
}