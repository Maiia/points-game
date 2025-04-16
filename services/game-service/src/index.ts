import express from 'express';
import dotenv from 'dotenv';
import {initRedis} from "./redisClient.js";
// import characterRoutes from './routes/characters.js';

dotenv.config();

const app = express();
app.use(express.json());

// app.use('/characters', characterRoutes);

const PORT = process.env.PORT || 4001;
initRedis().then(() => {
    app.listen(PORT, () => {
        console.log(`Game service running on port ${PORT}`);
    });
});