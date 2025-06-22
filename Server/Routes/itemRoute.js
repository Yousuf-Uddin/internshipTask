import express from 'express';
import { getAllItems, getItemById, createItem, updateItem, deleteItem } from '../Controller/itemCtrl.js';

const router = express.Router();

// Get all items
router.get('/', getAllItems);

// Get a single item by ID
router.get('/:id', getItemById);

// Create a new item
router.post('/', createItem);

// Update an item by ID
router.put('/:id', updateItem);

// Delete an item by ID
router.delete('/:id', deleteItem);

export default router;