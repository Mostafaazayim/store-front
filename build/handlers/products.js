"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_1 = require("../models/product");
const body_parser_1 = __importDefault(require("body-parser"));
const authorization_1 = __importDefault(require("../middlewares/authorization"));
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
const store = new product_1.productStore();
const index = async (_req, res) => {
    const products = await store.index();
    res.json(products);
};
const show = async (req, res) => {
    const products = await store.show(req.body.id);
    res.json(products);
};
const create = async (req, res) => {
    const products = {
        id: req.body.id,
        product_name: req.body.product_name,
        price: req.body.price
    };
    try {
        const neworders = await store.create(products);
        res.json(neworders);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const destroy = async (req, res) => {
    try {
        const deleted = await store.delete(req.body.id);
        res.json(deleted);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const productRoutes = (app) => {
    app.get("/product", index);
    app.get("/product/:id", show);
    app.post("/product", authorization_1.default, create);
    app.delete("/product", authorization_1.default, destroy);
};
exports.default = productRoutes;
