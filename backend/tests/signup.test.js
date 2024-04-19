const userController = require('./userController');

describe('User Controller', () => {
  describe('signup', () => {
    it('should return 201 and success message when user is successfully registered', async () => {
      const req = {
        body: {
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@example.com',
          password: 'password123',
          age: 25,
          gradeLevel: 'Grade 10',
          role: 'student',
          status: true
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
      
      await userController.signup(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ message: "User registered!" });
    });

    // Add more test cases for error scenarios
  });

  describe('login', () => {
    it('should return 200 with JWT token when login is successful', async () => {
      const req = {
        body: {
          email: 'john.doe@example.com',
          password: 'password123'
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        header: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await userController.login(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ message: "Authorization successful", token: expect.any(String) }));
    });

    // Add more test cases for error scenarios
  });
});
