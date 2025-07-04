import mongoose from 'mongoose'
import 'dotenv/config'

// const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/run-tracker'
const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) {
  throw new Error('❌ Please define MONGODB_URI in your .env file')
}

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err)
    process.exit(1)
  })
