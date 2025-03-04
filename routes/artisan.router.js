import { Router } from 'express';
const router = Router();
import artisanController from '../controllers/artisan.controller.js';
const { getAllArtisans, getArtisan, updateArtisan, deleteArtisan, registerArtisan } = artisanController;

router.post('/register', registerArtisan); //register artisan
router.get('/', getAllArtisans); //get all artisans
router.get('/:artisanId', getArtisan); //get an artisan
router.put('/update/:artisanId', updateArtisan); //update artisan
router.delete('/delete/:artisanId', deleteArtisan); //delete artisan

export default router;