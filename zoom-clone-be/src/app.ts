import cors from 'cors';
import express, {
  json,
  NextFunction,
  Request,
  Response,
  urlencoded,
} from 'express';
import path from 'path';

import { AppError } from './models/error';
import indexRouter from './routes';
import roomRouter from './routes/room-routes';

const app = express();

// Configure express
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/api', roomRouter);

// Handle unknown route
app.use((req: Request, res: Response, next: NextFunction) => {
  throw new AppError(404, 'Could not find this route');
});

// error handler
app.use((error: AppError, req: Request, res: Response, next: NextFunction) => {
  // Skip if response is already sent
  if (res.headersSent) {
    return next(error);
  }

  // render the error page
  res.status(error.code || 500);
  res.json({ message: error.message || 'Internal server error.' });
});

export default app;
