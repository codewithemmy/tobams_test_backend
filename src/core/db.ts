import mongoose from "mongoose";

const connectToDatabase = async () => {
  mongoose.set("strictQuery", false);

  mongoose.connect(`${process.env.MONGO_URL!}`);

  const conn = mongoose.connection.on("connected", () => {
    console.log("Database Connected");
  });

  return { conn };
};

export default connectToDatabase;
