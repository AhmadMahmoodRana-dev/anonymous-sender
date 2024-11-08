import mongoose from "mongoose";

type ConnectionObject = {
  isConnected?: number;
};

const connection: ConnectionObject = {};

const connectDb = async (): Promise<void> => {
  if (connection.isConnected) {
    console.log("Database is already connected !!");
    return;
  }

  try {
    const db = await mongoose.connect(
      `${process.env.DB_CONNECTED_URL}${process.env.DB_NAME}`
    );
    connection.isConnected = db.connections[0].readyState;
    console.log("DB CONNECTED SUCCESSFULLY!!! ��");
    console.log("DB.Connection",db.connections);
    console.log("DB",db);
    
  } catch (error) {
    console.error("Error connecting to the DB", error);
    process.exit(1);
  }
};

export default connectDb;