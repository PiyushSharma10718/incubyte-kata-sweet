const request = require("supertest");
const app = require("../app");
describe("GET /api/sweets", () => {
  it("should return all available sweets", async () => {
    // Add two sweets first
    await request(app).post("/api/sweets").send({
      name: "Kaju Katli",
      price: 25,
      quantity: 30,
    });
    await request(app).post("/api/sweets").send({
      name: "Rasgulla",
      price: 15,
      quantity: 50,
    });
    const res = await request(app).get("/api/sweets");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThanOrEqual(2);
  });
});
