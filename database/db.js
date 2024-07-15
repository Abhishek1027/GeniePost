import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

if (!USERNAME || !PASSWORD) {
  console.error('Error: Database username or password is not defined in environment variables');
  process.exit(1);
}

const Connection = async () => {
  const DB_URI = `mongodb://${USERNAME}:${PASSWORD}@ac-kc6pdtp-shard-00-00.4uu5aah.mongodb.net:27017,ac-kc6pdtp-shard-00-01.4uu5aah.mongodb.net:27017,ac-kc6pdtp-shard-00-02.4uu5aah.mongodb.net:27017/?ssl=true&replicaSet=atlas-5e1qo1-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0`;
  try {
    await mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    mongoose.set('strictQuery', false);
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Error while connecting to the database:', error.message);
  }
};

export default Connection;
