const logger = require("../logging/logger");
const pool = require("../../pool");
const fetchTopics = require("../utils/topics/fetchTopics");


describe('fetchTopics', () => {
    beforeEach(() => {
        // Mock logger functions
        jest.spyOn(logger, 'info').mockImplementation();
    });

    it('should fetch topics for a valid grade level', async () => {
        // Mock database query result
        const mockTopics = [{ topic_name: 'Math' }, { topic_name: 'Science' }];
        const mockGradeLevel = '5th_grade';

        // Mock pool.query to return mockTopics
        pool.query.mockResolvedValue([[...mockTopics]]);

        // Call the fetchTopics function
        const topics = await fetchTopics(mockGradeLevel);

        // Verify that logger.info is called with the expected parameters
        expect(logger.info).toHaveBeenCalledWith('fetchTopics');
        expect(logger.info).toHaveBeenCalledWith(mockGradeLevel);
        mockTopics.forEach(topic => {
            expect(logger.info).toHaveBeenCalledWith(topic.topic_name);
        });

        // Verify that the topics returned match the mockTopics
        expect(topics).toEqual(mockTopics);
    });

    it('should throw an error when grade level is missing', async () => {
        // Call the fetchTopics function without providing a grade level
        await expect(fetchTopics()).rejects.toThrow('Grade level parameter is required');

        // Verify that logger.info is called with the expected parameters
        expect(logger.info).toHaveBeenCalledWith('fetchTopics');
    });

    it('should throw an error when no topics are found', async () => {
        // Mock empty database query result
        pool.query.mockResolvedValue([[]]);

        // Call the fetchTopics function with a grade level
        await expect(fetchTopics('5th_grade')).rejects.toThrow('No topics found for the given grade level');

        // Verify that logger.info is called with the expected parameters
        expect(logger.info).toHaveBeenCalledWith('fetchTopics');
        expect(logger.info).toHaveBeenCalledWith('5th_grade');
    });
});
