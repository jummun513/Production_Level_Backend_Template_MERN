import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import notFound from './app/middlewares/notFound';
import globalErrorHandler from './app/middlewares/globalErrorHandler';

const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

// base routes
app.get('/', (req: Request, res: Response) => {
  res.send('Your Backend Server is Running');
});

// not found middleware for undefined routes
app.use(notFound);

// global error handler routes
app.use(globalErrorHandler);

export default app;
