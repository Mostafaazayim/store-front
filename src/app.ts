import express, { Request, Response } from "express";
import cors from "cors";
import bodyparser from "body-parser";

import user_routes from "./handlers/users";
import ordersRoutes from "./handlers/orders";
import productRoutes from "./handlers/products";
import order_detailsRoutes from "./handlers/orders_details";

const app: express.Application = express();
const address = "0.0.0.0:5000";

const corsOptions = {
  origin: "",
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(bodyparser.json());

app.listen(5000, () => {
  console.log(`server is run on port ${address} .....`);
});
app.get("/", (_req: Request, res: Response) => {
  res.send("well come");
});

app.get("/test-cors", cors(corsOptions), (_req: Request, res: Response) => {
  res.json({ msg: "this is cors enabled with a middle ware" });
});

user_routes(app);
ordersRoutes(app);
productRoutes(app);
order_detailsRoutes(app);

export default app;