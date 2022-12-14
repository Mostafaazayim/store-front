import { order_detailsStore } from "../models/order_details";

const store = new order_detailsStore();

describe("order_details Model", () => {
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

  it("create method should add a order_details", async () => {
    const result = await store.create({
        order_id: 1,
        id_product_order: 2,
        quantity_product_order: 5
    });
    expect(result).toEqual({
        order_id:1,
        id_product_order: 2,
        quantity_product_order: 5
    });
  });

  it("index method should return a list of order_detailss", async () => {
    const result = await store.index();
    expect(result).not.toEqual(
    {
        order_id: 1,
        id_product_order: 2,
        quantity_product_order: 5
      }
    );
  });

  it("show method should return the correct order_details", async () => {
    const result = await store.show("1");
    expect(result).toEqual({
        order_id: 1,
        id_product_order: 2,
        quantity_product_order:5
    });
  });

});
