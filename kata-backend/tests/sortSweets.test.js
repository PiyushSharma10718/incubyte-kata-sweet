const request = require("supertest");
const app = require("../app");

describe("GET /api/sweets/sort", () => {
  beforeAll(async () => {
    await request(app).post("/api/sweets").send({
      name: "Peda",
      category: "milk",
      price: 30,
      quantity: 20,
    });

    await request(app).post("/api/sweets").send({
      name: "Halwa",
      category: "wheat",
      price: 20,
      quantity: 25,
    });

    await request(app).post("/api/sweets").send({
      name: "Barfi",
      category: "milk",
      price: 40,
      quantity: 30,
    });
  });

  it("should sort sweets by price ascending", async () => {
    const res = await request(app).get("/api/sweets/sort?field=price&order=asc");
    expect(res.statusCode).toBe(200);
    expect(res.body[0].price).toBeLessThanOrEqual(res.body[1].price);
  });

  it("should sort sweets by name descending", async () => {
    const res = await request(app).get("/api/sweets/sort?field=name&order=desc");
    expect(res.statusCode).toBe(200);
    expect(res.body[0].name >= res.body[1].name).toBe(true);
  });
});
