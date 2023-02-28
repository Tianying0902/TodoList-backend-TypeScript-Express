const app = require("../api/app");
const request = require("supertest");

describe("GET /", () => {
  test("It should response the GET method", async () => {
    const response = await request(app).get("/");
    expect(response.statusCode).toBe(200);
  });
});
describe("GET /active", () => {
  test("It should response the GET method", async () => {
    const response = await request(app).get("/active");
    expect(response.statusCode).toBe(200);
  });
});
describe("GET /completed", () => {
  test("It should response the GET method", async () => {
    const response = await request(app).get("/completed");
    expect(response.statusCode).toBe(200);
  });
});
describe("POST /", () => {
  test("It should response the POST method", async () => {
    const response = await request(app)
      .post("/")
      .send({ task: "only-test-post" });
    expect(response.statusCode).toBe(201);
  });
});

describe("DELETE /completed", () => {
  test("should respond with a 200 status code", async () => {
    const response = await request(app).delete("/completed");
    expect(response.statusCode).toBe(200);
  });
});
// describe("DELETE /:id", () => {
//   test("It should respond with a 200 status code", async () => {
//     const result = await request(app).get("/");
//     const tasks = result.body;
//     console.log(tasks);
//     const responseForId = tasks.length;
//     const targetId = tasks[responseForId - 1].id;
//    test('should first', () => {  const response = await request(app).delete(`/${targetId}`);
//    console.log(tasks);
//    expect(response.statusCode).toBe(200);})
//   });
// });
