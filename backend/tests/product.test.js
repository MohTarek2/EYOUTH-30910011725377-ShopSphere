import request from "supertest";
import app from "../src/app.js";

describe("Products API", () => {

  test("Get all products", async () => {

    const response = await request(app)
      .get("/api/products");

    expect(response.statusCode).toBe(200);

  });

});
test("Get product that does not exist", async () => {
  const response = await request(app)
    .get("/api/products/999999");

  expect(response.statusCode).toBe(404);
});