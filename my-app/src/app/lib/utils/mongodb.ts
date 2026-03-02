// import mongoose from "mongoose";

// const MONGODB_URI = process.env.MONGODB_URL;

// if (!MONGODB_URI) {
//   throw new Error(
//     "Please define the MONGODB_URL environment variable inside .env.local"
//   );
// }

// declare global {
//   var mongoose:
//     | {
//         conn: typeof mongoose | null;
//         promise: Promise<typeof mongoose> | null;
//       }
//     | undefined;
// }

// let cached = global.mongoose;

// if (!cached) {
//   cached = global.mongoose = { conn: null, promise: null };
// }

// async function connectDB() {
//   if (cached!.conn) {
//     return cached!.conn;
//   }

//   if (!cached!.promise) {
//     const opts = {
//       bufferCommands: false,
//     };

//     // @ts-ignore - Type issue with mongoose connection caching
//     cached!.promise = mongoose.connect(MONGODB_URI!, opts);
//   }

//   try {
//     const mongooseInstance = await cached!.promise;
//     cached!.conn = mongooseInstance;
//     return mongooseInstance;
//   } catch (e) {
//     cached!.promise = null;
//     throw e;
//   }
// }

// export default connectDB;
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URL;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URL environment variable inside .env.local",
  );
}

type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

declare global {
  // eslint-disable-next-line no-var
  var mongoose: MongooseCache | undefined;
}

const cached: MongooseCache =
  global.mongoose ?? (global.mongoose = { conn: null, promise: null });

async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    const opts: mongoose.ConnectOptions = { bufferCommands: false };
    cached.promise = mongoose.connect(MONGODB_URI!, opts); // ✅ энд
  }

  try {
    const mongooseInstance = await cached.promise;
    cached.conn = mongooseInstance;
    return mongooseInstance;
  } catch (e) {
    cached.promise = null;
    throw e;
  }
}

export default connectDB;
