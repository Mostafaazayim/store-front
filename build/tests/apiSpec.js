"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app"));
describe("Test endpoint responses", () => {
    describe("Test endpoint app", () => {
        it("gets the api endpoint", async () => {
            const response = await (0, supertest_1.default)(app_1.default).get("/");
            expect(response.status).toBe(200);
        });
    });
    describe("Test endpoint orders", () => {
        it("gets the api endpoint /orders", async () => {
            const response = await (0, supertest_1.default)(app_1.default).get("/orders");
            expect(response.status).toBe(200);
        });
        it("gets the api endpoint /orders/:id", async () => {
            const response = await (0, supertest_1.default)(app_1.default).get("/orders/:id");
            expect(response.status).toBe(401);
        });
        it("posts the api endpoint /orders", async () => {
            const response = await (0, supertest_1.default)(app_1.default).post("/orders");
            expect(response.status).toBe(401);
        });
        it("deletes the api endpoint /orders", async () => {
            const response = await (0, supertest_1.default)(app_1.default).delete("/orders");
            expect(response.status).toBe(401);
        });
    });
    describe("Test endpoint product", () => {
        it("gets the api endpoint /product", async () => {
            const response = await (0, supertest_1.default)(app_1.default).get("/product");
            expect(response.status).toBe(200);
        });
        it("gets the api endpoint /product/:id", async () => {
            const response = await (0, supertest_1.default)(app_1.default).get("/product/:id");
            expect(response.status).toBe(200);
        });
        it("posts the api endpoint /product", async () => {
            const response = await (0, supertest_1.default)(app_1.default).post("/product");
            expect(response.status).toBe(401);
        });
        it("deletes the api endpoint /product", async () => {
            const response = await (0, supertest_1.default)(app_1.default).delete("/product");
            expect(response.status).toBe(401);
        });
    });
    describe("Test endpoint users", () => {
        it("gets the api endpoint /users", async () => {
            const response = await (0, supertest_1.default)(app_1.default).get("/users");
            expect(response.status).toBe(401);
        });
        it("gets the api endpoint /users/:id", async () => {
            const response = await (0, supertest_1.default)(app_1.default).get("/users/:id");
            expect(response.status).toBe(401);
        });
        it("posts the api endpoint /users", async () => {
            const response = await (0, supertest_1.default)(app_1.default).post("/users");
            expect(response.status).toBe(400);
        });
        it("deletes the api endpoint /users", async () => {
            const response = await (0, supertest_1.default)(app_1.default).delete("/users");
            expect(response.status).toBe(401);
        });
        it("posts the api endpoint /users/authen", async () => {
            const response = await (0, supertest_1.default)(app_1.default).post("/users/authen");
            expect(response.status).toBe(401);
        });
    });
});
