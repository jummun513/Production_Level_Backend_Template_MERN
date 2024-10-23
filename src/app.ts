import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import notFound from './app/middlewares/notFound';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import router from './app/routes';

const app: Application = express();

// parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ['http://localhost:5050', 'http://localhost:3001'],
    credentials: true,
  })
);

// base routes
app.get('/', (req: Request, res: Response) => {
  res.send('Your Backend Server is Running');
});

// application routes
app.use('/api/v1', router);

// not found middleware for undefined routes
app.use(notFound);

// global error handler routes
app.use(globalErrorHandler);

export default app;
