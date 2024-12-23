const junctionBoxModel = require('../models/junctionBoxModel');

const getAllJunctionBoxes = async (req, res) => {
  try {
    const junctionBoxes = await junctionBoxModel.fetchAllJunctionBoxes();
    res.json(junctionBoxes);
  } catch (error) {
    console.error("Error fetching junction boxes", error);
    res.status(500).json({ error: "Database query error" });
  }
};

const createJunctionBox = async (req, res) => {
  try {
    const { item_id, junction_box_type, junction_box_description } = req.body;

    if (!item_id || !junction_box_type || !junction_box_description) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const newJunctionBox = await junctionBoxModel.createJunctionBox({
      item_id,
      junction_box_type,
      junction_box_description,
    });

    if (newJunctionBox) {
      res.status(201).json(newJunctionBox);
    } else {
      res.status(500).json({ message: 'Failed to create junction box.' });
    }
  } catch (error) {
    console.error('Error creating junction box:', error);
    res.status(500).json({ message: 'Server error.' });
  }
};

const updateJunctionBox = async (req, res) => {
  const junctionBoxId = req.params.id;
  const { item_id, junction_box_type, junction_box_description } = req.body;

  if (!item_id || !junction_box_type || !junction_box_description) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const updatedJunctionBox = await junctionBoxModel.updateJunctionBox(junctionBoxId, {
      item_id,
      junction_box_type,
      junction_box_description,
    });

    if (!updatedJunctionBox) {
      return res.status(404).json({ error: 'Junction box not found' });
    }
    res.json(updatedJunctionBox);
  } catch (error) {
    console.error('Error updating junction box: ', error);
    res.status(500).json({ error: 'Database query error' });
  }
};

const deleteJunctionBox = async (req, res) => {
  const junctionBoxId = req.params.id;
  try {
    const deleted = await junctionBoxModel.deleteJunctionBox(junctionBoxId);
    if (!deleted) {
      return res.status(404).json({ error: 'Junction box not found' });
    }
    res.status(200).json({ message: 'Junction box deleted successfully' });
  } catch (error) {
    console.error("Error deleting junction box:", error);
    res.status(500).json({ error: 'Server error' });
  }
};

const getJuncionBoxByID = async (req, res) => {
  try {
    const junctionBoxId = req.params.id;
    if (!junctionBoxId) {
      return res.status(400).json({ error: "Invalid junction box ID" });
    }

    const specificJunctionBox = await junctionBoxModel.getJunctionBoxById(junctionBoxId);

    if (Array.isArray(specificJunctionBox)) {
      if (specificJunctionBox.length === 0) {
        return res.status(404).json({ error: "Junction Box not found" });
      }
      //Return first element
      return res.json(specificJunctionBox[0]);
    } else if (!specificJunctionBox) {
    
      return res.status(404).json({ error: "Junction Box not found" });
    }

    res.json(specificJunctionBox);
  } catch (error) {
    console.error("Error fetching Junction Box", error);
    res.status(500).json({ error: "Database query error" });
  }
}

module.exports = {
  getAllJunctionBoxes,
  createJunctionBox,
  updateJunctionBox,
  deleteJunctionBox,
  getJuncionBoxByID,
};
