const app = require('../server.js');
const request = require("supertest");
const mongoose = require('mongoose');
const Animal = require('../models/animalModel');

// Creating test animal
const testAnimal = {
    ID_senasa: "abcdefgh12345678",
    type: "Vaquillona",
    weight: 300,
    paddock_name: "Barbara Borini",
    device_type: "Collar",
    device_num: "12345678",
};

beforeEach(async () => {
    await Animal.deleteMany(); // This line deletes preloaded animals.
    await new Animal(testAnimal).save();
});

// Closing database conncetion to exit jest:
afterAll(async () => {
    await mongoose.connection.close();
});
  
// The variable animalTestId will save the id of an animal for testing. 
// This animal will be deleted as part of the test:
let animalTestId = ''

// TEST Get animals Info:
describe('GET /animals', () => {
    test("should respond with a 200 status code", async () => {
        const response = await request(app).get("/animals").send()
        expect(response.statusCode).toBe(200)
        animalTestId = response._body[0]._id // Here we save the Id of the first animal.
        console.log(animalTestId)
    });
})

// TEST add new Animnal:
describe('POST /animals/add', () => {
    test("should respond with a 200 status code", async () => {
        const response = await request(app).post('/animals/add')
        .send({
            ID_senasa: "novillo123456789",
            type: "Novillo",
            weight: 550,
            paddock_name: "Barbara Borini",
            device_type: "Collar",
            device_num: "12345679",
        })
        expect(response.statusCode).toBe(200);
    });
})

// TEST get animal info by ID:
describe('GET /animals/info', () => {
    test("should respond with a 200 status code", async () => {
        const response = await request(app).get(`/animals/info/${animalTestId}`).send()
        expect(response.statusCode).toBe(200);
        console.log(response._body)
    });
})

// TEST update Animnal:
describe('PATCH /animals/update', () => {
test("should respond with a 200 status code", async () => {
        const response = await request(app).patch(`/animals/update/${animalTestId}`)
        .send({ type: "Toro" })
        expect(response.statusCode).toBe(200);
        console.log(response._body)
    });
})

// TEST delete Animnal:
describe('DELETE /animals/delete', () => {
    test("should respond with a 200 status code", async () => {
        const response = await request(app).delete(`/animals/delete/${animalTestId}`)
        .send()
        expect(response.statusCode).toBe(200);
        console.log(response._body)
    });
})

// TEST adding an aninmal with invalid data:
describe('POST /animals/add invalid data', () => {
    test("should respond with a 400 status code", async () => {
    const response = await request(app).post('/animals/add')
        .send({
            ID_senasa: "not16chars",
            type: "Vaquillona",
            weight: "String instead of number",
            paddock_name: "Barbara Borini",
            device_type: "Collar",
            device_num: "not8chars",
        })
        expect(response.statusCode).toBe(400);
    });
})
