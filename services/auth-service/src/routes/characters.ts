import { Router } from 'express';
import {
    createCharacter,
    getCharacters,
    updateCharacter,
    activateCharacter,
} from '../controllers/characterController.js';

const router = Router();

router.post('/user/:userId', createCharacter);
router.get('/user/:userId', getCharacters);
router.patch('/:characterId', updateCharacter);
router.patch('/:characterId/activate', activateCharacter);

export default router;