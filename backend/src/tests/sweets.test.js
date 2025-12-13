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

  it("should update a sweet", async () => {
    // create
    const createRes = await request(app)
      .post("/api/sweets")
      .send({
        name: "Jalebi",
        category: "Indian",
        price: 15,
        quantity: 25
      });
    const sweetId = createRes.body.id;

    // update
    const updateRes = await request(app)
      .put(`/api/sweets/${sweetId}`)
      .send({
        price: 30,
        quantity: 40,
        name: "Jalebi Special"
      });

    expect(updateRes.statusCode).toBe(200);
    expect(updateRes.body).toMatchObject({
      id: sweetId,
      name: "Jalebi Special",
      price: 30,
      quantity: 40
    });
  });

  it("should delete a sweet", async () => {
    // create
    const createRes = await request(app)
      .post("/api/sweets")
      .send({
        name: "Rasgulla",
        category: "Indian",
        price: 12,
        quantity: 10
      });
    const sweetId = createRes.body.id;

    // delete
    const delRes = await request(app).delete(`/api/sweets/${sweetId}`);
    expect(delRes.statusCode).toBe(200);

    // verify
    const listRes = await request(app).get("/api/sweets");
    const found = listRes.body.find(s => s.id === sweetId);
    expect(found).toBeUndefined();
  });


