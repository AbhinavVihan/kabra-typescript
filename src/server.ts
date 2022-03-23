import mongoose from "mongoose";
import dotenv from "dotenv";

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! SHUTTING DOWN");
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: "../config.env" });

import app from "./app";

// const DB = process.env.DATABASE!.replace(
//   "<PASSWORD>",
//   process.env.DATABASE_PASSWORD!
// );

console.log(process.env.DATABASE);

mongoose
  .connect(
    "mongodb+srv://Abhik0:nBCaCav2Jv86SVs2@cluster0.iiq9t.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("database connection successfull");
  })
  .catch((e) => {
    console.log(e);
  });

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`app running on port ${port}`);
});

process.on("unhandledRejection", (err: any) => {
  console.log("UNGANDLED REJECTION! SHUTTING DOWN");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
