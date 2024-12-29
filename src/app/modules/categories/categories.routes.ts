import express from 'express';
import { categoriesControllers } from './categories.controllers';

const router = express.Router();

router.get('/', categoriesControllers.getAllCategories);

export const categoriesRoutes = router;
