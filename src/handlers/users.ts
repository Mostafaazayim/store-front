import express, { Application, Request, Response } from "express";
import jwt, { Secret } from "jsonwebtoken";
import { user, userStore } from "../models/user";
import bodyParser from "body-parser";
import authorization from "../middlewares/authorization";

const app = express();
app.use(bodyParser.json());
const store = new userStore();

const index = async (_req: Request, res: Response) => {
  const users = await store.index();
  res.json(users);
};
const create = async (req: Request, res: Response) => {
  const users: user = {
    username: req.body.username,
    password_digest: req.body.password,
  };

  if(
    users.username &&
    typeof users.username == "string" &&
    users.password_digest &&
    typeof users.password_digest == "string"
  ) {
    
      const newuser = await store.create(users);
      const token = jwt.sign(
        { users: newuser },
        process.env.TOKEN_SECRET as Secret
      );
    try {
      
      res.json(token);
      
    } catch (err) {
      res.status(400);
      res.json(err);
    }
  } else {
    res.sendStatus(400);
  }
};
const login = async (req: Request, res: Response) => {
  const username = req.body.username;
  const password = req.body.password;
  if (
    username &&
    typeof username == "string" &&
    password &&
    typeof password == "string"
  ) {
    try {
      const user = await store.authenticate(username, password);
      if (user) {
        res.json(user);
      } else {
        res.sendStatus(401);
      }
    } catch (err) {
      res.status(500);
      res.json(err);
    }
  } else {
    res.sendStatus(400);
  }
};
const show = async (req: Request, res: Response) => {
  const user = await store.show(req.body.id);
  res.json(user);
};
const destroy = async (req: Request, res: Response) => {
  const deleted = await store.delete(req.body.id);
  res.json(deleted);
};

const user_routes = (app: Application) => {
  app.get("/users", authorization, index);
  app.get("/users/:id", authorization, show);
  app.post("/users", create);
  app.post("/users/authen", authorization,login);
  app.delete("/users", authorization, destroy);
};

export default user_routes;
