import express, { Express } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from "./routes/userRoutes"
import authRoutes from './routes/authRoutes';
import pool, { connectDB } from './config/db';
import createUserTable from './data/createUserTable';
import path from "path"
// import errorHandler from './middlewares/errorHandler'
//import axios from "axios"

// Configuring environment variables
dotenv.config();
const app: Express = express();
const PORT = process.env.PORT ? Number(process.env.PORT) : 8080;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  // origin: 'http://localhost:5173',
  // origin: process.env.NODE_ENV === 'production' ? 'https://seu-dominio.com' : '*',
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Serve static files (if needed)
// app.use('/static', express.static(path.join(__dirname, 'public')));  
app.set('views', path.resolve(__dirname, 'src', 'views')) // define o caminho das views (arquivos que renderizam na tela)
app.set('view engine', 'ejs') // define o EJS como engine para renderizar HTML

// Routes
app.use('/api/auth', authRoutes)
app.use('/api', userRoutes);


app.get('/health/db', async (_req, res) => {
  try {
    await pool.query('SELECT 1');
    res.status(200).json({ postgres: 'ok' });
  } catch (error) {
    res.status(500).json({ postgres: (error as Error).message })
  }
});




// Error Handler
// app.use(errorHandler)


// Database
(async () => {
  try {
    // testar mongo
    await connectDB();

    // testar postgres
    await pool.query('SELECT 1');
    console.log('✅ PostgreSQL testado');

    // Cria tabela de usuários se não existir
    await createUserTable();
  } catch (error) {
    console.error('Erro ao conectar com o banco de dados:', (error as Error).message);
    process.exit(1); // Encerra a aplicação se não conseguir conectar ao banco
  }
})();

// Server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server rodando na porta ${PORT}`);
  console.log(`🔗 Local: http://localhost:${PORT}`);

});