"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = require("../models/order");
const store = new order_1.orderStore();
describe("order Model", () => {
    it("should have an index method", () => {
        expect(store.index).toBeDefined();
    });
    it("should have a show method", () => {
        expect(store.show).toBeDefined();
    });
    it("should have a create method", () => {
        expect(store.create).toBeDefined();
    });
    it("should have a delete method", () => {
        expect(store.delete).toBeDefined();
    });
    it("create method should add a order", async () => {
        const result = await store.create({
            id: 1,
            user_id: "2",
            status_order: "active",
        });
        expect(result).toEqual({
            id: 1,
            user_id: "2",
            status_order: "active",
        });
    });
    it("index method should return a list of orders", async () => {
        const result = await store.index();
        expect(result).toEqual([
            {
                id: 1,
                user_id: "2",
                status_order: "active",
            },
        ]);
    });
    it("show method should return the correct order", async () => {
        const result = await store.show("1");
        expect(result).toEqual({
            id: 1,
            user_id: "2",
            status_order: "active",
        });
    });
    it("delete method should remove the order", async () => {
        store.delete("1");
        const result = await store.index();
        expect(result).toEqual([]);
    });
});
