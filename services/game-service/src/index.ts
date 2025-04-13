import express from 'express';
import dotenv from 'dotenv';
// import characterRoutes from './routes/characters.js';

dotenv.config();

const app = express();
app.use(express.json());

// app.use('/characters', characterRoutes);

const PORT = process.env.PORT || 4001;
app.listen(PORT, () => {
    console.log(`Auth service running on port ${PORT}`);
});