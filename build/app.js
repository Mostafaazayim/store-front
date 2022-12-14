"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const users_1 = __importDefault(require("./handlers/users"));
const orders_1 = __importDefault(require("./handlers/orders"));
const products_1 = __importDefault(require("./handlers/products"));
const orders_details_1 = __importDefault(require("./handlers/orders_details"));
const app = (0, express_1.default)();
const address = "0.0.0.0:5000";
const corsOptions = {
    origin: "",
    optionsSuccessStatus: 200,
};
app.use((0, cors_1.default)(corsOptions));
app.use(body_parser_1.default.json());
app.listen(5000, () => {
    console.log(`server is run on port ${address} .....`);
});
app.get("/", (_req, res) => {
    res.send("well come");
});
app.get("/test-cors", (0, cors_1.default)(corsOptions), (_req, res) => {
    res.json({ msg: "this is cors enabled with a middle ware" });
});
(0, users_1.default)(app);
(0, orders_1.default)(app);
(0, products_1.default)(app);
(0, orders_details_1.default)(app);
exports.default = app;
