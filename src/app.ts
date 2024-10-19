import express, { Application, Request, Response } from 'express';
import cors from 'cors';

const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

// base routes
app.get('/', (req: Request, res: Response) => {
  res.send('Your Backend Server is Running');
});

export default app;
