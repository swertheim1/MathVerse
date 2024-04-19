const topicsController = require('../controllers/topics');
const topicService = require('../services/topicService'); // Import topicService
const { mockRequest, mockResponse } = require('jest-mock-req-res');

describe('getTopics', () => {
    it('should return topics for a valid grade level', async () => {
        const req = mockRequest({ query: { grade_level: '5th_grade' } });
        const res = mockResponse();
        const mockTopics = [{ topic_name: 'Math' }, { topic_name: 'Science' }];

        // Mock the fetchTopics function
        jest.spyOn(topicService, 'fetchTopics').mockResolvedValue(mockTopics);

        // Call the controller function
        await topicsController.getTopics(req, res);

        // Verify that the response contains the expected topics
        expect(res.json).toHaveBeenCalledWith(mockTopics);
    });

    // Add more test cases for invalid input, error handling, etc.
});