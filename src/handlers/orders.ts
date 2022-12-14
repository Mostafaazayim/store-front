import express, { Application, Request, Response } from "express";
import { orders, orderStore } from "../models/order";
import bodyParser from "body-parser";
import authorization from "../middlewares/authorization";

const app = express();
app.use(bodyParser.json());

const store = new orderStore();

const index = async (_req: Request, res: Response) => {
  try {
    const orders = await store.index();
    res.json(orders);
  } catch (err) {
    res.status(400);
    res.json(err);
  }

};

const show = async (req: Request, res: Response) => {
 try {
  const orders = await store.show(req.body.id);
  res.json(orders);
 } catch (err) {
  res.status(400);
    res.json(err);
 }
};

const create = async (req: Request, res: Response) => {
  const orders: orders = {
    id: req.body.id,
    user_id: req.body.user_id,
    status_order: req.body.status_order,
  };
  try {
    const neworders = await store.create(orders);
    res.json(neworders);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const destroy = async (req: Request, res: Response) => {
  const deleted = await store.delete(req.body.id);
  res.json(deleted);
};

const ordersRoutes = (app: Application) => {
  app.get("/orders", index);
  app.get("/orders/:id",authorization, show);
  app.post("/orders", authorization, create);
  app.delete("/orders", authorization, destroy);
};

export default ordersRoutes;
