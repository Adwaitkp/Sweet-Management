jest.mock("../models/User", () => ({
  create: jest.fn(),
  findOne: jest.fn()
}));

const request = require("supertest");
const app = require("../server");
const User = require("../models/User");

describe("Auth API - Register", () => {
  it("should register a user and return 201 with token", async () => {
    User.create.mockResolvedValue({
      _id: "123",
      email: "adwait@test.com"
    });

    const res = await request(app)
      .post("/api/auth/register")
      .send({
        name: "Adwait",
        email: "adwait@test.com",
        password: "password123"
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("token");
  });
});
