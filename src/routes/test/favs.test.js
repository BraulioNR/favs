const req = require("supertest")
const { app } = require("../../app")
const { connect, disconnect, cleanup } = require("../../database")
const {
  createUser,
  generateToken,
  createList,
  createFav,
} = require("../../utils/testHelpers")

describe("lists", () => {
  let token
  let user
  let list
  let fav

  beforeAll(async () => {
    await connect()
  })

  beforeEach(async () => {
    await cleanup()
    const userData = { email: "test@test.com", password: "Hola1234567." }
    user = await createUser(userData)
    list = await createList({ userId: user._id })
    token = generateToken(user)
    fav = await createFav({
      title: "Fav 1",
      description: "Description 1",
      link: "www.makeitreal.com",
      listId: list._id,
      userId: user._id,
    })
  })

  afterAll(async () => {
    await disconnect()
  })

  it("should not allow a fav to be created if i am not authenticated.", async () => {
    fav2 = { title: "Fav2", listId: list._id, userId: user._id }
    const res = await req(app).post("/api/itemfav/").send(fav2)
    expect(res.statusCode).toBe(401)
  })

  it("should allow a fav to be created if i am  authenticated.", async () => {
    fav2 = {
      title: "Fav2",
      description: "Example",
      link: "www.example.com",
      listId: list._id,
      userId: user._id,
    }
    const res = await req(app)
      .post("/api/itemfav/")
      .send(fav2)
      .set("Authorization", `Bearer ${token}`)
    expect(res.statusCode).toBe(201), expect(res.body).toHaveProperty("fav")
  })

  it("should not allow to get list of my favs if I am not authenticated.", async () => {
    const res = await req(app).get("/api/itemfav/")
    expect(res.statusCode).toBe(401)
  })

  it("should allow to get list of my favs if I am authenticated.", async () => {
    const res = await req(app)
      .get("/api/itemfav/")
      .set("Authorization", `Bearer ${token}`)
    expect(res.statusCode).toBe(201), expect(res.body).toHaveProperty("favs")
  })

  it("should not allow to get my fav if I am not authenticated.", async () => {
    const res = await req(app).get(`/api/itemfav/${fav._id}`)
    expect(res.statusCode).toBe(401)
  })

  it("should allow to get my fav if I am authenticated.", async () => {
    const res = await req(app)
      .get(`/api/itemfav/${fav._id}`)
      .set("Authorization", `Bearer ${token}`)
    expect(res.statusCode).toBe(201), expect(res.body).toHaveProperty("fav")
  })

  it("should not allow to delete my fav if I am not authenticated.", async () => {
    const res = await req(app).delete(`/api/itemfav/${fav._id}`)
    expect(res.statusCode).toBe(401)
  })

  it("should allow to delete my fav if I am authenticated.", async () => {
    const res = await req(app)
      .delete(`/api/itemfav/${fav._id}`)
      .set("Authorization", `Bearer ${token}`)
    expect(res.statusCode).toBe(201), expect(res.body).toHaveProperty("fav")
  })

  it("should not allow to update my fav if I am not authenticated.", async () => {
    const res = await req(app)
      .put(`/api/itemfav/${fav._id}`)
      .send({ title: "Fav Change" })
    expect(res.statusCode).toBe(401)
  })

  it("should allow to update my fav if I am authenticated.", async () => {
    const res = await req(app)
      .put(`/api/itemfav/${fav._id}`)
      .send({ title: "Fav Change" })
      .set("Authorization", `Bearer ${token}`)
    expect(res.statusCode).toBe(201), expect(res.body).toHaveProperty("fav")
  })
})
