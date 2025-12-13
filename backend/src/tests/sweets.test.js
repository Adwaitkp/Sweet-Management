const request = require("supertest");
const app = require("../app");

describe("Sweets API", () => {
  it("should return list of sweets", async () => {
    const res = await request(app).get("/api/sweets");

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("should create a new sweet", async () => {
    const res = await request(app)
      .post("/api/sweets")
      .send({
        name: "Ladoo",
        category: "Indian",
        price: 10,
        quantity: 50
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("name", "Ladoo");
  });
});
