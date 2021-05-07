import express from 'express';
import mongoose from 'mongoose';
import passport from 'passport';
import cors from 'cors';

import { router as studentsRoutes } from './routes/students-routes';
import { router as adminRoutes } from './routes/admin-routes';
import { router as authRoutes } from './routes/auth-routes';
import { router as wakeupRoutes } from './routes/wakeup-routes';
import './middleware/passport-strategies.mw';

const app = express();

app.use(
  cors({
    origin: process.env.WEBSITE_URL,
    allowedHeaders: [
      'Origin',
      'X-Requested-With',
      'Content-Type',
      'Accept',
      'Authorization',
    ],
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(passport.initialize());
app.use('/students', studentsRoutes);
app.use('/admin', adminRoutes);
app.use('/auth', authRoutes);
app.use('/dyno', wakeupRoutes);

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ucji2.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }
  )
  .then(() => {
    app.listen(process.env.PORT || 5000);
  })
  .catch((err) => console.log(err));
