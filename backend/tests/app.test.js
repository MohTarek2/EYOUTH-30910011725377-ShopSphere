import request from "supertest";
import app from "../src/app.js";

describe("Application", () => {
  test("Home route", async () => {
    const response = await request(app).get("/");

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("API Running");
  });
});