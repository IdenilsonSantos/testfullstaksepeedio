import express from "express";
import "dotenv/config";
import cors from 'cors';

import "../src/config/database";
import userRoutes from '../src/routes/user';
import urlRoutes from '../src/routes/url'

const app: express.Application = express();

app.use(express.json());
app.use(cors());
app.use(userRoutes);
app.use(urlRoutes);


export {app};