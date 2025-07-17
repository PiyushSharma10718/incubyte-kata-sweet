const request = require("supertest");
const app = require("../app");

describe("GET /api/sweets/search", () => {
  beforeEach(async () => {
    // Reset sweets array before each test
    app.locals.sweets.length = 0;

    // Seed fresh data for every test
    await request(app).post("/api/sweets").send({
      name: "Gulab Jamun",
      category: "dessert",
      price: 25,
      quantity: 40,
    });

    await request(app).post("/api/sweets").send({
      name: "Soan Papdi",
      category: "dessert",
      price: 10,
      quantity: 80,
    });

    await request(app).post("/api/sweets").send({
      name: "Chocolate Barfi",
      category: "chocolate",
      price: 15,
      quantity: 60,
    });
  });

  it("should search sweets by name", async () => {
    const res = await request(app).get("/api/sweets/search?name=Gulab");
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0); // ✅ will now pass
    expect(res.body[0].name).toMatch(/Gulab/i);
  });

  it("should search sweets by category", async () => {
    await request(app).post("/api/sweets").send({
      name: "Mango Candy",
      category: "candy",
      price: 5,
      quantity: 100,
    });

    const res = await request(app).get("/api/sweets/search?category=candy");
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body[0].category).toBe("candy");
  });

  it("should search sweets within a price range", async () => {
    const res = await request(app).get("/api/sweets/search?minPrice=10&maxPrice=20");
    expect(res.statusCode).toBe(200);
    expect(res.body.every(sweet => sweet.price >= 10 && sweet.price <= 20)).toBe(true);
  });
});
