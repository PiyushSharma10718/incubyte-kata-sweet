const request = require("supertest");
const app = require("../app");

describe("POST /api/sweets", () => {
  it("should add a new sweet", async () => {
    const res = await request(app).post("/api/sweets").send({
      name: "Ladoo",
      price: 10,
      quantity: 100,
    });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("name", "Ladoo");
    expect(res.body).toHaveProperty("price", 10);
    expect(res.body).toHaveProperty("quantity", 100);
  });
});
