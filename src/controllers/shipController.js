// userController handle res from userModel(db) from the HTTP-req in userRoutes

const shipModel = require('../models/shipModel');

const getAllShips = async (req, res) => {
  try {
    const ships = await shipModel.fetchAllships();
    res.json(ships)
  } catch (error) {
    console.error("Error fetching ships", error);
    res.json(500).json({ error: "Database query error"});
  }
}

const createShip = async (req, res) => {
  try {
    const { ship_name, ship_type, designspec, owner_id, imo_no } = req.body;

    if (!ship_name || !ship_type || !designspec || !owner_id || !imo_no) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const newShip = await shipModel.createShip({ ship_name, ship_type, designspec, owner_id, imo_no });

    if (newShip) {
      res.status(201).json(newShip);
    } else {
      res.status(500).json({ message: 'Failed to create ship.' });
    }
  } catch (error) {
    console.error('Error creating ship:', error);
    res.status(500).json({ message: 'Server error.' });
  }
};

const updateShip = async (req, res) => {
  console.log('Ship ID:', req.params.id);
  console.log('Request Body:', req.body);

  const shipId = req.params.id;
  const { ship_name, ship_type, designspec, owner_id, imo_no } = req.body;

  if (!ship_name || !ship_type || !designspec || !owner_id || !imo_no) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const updatedShip = await shipModel.updateShip(shipId, { ship_name, ship_type, designspec, owner_id, imo_no });
    if (!updatedShip) {
      return res.status(404).json({ error: 'Ship not found' });
    }
    res.json(updatedShip);
  } catch (error) {
    console.error('Error updating ship: ', error);
    res.status(500).json({ error: 'Database query error' });
  }
};

const deleteShip = async (req, res) => {
  const shipId = req.params.id;
  try {
    const deleted = await shipModel.deleteShip(shipId);
    if (!deleted) {
      return res.status(404).json({ error: 'Ship not found' });
    }
    res.status(200).json({ message: 'Ship deleted successfully' });
  } catch (error) {
    console.error("Error deleting ship:", error);
    res.status(500).json({ error: 'Server error' });
  }
};
module.exports = {
  getAllShips,
  createShip,
  updateShip,
  deleteShip
}