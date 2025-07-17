const request = require("supertest");
const app = require("../app");

describe("DELETE /api/sweets/:id", () => {
  it("should delete a sweet by ID", async () => {
    // First, add a sweet to delete
    const addRes = await request(app).post("/api/sweets").send({
      name: "Barfi",
      price: 20,
      quantity: 50,
    });

    const sweetId = addRes.body.id;

    // Now delete it
    const deleteRes = await request(app).delete(`/api/sweets/${sweetId}`);

    expect(deleteRes.statusCode).toBe(200);
    expect(deleteRes.body).toHaveProperty("message", "Sweet deleted");
  });

  it("should return 404 for invalid sweet ID", async () => {
    const res = await request(app).delete("/api/sweets/999");
    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty("error", "Sweet not found");
  });
});
