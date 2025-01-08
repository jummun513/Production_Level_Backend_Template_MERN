import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import notFound from './app/middlewares/notFound';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import router from './app/routes';

const app: Application = express();

// parsers
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ['http://localhost:3030', 'http://localhost:3000'],
    methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD', 'PATCH', 'DELETE'],
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
