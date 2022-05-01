const req = require("supertest")
const { app } = require("../../app")
const { connect, disconnect, cleanup } = require("../../database")
const {
  createUser,
  generateToken,
  createList,
} = require("../../utils/testHelpers")

describe("lists", () => {
  let token
  let user
  let list

  beforeAll(async () => {
    await connect()
  })

  beforeEach(async () => {
    await cleanup()
    const userData = { email: "test@test.com", password: "Hola1234567." }
    user = await createUser(userData)
    list = await createList({ userId: user._id })
    token = generateToken(user)
  })

  afterAll(async () => {
    await disconnect()
  })

  it("should allow lists to be displayed if I am authenticated", async () => {
    const res = await req(app)
      .get("/api/favs")
      .set("Authorization", `Bearer ${token}`)

    expect(res.statusCode).toBe(201), expect(res.body).toHaveProperty("lists")
  })

  it("should not allow lists to be displayed if I am not authenticated", async () => {
    const res = await req(app).get("/api/favs")

    expect(res.statusCode).toBe(401), expect(res).toHaveProperty("error")
  })

  it("should create list if I am authenticated", async () => {
    const list = { name: "list 1" }

    const res = await req(app)
      .post("/api/favs")
      .send(list)
      .set("Authorization", `Bearer ${token}`)

    expect(res.statusCode).toBe(201), expect(res.body).toHaveProperty("list")
  })

  it("should not create list if I am not authenticated", async () => {
    const list = { name: "list 1" }

    const res = await req(app).post("/api/favs").send(list)

    expect(res.statusCode).toBe(401), expect(res).toHaveProperty("error")
  })

  it("should not allow update if user is not owner", async () => {
    const user2 = await createUser({
      email: "test2@test.com",
      password: "Password123dvd.",
    })
    const token2 = generateToken(user2)

    const res = await req(app)
      .put(`/api/favs/${list._id}`)
      .send({ name: "new name" })
      .set("Authorization", `Bearer ${token2}`)

    expect(res.statusCode).toBe(403), expect(res).toHaveProperty("error")
  })

  it("should allow update if user is owner", async () => {
    const res = await req(app)
      .put(`/api/favs/${list._id}`)
      .send({ name: "new name" })
      .set("Authorization", `Bearer ${token}`)

    expect(res.statusCode).toBe(201)
  })

  it("should allow delete if user is owner", async () => {
    const res = await req(app)
      .delete(`/api/favs/${list._id}`)
      .set("Authorization", `Bearer ${token}`)

    expect(res.statusCode).toBe(201)
  })

  it("should not allow delete if user is not owner", async () => {
    const user2 = await createUser({
      email: "test2@test.com",
      password: "Password123dvd.",
    })
    const token2 = generateToken(user2)

    const res = await req(app)
      .delete(`/api/favs/${list._id}`)
      .set("Authorization", `Bearer ${token2}`)

    expect(res.statusCode).toBe(403)
  })
})
