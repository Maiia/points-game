import { Request, Response } from 'express';
import { query } from '../db/index.js';
import { v4 as uuidv4 } from 'uuid';

// Створити персонажа
export const createCharacter = async (req: Request, res: Response) => {
    const { userId } = req.params;
    const { nickname } = req.body;

    if (!nickname) {
        res.status(400).json({ message: 'Nickname is required' });
        return;
    }

    try {
        // Перевіряємо, чи існує юзер
        await query(
            `INSERT INTO users (id) VALUES ($1) ON CONFLICT (id) DO NOTHING`,
            [userId]
        );

        const characterId = uuidv4();
        await query(
            `INSERT INTO characters (id, user_id, nickname, is_active) VALUES ($1, $2, $3, $4)`,
            [characterId, userId, nickname, true]
        );

        // Робимо всіх інших персонажів неактивними
        await query(
            `UPDATE characters SET is_active = false WHERE user_id = $1 AND id <> $2`,
            [userId, characterId]
        );


        // res.json(111);
        res.status(201).json({ characterId, nickname });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

// Отримати всіх персонажів користувача
export const getCharacters = async (req: Request, res: Response) => {
    const { userId } = req.params;

    try {
        const result = await query(
            `SELECT id, nickname, is_active FROM characters WHERE user_id = $1`,
            [userId]
        );
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

// Змінити ім’я персонажа
export const updateCharacter = async (req: Request, res: Response) => {
    const { characterId } = req.params;
    const { nickname } = req.body;

    if (!nickname) {
        res.status(400).json({ message: 'Nickname is required' });
        return;
    }

    try {
        await query(
            `UPDATE characters SET nickname = $1 WHERE id = $2`,
            [nickname, characterId]
        );
        res.json({ message: 'Character updated' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

// Зробити персонажа активним
export const activateCharacter = async (req: Request, res: Response) => {
    const { characterId } = req.params;

    try {
        const { rows } = await query(
            `SELECT user_id FROM characters WHERE id = $1`,
            [characterId]
        );

        if (rows.length === 0) {
            res.status(404).json({ message: 'Character not found' });
            return;
        }

        const userId = rows[0].user_id;

        await query(
            `UPDATE characters SET is_active = false WHERE user_id = $1`,
            [userId]
        );
        await query(
            `UPDATE characters SET is_active = true WHERE id = $1`,
            [characterId]
        );

        res.json({ message: 'Character activated' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};