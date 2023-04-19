import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
process.env.NODE_ENV = 'test';
import app from '../server';
import User from '../models/userModel';

let mongoServer;

beforeAll(async () => {
  if (mongoose.connection.readyState) {
    await mongoose.disconnect();
  }
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
    // Add the test user if it doesn't exist
    const testUserEmail = 'malek.jerbi11@gmail.com';
    let testUser = await User.findOne({ email: testUserEmail });
    if (!testUser) {
        testUser = new User({
        email: testUserEmail,
        auth0Id: 'test-auth0-id',
        name: 'Test User', // Add a name for the test user
    });
    await testUser.save()
}
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

test('POST /users/create', async () => {

  const response = await request(app)
    .post('/users/create')
    .send({email: 'test1@example.com', name: 'Test User1'})

  expect(response.status).toBe(201);
  expect(response.body.success).toBe(true);
  expect(response.body.message).toBe('User Has been saved ');
  expect(response.body.data).toHaveProperty('email', 'test1@example.com');
  expect(response.body.data).toHaveProperty('name', 'Test User1');
});

test('GET /users/:id', async () => {
  const newUser = new User({
    email: 'test@example.com',
    name: 'Test User',
    auth0Id: 'test-auth0-id1',
  });
  const savedUser = await newUser.save();

  const response = await request(app).get(`/users/${savedUser._id}`).set('x-skip-auth', 'true');

  expect(response.status).toBe(200);
  expect(response.body.success).toBe(true);
  expect(response.body.message).toBe('User Returned');
  expect(response.body.data).toHaveProperty('_id', savedUser._id.toString());
  expect(response.body.data).toHaveProperty('email', 'test@example.com');
});
