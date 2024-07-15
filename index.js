import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { TextServiceClient } from '@google-ai/generativelanguage';
import { GoogleAuth } from 'google-auth-library';
import { MongoClient, ServerApiVersion } from 'mongodb';
import routes from './routes/route.js';
import GeneratedEmail from './model/generatedEmail.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/', routes);

const PORT = process.env.PORT || 8000;

// MongoDB Connection
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${encodeURIComponent(process.env.DB_PASSWORD)}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const mongoClient = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function connectToMongo() {
  try {
    await mongoClient.connect();
    await mongoClient.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
}

connectToMongo(); // Call the connection function

// Google Text Service Client
const MODEL_NAME = 'models/text-bison-001';
const API_KEY = process.env.GOOGLE_API_KEY;

if (!API_KEY) {
  throw new Error('API key is required. Please set your API key in the .env file.');
}

const textClient = new TextServiceClient({
  authClient: new GoogleAuth().fromAPIKey(API_KEY),
});

app.post('/generate-email', async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const [response] = await textClient.generateText({
      model: MODEL_NAME,
      prompt: {
        text: prompt,
      },
    });

    if (response && response.candidates && response.candidates.length > 0) {
      const emailContent = response.candidates[0].output.trim();
      // Save to MongoDB
      const generatedEmail = new GeneratedEmail({ prompt, emailContent });
      await generatedEmail.save();

      res.json({ emailContent });
    } else {
      res.status(500).json({ error: 'Failed to generate email content' });
    }
  } catch (error) {
    console.error('Error generating email content:', error);
    res.status(500).json({ error: 'Failed to generate email content' });
  }
})

app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
