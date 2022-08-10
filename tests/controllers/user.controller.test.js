const { mockReq, mockRes } = require("../interceptor")
const User = require('../../models/user.model')
const { findAll, update } = require('../../controllers/user.controller')
const userTestPayLoad = {
    name: "Tester",
    userId: "Tester01",
    email: "tester01@gmail.com",
    userType: "CUSTOMER",
    userStatus: "APPROVED",
    createdTickets: [],
    assignedTickets: [],
    save: jest.fn(() => { return updatedUserTestPayLoad })
}
const updatedUserTestPayLoad = {
    name: "Updated Tester",
    userId: "Tester01",
    email: "tester01@gmail.com",
    userType: "CUSTOMER",
    userStatus: "APPROVED",
    createdTickets: [],
    assignedTickets: [],
    // exec: jest.fn()
}

describe("findAll method", () => {
    it("Query Param Absent", async () => {
        const req = mockReq()
        const res = mockRes()
        req.query = {}
        const userSpy = jest.spyOn(User, 'find').mockReturnValue(Promise.resolve([userTestPayLoad]))
        await findAll(req, res);
        expect(userSpy).toHaveBeenCalled
        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).toHaveBeenCalled
        expect(res.json).toHaveBeenCalledWith(expect.arrayContaining([expect.objectContaining({ name: "Tester" })]))

    })
    it("Query Param Present", async () => {
        const req = mockReq()
        const res = mockRes()
        req.query = { userStatus: "APPROVED" }
        const userSpy = jest.spyOn(User, 'find').mockReturnValue(Promise.resolve([userTestPayLoad]))
        await findAll(req, res);
        expect(userSpy).toHaveBeenCalled
        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).toHaveBeenCalled
        expect(res.json).toHaveBeenCalledWith(expect.arrayContaining([expect.objectContaining({ name: "Tester" })]))

    })
    it("Error while executing", async () => {
        const req = mockReq()
        const res = mockRes()
        req.query = { userStatus: "APPROVED" }
        const userSpy = jest.spyOn(User, 'find').mockReturnValue(Promise.reject(new Error("error")))
        await findAll(req, res);
        expect(userSpy).toHaveBeenCalled
        expect(res.status).toHaveBeenCalledWith(500)
        expect(res.send).toHaveBeenCalledWith({ message: "Internal server error" })

    })
})

describe("update method", () => {
    it("user id present", async () => {
        const req = mockReq()
        const res = mockRes()
        req.params.id = "Tester01"
        req.body.name = "Updated Tester"
        const userSpy = jest.spyOn(User, 'findOne').mockReturnValue(Promise.resolve([userTestPayLoad]))
        const userSpy2 = jest.spyOn(userSpy, 'save').mockReturnValue(Promise.resolve([updatedUserTestPayLoad]))
        await update(req, res);
        expect(userSpy).toHaveBeenCalled
        expect(userSpy2).toHaveBeenCalled
        expect(res.status).toHaveBeenCalledWith(500)
        expect(res.json).toHaveBeenCalled
        expect(res.send).toHaveBeenCalledWith(expect.arrayContaining([expect.objectContaining({ name: "Tester" })]))

    })
    // it("Query Param Present", async () => {
    //     const req = mockReq()
    //     const res = mockRes()
    //     req.query = { userStatus: "APPROVED" }
    //     const userSpy = jest.spyOn(User, 'find').mockReturnValue(Promise.resolve([userTestPayLoad]))
    //     await findAll(req, res);
    //     expect(userSpy).toHaveBeenCalled
    //     expect(res.status).toHaveBeenCalledWith(200)
    //     expect(res.json).toHaveBeenCalled
    //     expect(res.json).toHaveBeenCalledWith(expect.arrayContaining([expect.objectContaining({ name: "Tester" })]))

    // })
    // it("Error while executing", async () => {
    //     const req = mockReq()
    //     const res = mockRes()
    //     req.query = { userStatus: "APPROVED" }
    //     const userSpy = jest.spyOn(User, 'find').mockReturnValue(Promise.reject(new Error("error")))
    //     await findAll(req, res);
    //     expect(userSpy).toHaveBeenCalled
    //     expect(res.status).toHaveBeenCalledWith(500)
    //     expect(res.send).toHaveBeenCalledWith({ message: "Internal server error" })

    // })
})