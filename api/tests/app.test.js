const request = require('supertest');
const app = require('../src/app');

it('should reply the GET method on /diets with status code 200', async () => {
  const res = await request(app).get('/diets');
  expect(res.statusCode).toBe(200);
});

it('should reply the GET method on /diets with a list of diets', async () => {
  const res = await request(app).get('/diets');
  expect(res.body).toEqual(["vegan","vegetarian","gluten Free","dairy Free","ketogenic","lacto ovo vegetarian","pescatarian","paleolithic","primal","low FODMAP","whole 30"]);
});