import express, { Application, Request, Response } from "express";
import { product, productStore } from "../models/product";
import bodyParser from "body-parser";
import authorization from "../middlewares/authorization";

const app = express();
app.use(bodyParser.json());

const store = new productStore();

const index = async (_req: Request, res: Response) => {
  const products = await store.index();
  res.json(products);
};

const show = async (req: Request, res: Response) => {
  const products = await store.show(req.body.id);
  res.json(products);
};

const create = async (req: Request, res: Response) => {
  const products: product = {
    id: req.body.id,
    product_name: req.body.product_name,
    price: req.body.price
  };
  try {
    const neworders = await store.create(products);
    res.json(neworders);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const destroy = async (req: Request, res: Response) => {
  try {
    const deleted = await store.delete(req.body.id);
    res.json(deleted);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const productRoutes = (app: Application) => {
  app.get("/product", index);
  app.get("/product/:id", show);
  app.post("/product", authorization, create);
  app.delete("/product", authorization, destroy);
};

export default productRoutes;
