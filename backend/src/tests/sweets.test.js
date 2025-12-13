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
it("should decrease sweet quantity on purchase", async () => {
  // create sweet
  const createRes = await request(app)
    .post("/api/sweets")
    .send({
      name: "Barfi",
      category: "Indian",
      price: 20,
      quantity: 5
    });

  const sweetId = createRes.body.id;

  // purchase sweet
  const purchaseRes = await request(app)
    .post(`/api/sweets/${sweetId}/purchase`);

  expect(purchaseRes.statusCode).toBe(200);

  // get sweets again
    const listRes = await request(app).get("/api/sweets");
    const updated = listRes.body.find(s => s.id === sweetId);
    expect(updated).toBeTruthy();
    expect(updated.quantity).toBe(4);
});

