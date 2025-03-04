import express, { json, urlencoded } from 'express';
import dotenv from 'dotenv';
import connectToDb from './config/db.js';
import clientRouter from './routes/client.router.js';
import artisanRouter from './routes/artisan.router.js';
// const { authRouter, authCheck } = require('./routes/auth.router');

dotenv.config();
const app = express();
app.use(json());
app.use(urlencoded({ extended: true }));

const port = process.env.PORT || 3000;
connectToDb();

// routes
app.use('/api/artisan', artisanRouter);
app.use('/api/client', clientRouter);
// app.use('/api/auth', authRouter);


app.post('/', async (req, res) => {
    res.json({
        message: 'home page.'
    });
});

app.get('/', async (req, res) => {
    res.json({
        message: 'home page.'
    });
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}...`);
});