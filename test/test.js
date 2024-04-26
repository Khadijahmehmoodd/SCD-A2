const runScript = require('../run');
const satellite = require('../src/satellite');
const iridium = require('../src/iridium');

jest.mock('../src/satellite');
jest.mock('../src/iridium');

describe('run.js', () => {
  describe('runScript', () => {
    afterEach(() => {
      jest.clearAllMocks(); // Reset mock state after each test
    });

    it('should run the run.js script without errors', async () => {
      // Mocking behavior of satellite.getTable and iridium.getTable
      satellite.getTable.mockResolvedValue('Satellite data fetched successfully');
      iridium.getTable.mockResolvedValue('Iridium data fetched successfully');

      await expect(runScript()).resolves.toBeUndefined();
      // Assert that the script runs without errors
    });

    it('should handle errors during execution', async () => {
      // Mocking behavior of satellite.getTable to throw an error
      satellite.getTable.mockRejectedValue(new Error('Error fetching satellite data'));

      await expect(runScript()).rejects.toThrow('Error fetching satellite data');
      // Assert that the script handles errors during execution
    });
  });
});
