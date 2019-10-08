const assert = require('chai').assert;
const createRequest = require('../index.js').createRequest;

describe('createRequest', () => {
  const jobID = "278c97ffadb54a5bbb93cfec5f7b5503";

  context('with expected input', () => {
    const req = {
      id: jobID,
      endpoint: "price",
      fsym: "ETH",
      tsyms: "USD"
    };

    it('returns data to the node', (done) => {
      createRequest(req, (statusCode, data) => {
        assert.equal(statusCode, 200);
        assert.equal(data.jobRunID, jobID);
        assert.isNotEmpty(data.data);
        done();
      });
    });
  });

  context('with bad imput', () => {
    const badReq = {
      id: jobID,
      endpoint: "price",
      fsym: "INVALID",
      tsyms: "INVALID"
    };

    it('returns an error', (done) => {
      createRequest(badReq, (statusCode, data) => {
        assert.equal(statusCode, 200);
        assert.equal(data.jobRunID, jobID);
        assert.equal(data.status, "errored");
        done();
      });
    });
  });
});
