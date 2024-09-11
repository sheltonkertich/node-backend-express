// import * as bodyParser from "body-parser"
import express, { Request, Response } from "express";
import { AppDataSource } from "./data-source.js";
// import { Routes } from "./routes"
import User from "./entity/User.js";

const app = express();
const port = 4000;

AppDataSource.initialize()
  .then(async () => {
    console.log("Data Source has been initialized!");
    //crteate new user
    const user1 = new User();
    user1.age = 20;
    user1.firstName = "john";
    user1.id = 33568888;
    user1.lastName = "dere";
    //save user to db
    await AppDataSource.manager.save(user1);
    console.log("user 1 has been saved", user1)

    //load users from db
    const users = await AppDataSource.manager.find(User);
    console.log("loaded users: ", users)
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
