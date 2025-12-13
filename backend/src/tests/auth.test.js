const request = require("supertest");
const app = require("../app");

describe("Auth API - Register", () => {
  it("should register a user and return 201", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({
        name: "Adwait",
        email: "adwait@test.com",
        password: "password123"
      });

    expect(res.statusCode).toBe(201);
  });
});