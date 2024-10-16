import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000; // Usar variable de entorno para el puerto

app.use(express.static('public'));

// Middleware para manejo de errores
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.get('/', (req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

// Ahora puedes acceder a la API key usando process.env
const apiKey = process.env.API_KEY;
