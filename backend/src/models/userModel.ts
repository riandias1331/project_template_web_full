import mongoose, { Schema, Document } from "mongoose";
import bcrypt from 'bcrypt'
// import * as userController from './src/controllers/userController';


export interface IUser extends Document {
    name: string,
    email: string,
    password: string,
    createdAt: Date,
    updateAt: Date
}


const userSchema = new Schema<IUser> ({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updateAt: {
        type: Date
    }
})


// recente Mongodb (colocar apenas no model)
userSchema.pre('save', async function (next: (err?: Error) => void) {
  const user = this as IUser
  if (!user.isModified('password')) return next()

  try {
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password, salt)
    next()
  } catch (err) {
    next(err as Error)
  }
})

const User = mongoose.model<IUser>("User", userSchema)

export default User