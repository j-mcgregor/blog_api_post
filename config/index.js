import dotenv from 'dotenv';

dotenv.config();

export default {
  uri: process.env.MONGO_URI,
  mongoDb: process.env.MONGO_DB,
  pass: process.env.MONGO_PASSWORD,
  mongoPort: process.env.MONGO_PORT,
  user: process.env.MONGO_USERNAME,
  port: parseInt(process.env.PORT, 10),
  secret: process.env.SECRET,
  sessionSecret: process.env.SESSION_SECRET
}
