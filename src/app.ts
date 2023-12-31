import express, { Application } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFoundHandler from './app/middlewares/notFoundHandler';
const app: Application = express();

import cookieParser from 'cookie-parser';

// import router
import routes from './app/routes';

// using cors
app.use(cors());
app.use(cookieParser());

// using parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// application route
app.use('/api/v1', routes);

// handle global error
app.use(globalErrorHandler);

// handle not found route
app.use(notFoundHandler);

export default app;
