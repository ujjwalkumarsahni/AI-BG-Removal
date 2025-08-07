// routes/imageRoutes.js
import express from 'express';
import authuser from '../middlewares/auth.js';
import { removeBgImage } from '../controllers/imageController.js';
import upload from '../middlewares/multer.js';

const imageRouter = express.Router();

imageRouter.post('/remove-bg', upload.single('image'), authuser, removeBgImage);

export default imageRouter;
