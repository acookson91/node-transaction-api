var request = require("request");

var base_url = "http://localhost:8080/api";


describe("Hello World Server", function() {
  describe("GET /", function() {
    it("returns status code 200", function(done) {
      request.get(base_url, function(error, response, body) {
        expect(response.statusCode).toBe(200);
        done();
      });
    });

    it("returns message", function(done){
      request.get(base_url, function(error, response,body){
        expect(body).toBe('{"message":"well done"}');
        done();
      });
    });
  });
});
