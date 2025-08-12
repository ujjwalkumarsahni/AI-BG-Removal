// routes/imageRoutes.js
import express from 'express';
import authuser from '../middlewares/auth.js';
import { removeBgImage, removeText } from '../controllers/imageController.js';
import upload from '../middlewares/multer.js';

const imageRouter = express.Router();

imageRouter.post('/remove-bg', upload.single('image'), authuser, removeBgImage);
imageRouter.post('/remove-text', upload.single('image'), authuser, removeText);
imageRouter.post('/reimagine', upload.single('image'), authuser, removeText);

export default imageRouter;
