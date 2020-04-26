'use strict';

const supergoose = require('@code-fellows/supergoose');
const server = require('../lib/server.js');

describe('the server', () => {
  let mockRequest;

  beforeEach(() => {
    mockRequest = supergoose(server);
  });

  it('handles a 404 error', () => {
    return mockRequest
      .get('/fakeroute')
      .then(results => {
        expect(results.status).toBe(404);
      });
  });
});