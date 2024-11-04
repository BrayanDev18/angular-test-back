import mongoose from "mongoose"

export const connectionDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL_DATABASE)

    console.log('MongoDB connected in', conn.connection.host);
  } catch (error) {
    console.log('Error connecting to mongoDB', error.message);
    process.exit(1)
  }
}