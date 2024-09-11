// import * as bodyParser from "body-parser"
import express, { Request, Response } from "express"
import { AppDataSource } from "./data-source.js"
// import { Routes } from "./routes"
import User from "./entity/User"

const app = express()
const port = 4000;

AppDataSource.initialize()
  .then(async () => {
    console.log("Data Source has been initialized!");

  })
  .catch((error) =>
    console.log("Error during Data Source initialization: ", error)
  );

app.get("/", (_: Request, res: Response) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});