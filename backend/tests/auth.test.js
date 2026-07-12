import request from "supertest";
import app from "../src/app.js";

describe("Authentication APIs", () => {

  test("Register should fail if data is missing", async () => {

    const response = await request(app)
      .post("/api/auth/register")
      .send({});

    expect(response.statusCode).toBe(400);

  });

  test("Login should fail with invalid credentials", async () => {

    const response = await request(app)
      .post("/api/auth/login")
      .send({
        email: "wrong@test.com",
        password: "123456"
      });

    expect(response.statusCode).toBe(401);

  });

});
test("Login should succeed with valid credentials", async () => {
  const response = await request(app)
    .post("/api/auth/login")
    .send({
      email: "mohamed@test.com",
      password: "12345678",
    });

  expect(response.statusCode).toBe(200);
  expect(response.body.success).toBe(true);
  expect(response.body.token).toBeDefined();
});