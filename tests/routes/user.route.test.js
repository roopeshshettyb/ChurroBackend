const db = require('../db')
const jwt = require("jsonwebtoken")
var server = require('../../configs/server.config')
var config = require('../../configs/auth.config')
const request = require("supertest")
const app = require('../../server')
const User = require("../../models/user.model")

beforeAll(async () => {
    await db.connect()
    db.clearDatabase()
    await User.create({ name: "Vishwa", userId: "vish01", email: "kakvish@gmail.com", userType: "ADMIN", password: "Welcome1", userStatus: "APPROVED" });
})
afterAll(async () => {
    await db.closeDatabase();
    app.close()
})

describe("Find all users", () => {
    it('Find all users successfully', async () => {
        const token = jwt.sign({ id: 'vish01' }, config.secret, { expiresIn: 120 }) //todo change to config
        const res = await request(app).get('/crm/api/v1/user/findall').set("x-access-token", token).query()
        console.log(res.text)
        expect(res.statusCode).toEqual(200)
        expect(res.body).toEqual(expect.arrayContaining([
            expect.objectContaining({
                "name": "Vishwa",
                "userId": "vish01",
                "email": "kakvish@gmail.com",
                "userType": "ADMIN",
                "userStatus": "APPROVED"
            })
        ])

        )
    })
    it('Find one users successfully', async () => {
        const token = jwt.sign({ id: 'vish01' }, config.secret, { expiresIn: 120 }) //todo change to config
        const res = await request(app).get('/crm/api/v1/user/vish01').set("x-access-token", token)
        expect(res.statusCode).toEqual(200)
        expect(res.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    "name": "Vishwa",
                    "userId": "vish01",
                    "email": "kakvish@gmail.com",
                    "userType": "ADMIN",
                    "userStatus": "APPROVED"
                })
            ])
        )
    })

})


