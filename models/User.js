import { Schema, model } from 'mongoose'

const UsersSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true

        },
        role: {
            type: String,
            enum: ['admin','user'],
            default:'user'
        },
        validated: {
            type: Boolean,
            default: false
        }
    },
    {
        collection: 'users'
    }
)

const User = model('User', UsersSchema)
export default User