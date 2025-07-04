import { Schema, model, Types } from 'mongoose';

const userSchema = new Schema({
    userName: { type: String, required: true },
    email: { type: String, required: true},
    password: { type: String, required: true},
    unitOfMeasurement: { type: String, enum: ['km', 'mi'], default: 'km' },
    shoes: [{ type: Types.ObjectId, ref: 'Shoe' }],
    runs: [{ type: Types.ObjectId, ref: 'Run' }]
})

export const User = model('User', userSchema)