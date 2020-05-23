var request = require('supertest');
describe('loading express(server started fine)', function () {
  var server;
  beforeEach(function () {
   server = require('../app',{ bustCache: true });
  });
  afterEach(function () {
    server.close();
  });
  it('responds to /', function testSlash(done) {
  request(server)
    .get('/')
     .expect(200, done);
  });

  it('responds to login page', function testPath(done) {
    request(server)
      .get('/users/login')
      .expect(200, done);
  });

  it('responds to register page', function testPath(done) {
    request(server)
      .get('/users/register')
      .expect(200, done);
  });

  it('responds to dashboard', function testPath(done) {
    request(server)
      .get('/dashboard')
      .expect(302, done);
  });

  it('responds to addreview', function testPath(done) {
    request(server)
      .get('/users/addReview')
      .expect(302, done);
  });

  it('404 everything else', function testPath(done) {
    request(server)
      .get('/foo/bar')
      .expect(404, done);
  });

});