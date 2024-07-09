import { Schema, model } from 'mongoose'

const userCommentsSchema = new Schema(
   {
    text: {
        type: String,
        required: true
    },
    valutation: {
        type: Number,
        required: true
    }
   },
   {
    collection:'UserComments'
   }
)

export default model('UserComments', userCommentsSchema)