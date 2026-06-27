import 'dotenv/config';
import express from 'express';
import mysql from 'mysql2/promise';
import userRoutes from './routes/userRoutes.js';

const port = 3000;

const app = express();

app.use(express.json());
app.use('/users', userRoutes);

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});