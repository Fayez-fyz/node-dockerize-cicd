import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const { DB_TEST_HOST, DB_TEST_PASSWORD, DB_TEST_CLUSTER_NAME } = process.env;

if (!DB_TEST_HOST || !DB_TEST_PASSWORD || !DB_TEST_CLUSTER_NAME) {
  throw new Error("Missing required database environment variables");
}

beforeAll(async () => {
  const mongoUri = `mongodb+srv://${DB_TEST_HOST}:${DB_TEST_PASSWORD}@${DB_TEST_CLUSTER_NAME}.mongodb.net/?retryWrites=true&w=majority`;
  if (!mongoUri) {
    throw new Error('MongoDB Test URI not specified');
  }
  await mongoose.connect(mongoUri);
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

afterEach(async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany({});
  }
});