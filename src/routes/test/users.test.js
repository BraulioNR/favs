const req = require("supertest")
const { app } = require("../../app")
const { connect, disconnect, cleanup } = require("../../database")
const { createUser } = require("../../utils/testHelpers")

describe("user", () => {
  beforeAll(async () => {
    await connect()
  })

  beforeEach(async () => {
    await cleanup()
  })

  afterAll(async () => {
    await disconnect()
  })
  it("should register user correctly", async () => {
    const res = await req(app)
      .post("/auth/local/signup")
      .send({ email: "test1@test.com", password: "Hola123456." })
    expect(res.statusCode).toBe(201), expect(res.body).toHaveProperty("token")
  })

  it.each([
    { email: "test@test.com", password: "hola1234567." },
    { email: "test1@test.com", password: "Hola12345" },
    { email: "test2@test.com", password: "Hola12." },
    { email: "test3@test.com", password: "Holaryqruqw." },
    { email: "test4@test.com", password: "HOLA1234567." },
    { email: "test5@test.com", password: "78451234567." },
  ])(
    "should run user validations of passwords",
    async ({ email, password }) => {
      const res = await req(app)
        .post("/auth/local/signup")
        .send({ email, password })
      expect(res.statusCode).toBe(400)
    }
  )

  it.each([
    { email: "testtest.com", password: "Hola1234567." },
    { email: "test1@testcom", password: "Hola1234567." },
    { email: "@testcom", password: "Hola1234567." },
    { email: "", password: "Hola1234567." },
  ])("should run user validations of emails", async ({ email, password }) => {
    const res = await req(app)
      .post("/auth/local/signup")
      .send({ email, password })
    expect(res.statusCode).toBe(400)
    expect(res.body).toHaveProperty("error")
  })

  it("should login user correctly", async () => {
    const user = { email: "test@test.com", password: "Hola12345." }

    await createUser(user)

    const res = await req(app).post("/auth/local/login").send(user)

    expect(res.statusCode).toBe(201)
    expect(res.body).toHaveProperty("token")
  })
})
