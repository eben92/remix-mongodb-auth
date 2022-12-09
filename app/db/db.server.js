// import { connect } from 'mongoose';

// const connection: any = {};

// // dbConnect();
// async function dbConnect() {
//   if (connection.isConnected) return;

//   const db = await connect(process.env.MONGO_URI!);

//   connection.isConnected = db.connections[0].readyState;
//   console.log(connection.isConnected);
// }

// export default dbConnect;

import mongoose from 'mongoose';

let db;

connect();

async function connect() {
  console.log('dcd');
  if (db) return db;

  if (process.env.NODE_ENV === 'production') {
    db = mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true
    });
  } else {
    // in development, need to store the db connection in a global variable
    // this is because the dev server purges the require cache on every request
    // and will cause multiple connections to be made
    if (!global.__db) {
      global.__db = mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true
      });
    }
    db = global.__db;

    console.log('dcd');
  }

  console.log(db, 'sdqw');
  return db;
}

export { mongoose, connect };
