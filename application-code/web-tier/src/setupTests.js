import '@testing-library/jest-dom/extend-expect'; // Extends Jest with additional DOM matchers
import { server } from './mocks/server'; // Import your custom test server (for mock API calls)
import { enableFetchMocks } from 'jest-fetch-mock'; // Enable mocking fetch requests

// Enable fetch mocking before running tests
enableFetchMocks();

// Set up and start the custom test server for mock API calls
beforeAll(() => server.listen());

// Clean up after each test, resetting any request handlers
afterEach(() => server.resetHandlers());

// Clean up and stop the custom test server once all tests are done
afterAll(() => server.close());
