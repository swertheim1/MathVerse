describe("Addition of numbers",  () => {
    test("1 plus 1 should be equal to 2", () => {
        let a = 1;
        let b = 1; 
        expect(a + b).toBe(2);
    });
    
    test("1 plus 5 should be equal to 6", () => {
        let a = 1;
        let b = 5; 
        expect(a + b).toBe(6);
    });
    
    test("5 plus 6 should not be equal to 11", () => {
        let a = 6;
        let b = 5; 
        expect(a + b).toBe(11);
    });
})


describe("Testing other matchers", () => {
    // test for undefined
    test("testing a variable is undefined", () => {
        let number = undefined;
        expect(number).not.toBeDefined();
        expect(number).toBeUndefined();
        expect(number).not.toBeNull();
        expect(number).toBeFalsy();
        expect(number).not.toBeTruthy();
    })

    it("should expect 0 to act like 0", () => {
        let number = 0;
        expect(number).toBeDefined();
        expect(number).not.toBeUndefined();
        expect(number).not.toBeNull();
        expect(number).toBeFalsy();
        expect(number).not.toBeTruthy();
    })

    test("Number Comparison", () => {
        const a = 1;
        const b = 2;
        expect(a + b).toBeGreaterThan(2);
        expect(a + b).toBeGreaterThanOrEqual(3);
        expect(a + b).toBeLessThan(4);
        expect(a + b).toBeLessThanOrEqual(3);
    })

    test("that there should be no I or i in team", () => {
        let string = 'team';
        expect(string).not.toMatch(/I/i);   // cases insensitive
    })

    test("there is stop in Christopher", () => {
        let string = 'ChristoPher';
        expect(string).toMatch(/stop/i);   // cases insensitive
    })

    const shoppingList = ['Milk', 'Trash Bags', 'Toilet Paper', 'iPhones'];
        test("the shopping list does not have PS4", () => {
            expect(shoppingList).not.toContain('PS4');
            expect(shoppingList).toContain('Milk');
        })
})

describe("Testing Reference Equality", () => {
    const user = { 
        name: "Susan"
    }
    user['age'] = 45;
    test("should return a user object with age as 45", () => {
        expect(user).toEqual({
            name: "Susan",
            age: 45
        })
    })

    test("should return a user with a name and age key", () => {
        expect(user).toEqual(
            expect.objectContaining({
                name: expect.any(String),
                age: expect.any(Number)
            })
        )
    })


})

