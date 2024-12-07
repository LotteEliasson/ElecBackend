const engineModel = require('../models/enginemodel');

const getAllEngines = async (req, res) => {
  try {
    const engines = await engineModel.fetchAllEngines();
    res.json(engines);
  } catch (error) {
    console.error("Error fetching engines", error);
    res.status(500).json({ error: "Database query error" });
  }
};

const createEngine = async (req, res) => {
  try {
    const { engine_type, engine_cylinders, engine_no, internal_engine_id, ship_id } = req.body;
    const newEngineId = await engineModel.createEngine({ engine_type, engine_cylinders, engine_no, internal_engine_id, ship_id });
    res.status(201).json({ engine_id: newEngineId });
  } catch (error) {
    console.error("Error creating engine", error);
    res.status(500).json({ error: "Server error" });
  }
};

const updateEngine = async (req, res) => {
  try {
    const engineId = req.params.id;
    const { engine_type, engine_cylinders, engine_no, internal_engine_id, ship_id } = req.body;
    const updated = await engineModel.updateEngine(engineId, { engine_type, engine_cylinders, engine_no, internal_engine_id, ship_id });
    if (updated) {
      res.status(200).json({ message: "Engine updated successfully" });
    } else {
      res.status(404).json({ error: "Engine not found" });
    }
  } catch (error) {
    console.error("Error updating engine", error);
    res.status(500).json({ error: "Server error" });
  }
};

const deleteEngine = async (req, res) => {
  try {
    const engineId = req.params.id;
    const deleted = await engineModel.deleteEngine(engineId);
    if (deleted) {
      res.status(200).json({ message: "Engine deleted successfully" });
    } else {
      res.status(404).json({ error: "Engine not found" });
    }
  } catch (error) {
    console.error("Error deleting engine", error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  getAllEngines,
  createEngine,
  updateEngine,
  deleteEngine,
};
