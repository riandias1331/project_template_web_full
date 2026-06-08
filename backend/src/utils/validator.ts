import { Request, Response, NextFunction } from 'express'
import Joi from 'joi'

const userSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
})

const validateUser = (req: Request, res: Response, next: NextFunction): void => {
  const { error } = userSchema.validate(req.body)
  if (error) {
    res.status(400).json({
      status: 400,
      message: error.details[0].message
    })
    return
  }
  next()
}

export default validateUser