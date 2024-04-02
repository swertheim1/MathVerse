import supertest from "supertest";

describe("user", ()=> {
    describe("get user list route", () => {

        describe("give there are no users", () => {
            it('should return a 400', async () => {
                const user = 'john' 
                // expect(true).toBe(true);
                await supertest().get(`getStudents/`);
                expect(404);
            })
        })
        
    })
})




