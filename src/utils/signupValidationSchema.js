const zod = require("zod");

const signupValidationSchema = zod.object({
  body: zod
    .object({
      email: zod.string().email(),
      password: zod
        .string()
        .min(8, { message: "Password must be at least 8 characters long" })
        .regex(/[A-Z]/, {
          message: "Password must contain at least one uppercase letter",
        })
        .regex(/\d/, { message: "Password must contain at least one number" }),
    })
    .strict(),
});
module.exports = signupValidationSchema;