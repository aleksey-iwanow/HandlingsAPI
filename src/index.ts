import express, { Application } from 'express';
import dotenv from 'dotenv';
import { handlingsRouter } from './controllers/handlings/handlings.routes';
dotenv.config();

const app: Application = express();
const PORT = process.env.PORT ?? 3000;

app.use(express.json());
app.use('/handlings', handlingsRouter);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});