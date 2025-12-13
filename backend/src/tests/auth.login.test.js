jest.mock("../models/User", () => ({
  findOne: jest.fn()
}));

const request = require("supertest");
const app = require("../server");
const bcrypt = require("bcrypt");
const User = require("../models/User");

describe("Auth API - Login", () => {
  it("should login user and return token", async () => {
    const passwordHash = await bcrypt.hash("password123", 10);
    User.findOne.mockResolvedValue({
      _id: "123",
      email: "adwait@test.com",
      password: passwordHash,
      passwordHash
    });

    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: "adwait@test.com",
        password: "password123"
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
  });
});
