const request = require("supertest");
const app = require("../app");

describe("POST /api/sweets/purchase", () => {
  let sweetId;

  beforeAll(async () => {
    // Add a sweet to purchase from
    const res = await request(app).post("/api/sweets").send({
      name: "Jalebi",
      category: "syrup",
      price: 12,
      quantity: 50,
    });

    sweetId = res.body.id; // store the ID
  });

  it("should purchase sweets and reduce stock", async () => {
    const res = await request(app).post("/api/sweets/purchase").send({
      id: sweetId,
      quantity: 10,
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Purchase successful");
    expect(res.body.updatedSweet.quantity).toBe(40); // 50 - 10
  });

  it("should return error if insufficient stock", async () => {
    const res = await request(app).post("/api/sweets/purchase").send({
      id: sweetId,
      quantity: 100, // More than available
    });

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe("Not enough stock available");
  });

  it("should return error if sweet ID is invalid", async () => {
    const res = await request(app).post("/api/sweets/purchase").send({
      id: 9999,
      quantity: 1,
    });

    expect(res.statusCode).toBe(404);
    expect(res.body.error).toBe("Sweet not found");
  });
});
