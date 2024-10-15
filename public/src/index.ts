import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

// Ahora puedes acceder a la API key usando process.env
const apiKey = process.env.API_KEY;
