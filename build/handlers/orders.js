"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const order_1 = require("../models/order");
const body_parser_1 = __importDefault(require("body-parser"));
const authorization_1 = __importDefault(require("../middlewares/authorization"));
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
const store = new order_1.orderStore();
const index = async (_req, res) => {
    try {
        const orders = await store.index();
        res.json(orders);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const show = async (req, res) => {
    try {
        const orders = await store.show(req.body.id);
        res.json(orders);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const create = async (req, res) => {
    const orders = {
        id: req.body.id,
        user_id: req.body.user_id,
        status_order: req.body.status_order,
    };
    try {
        const neworders = await store.create(orders);
        res.json(neworders);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const destroy = async (req, res) => {
    const deleted = await store.delete(req.body.id);
    res.json(deleted);
};
const ordersRoutes = (app) => {
    app.get("/orders", index);
    app.get("/orders/:id", authorization_1.default, show);
    app.post("/orders", authorization_1.default, create);
    app.delete("/orders", authorization_1.default, destroy);
};
exports.default = ordersRoutes;
