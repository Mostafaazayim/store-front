"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = require("../models/user");
const body_parser_1 = __importDefault(require("body-parser"));
const authorization_1 = __importDefault(require("../middlewares/authorization"));
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
const store = new user_1.userStore();
const index = async (_req, res) => {
    const users = await store.index();
    res.json(users);
};
const create = async (req, res) => {
    const users = {
        username: req.body.username,
        password_digest: req.body.password,
    };
    if (users.username &&
        typeof users.username == "string" &&
        users.password_digest &&
        typeof users.password_digest == "string") {
        const newuser = await store.create(users);
        const token = jsonwebtoken_1.default.sign({ users: newuser }, process.env.TOKEN_SECRET);
        try {
            res.json(token);
        }
        catch (err) {
            res.status(400);
            res.json(err);
        }
    }
    else {
        res.sendStatus(400);
    }
};
const login = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    if (username &&
        typeof username == "string" &&
        password &&
        typeof password == "string") {
        try {
            const user = await store.authenticate(username, password);
            if (user) {
                res.json(user);
            }
            else {
                res.sendStatus(401);
            }
        }
        catch (err) {
            res.status(500);
            res.json(err);
        }
    }
    else {
        res.sendStatus(400);
    }
};
const show = async (req, res) => {
    const user = await store.show(req.body.id);
    res.json(user);
};
const destroy = async (req, res) => {
    const deleted = await store.delete(req.body.id);
    res.json(deleted);
};
const user_routes = (app) => {
    app.get("/users", authorization_1.default, index);
    app.get("/users/:id", authorization_1.default, show);
    app.post("/users", create);
    app.post("/users/authen", authorization_1.default, login);
    app.delete("/users", authorization_1.default, destroy);
};
exports.default = user_routes;
