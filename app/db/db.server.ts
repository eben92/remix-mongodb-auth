import { connect } from 'mongoose';

const connection: any = {};

async function dbConnect() {
  if (connection.isConnected) return;

  const db = await connect(process.env.MONGO_URI!);

  connection.isConnected = db.connections[0].readyState;
  console.log(connection.isConnected);
}

export default dbConnect;
