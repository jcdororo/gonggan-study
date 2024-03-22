
import { MongoClient } from 'mongodb'
const url = `mongodb+srv://gonggan:${process.env.MONGODB_PASSWORD}@forum.llx7qqw.mongodb.net/gonggan?retryWrites=true&w=majority`

if (!url) {
  throw new Error('The MONGODB_URL environment variable is not defined')
}

let connectDB:Promise<MongoClient>


if (process.env.NODE_ENV === 'development') {
  if (!global._mongo) {
      global._mongo = new MongoClient(url).connect()
  }
  connectDB = global._mongo
} else {
  connectDB = new MongoClient(url).connect()
}
export {connectDB}