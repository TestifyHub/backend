const { z } = require("zod");
const validateSchema = (schema) => async (req, res, next) => {
  try {
    await schema.parseAsync({
      body: req.body,
    });
    next();
  } catch (err) {
    if (err instanceof z.ZodError) {
      // Extract the error messages from Zod
      const errors = err.errors.reduce((acc, error) => {
        if (error.message) {
          acc[error.path[0]] = error.message; // Map error message to field
        }
        return acc;
      }, {});

      return res.status(400).json({
        message: errors.body,
      });
    } else {
      res.status(400).json({
        message: "An unexpected error occurred",
      });
    }
  }
};
module.exports = { validateSchema };
