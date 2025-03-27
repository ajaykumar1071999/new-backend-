import express from 'express';
import 'dotenv/config';
import { connectToDB } from './db/index.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json({ limit: '20kb' }));
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.urlencoded({ extends: true, limit: '20kb' }));
app.use(express.static('public'));

connectToDB();

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
