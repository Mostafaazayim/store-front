import express, { Application, Request, Response } from "express";
import { order_details, order_detailsStore } from "../models/order_details";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());

const store = new order_detailsStore();

const index = async (_req: Request, res: Response) => {
  const details = await store.index();
  res.json(details);
};

const show = async (req: Request, res: Response) => {
  const order_details = await store.show(req.body.orderId);
  res.json(order_details);
};

const create = async (req: Request, res: Response) => {
  const order_details: order_details = {
    order_id: req.params.id as unknown as number,
    id_product_order: req.body.idPro_ord,
    quantity_product_order:parseInt (req.body.quantity)
  };
  try {
    const neworder_details = await store.create(order_details);
    res.json(neworder_details);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const destroy = async (req: Request, res: Response) => {
  const deleted = await store.delete(req.body.orderId);
  res.json(deleted);
};

const order_detailsRoutes = (app: Application) => {
  app.get("/order_details", index);
  app.get("/order_details/:id", show);
  app.post("/orders/:id/products", create);
  app.delete("/order_details", destroy);
};

export default order_detailsRoutes;
