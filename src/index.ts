import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import 'dotenv/config.js';
import { Request, Response, NextFunction } from 'express';
import { RecipeGenerator } from './recipeGenerator.js';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configura el directorio de archivos estáticos
const publicDir = path.join(__dirname, '../public');
const buildDir = path.join(__dirname, '../build');

app.use(express.static(publicDir));
app.use('/build', express.static(buildDir));

// Ruta para servir el archivo index.html
app.get('/', (req: Request, res: Response) => {
    res.sendFile(path.join(publicDir, 'index.html'));
});

// Configura el tipo MIME correcto para archivos JavaScript
app.use((req: Request, res: Response, next: NextFunction) => {
    if (req.url.endsWith('.js')) {
        res.type('application/javascript');
    }
    next();
});

const recipeGenerator = new RecipeGenerator(process.env.OPENAI_API_KEY || '');

app.post('/generate-recipes', express.json(), async (req: Request, res: Response) => {
    const { ingredients } = req.body;
    try {
        const recipes = await recipeGenerator.generateRecipe(ingredients);
        res.json({ recipes });
    } catch (error) {
        res.status(500).json({ error: 'Failed to generate recipes' });
    }
});

// Inicia el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
