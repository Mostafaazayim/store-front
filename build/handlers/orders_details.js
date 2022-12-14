"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const order_details_1 = require("../models/order_details");
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
const store = new order_details_1.order_detailsStore();
const index = async (_req, res) => {
    const details = await store.index();
    res.json(details);
};
const show = async (req, res) => {
    const order_details = await store.show(req.body.orderId);
    res.json(order_details);
};
const create = async (req, res) => {
    const order_details = {
        order_id: req.params.id,
        id_product_order: req.body.idPro_ord,
        quantity_product_order: parseInt(req.body.quantity)
    };
    try {
        const neworder_details = await store.create(order_details);
        res.json(neworder_details);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const destroy = async (req, res) => {
    const deleted = await store.delete(req.body.orderId);
    res.json(deleted);
};
const order_detailsRoutes = (app) => {
    app.get("/order_details", index);
    app.get("/order_details/:id", show);
    app.post("/orders/:id/products", create);
    app.delete("/order_details", destroy);
};
exports.default = order_detailsRoutes;
