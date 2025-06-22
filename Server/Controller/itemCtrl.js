import Item from '../Models/itemModel.js';

// Get all items
const getAllItems = async (req, res) => {
    try {
        const items = await Item.find();
        console.log('Fetched all items:', items);
        res.json(items);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get single item by ID
const getItemById = async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if (!item) return res.status(404).json({ message: 'Item not found' });
        res.json(item);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Create new item
const createItem = async (req, res) => {
    try {
        const data = req.body.form;
        console.log(data);
        // data.createdAt = Date.now();
        const newItem = new Item(data);
        await newItem.save();
        res.status(201);
        res.send("Item Added");
        console.log("Item added to db");
    } catch (e) {
        console.log(e);
    }
};

// Update item
const updateItem = async (req, res) => {
    try {
        const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedItem) return res.status(404).json({ message: 'Item not found' });
        res.json(updatedItem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete item
const deleteItem = async (req, res) => {
    try {
        const deletedItem = await Item.findByIdAndDelete(req.params.id);
        if (!deletedItem) return res.status(404).json({ message: 'Item not found' });
        res.json({ message: 'Item deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
export {
    getAllItems,
    getItemById,
    createItem,
    updateItem,
    deleteItem
};