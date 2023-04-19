import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
process.env.NODE_ENV = 'test';
import app from '../server';
import Idea from '../models/ideaModel';
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

test('GET /ideas', async () => {
  const idea1 = new Idea({ text: 'Test idea 1', likes: 2 });
  const idea2 = new Idea({ text: 'Test idea 2', likes: 5 });
  await idea1.save();
  await idea2.save();

  const response = await request(app).get('/ideas');
  expect(response.status).toBe(200);
  expect(response.body.length).toBe(2);
});

test('GET /ideas/random', async () => {
  const idea1 = new Idea({ text: 'Test idea 1', likes: 2 });
  const idea2 = new Idea({ text: 'Test idea 2', likes: 5 });
  const returnedIdea1 = await idea1.save();
  const returnedIdea2 = await idea2.save();

  const response = await request(app)
    .get('/ideas/random')

  expect(response.body).toHaveProperty('id');
  expect(response.body).toHaveProperty('text');
  expect(response.body).toHaveProperty('likes');
  expect([idea1.text, idea2.text]).toContain(response.body.text);
});
