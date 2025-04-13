import pg from 'pg';
const { Pool } = pg;

import { config } from '../config.js';

const pool = new Pool({
    connectionString: config.db.connectionString,
});

export const query = (text: string, params?: any[]) => {
    return pool.query(text, params);
};