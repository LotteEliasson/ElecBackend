// OwnerController handles responses from ownerModel(db) for HTTP requests in ownerRoutes

const ownerModel = require('../models/ownerModel');

const getAllOwners = async (req, res) => {
  try {
    const owners = await ownerModel.fetchAllOwners();
    res.json(owners);
  } catch (error) {
    console.error("Error fetching owners", error);
    res.status(500).json({ error: "Database query error" });
  }
};

const createOwner = async (req, res) => {
  try {
    const { owner_name, owner_email } = req.body;

    if (!owner_name || !owner_email) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const newOwner = await ownerModel.createOwner({ owner_name, owner_email });

    if (newOwner) {
      res.status(201).json(newOwner);
    } else {
      res.status(500).json({ message: 'Failed to create owner.' });
    }
  } catch (error) {
    console.error('Error creating owner:', error);
    res.status(500).json({ message: 'Server error.' });
  }
};

const updateOwner = async (req, res) => {
  console.log('Owner ID:', req.params.id);
  console.log('Request Body:', req.body);

  const ownerId = req.params.id;
  const { owner_name, owner_email } = req.body;

  if (!owner_name || !owner_email) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const updatedOwner = await ownerModel.updateOwner(ownerId, { owner_name, owner_email });
    if (!updatedOwner) {
      return res.status(404).json({ error: 'Owner not found' });
    }
    res.json(updatedOwner);
  } catch (error) {
    console.error('Error updating owner: ', error);
    res.status(500).json({ error: 'Database query error' });
  }
};

const deleteOwner = async (req, res) => {
  const ownerId = req.params.id;
  try {
    const deleted = await ownerModel.deleteOwner(ownerId);
    if (!deleted) {
      return res.status(404).json({ error: 'Owner not found' });
    }
    res.status(200).json({ message: 'Owner deleted successfully' });
  } catch (error) {
    console.error("Error deleting owner:", error);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  getAllOwners,
  createOwner,
  updateOwner,
  deleteOwner
};
