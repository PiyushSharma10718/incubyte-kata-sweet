const request = require("supertest");
const app = require("../app");

describe("POST /api/sweets/restock", () => {
  let sweetId;

  beforeAll(async () => {
    // Add a sweet to restock
    const res = await request(app).post("/api/sweets").send({
      name: "Kaju Katli",
      category: "cashew",
      price: 50,
      quantity: 20,
    });

    sweetId = res.body.id; // store the ID
  });

  it("should restock sweets and increase stock", async () => {
    const res = await request(app).post("/api/sweets/restock").send({
      id: sweetId,
      quantity: 15,
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Restock successful");
    expect(res.body.updatedSweet.quantity).toBe(35); // 20 + 15
  });

  it("should return error if sweet not found", async () => {
    const res = await request(app).post("/api/sweets/restock").send({
      id: 9999,
      quantity: 10,
    });

    expect(res.statusCode).toBe(404);
    expect(res.body.error).toBe("Sweet not found");
  });

  it("should return error if quantity is invalid", async () => {
    const res = await request(app).post("/api/sweets/restock").send({
      id: sweetId,
      quantity: -5,
    });

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe("Invalid restock quantity");
  });
});
