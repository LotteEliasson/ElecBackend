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

const getEngineByID = async (req, res) => {
  try {
    const engineId = req.params.id;
    if (!engineId) {
      return res.status(400).json({ error: "Invalid engine ID" });
    }

    const specificEngine  = await engineModel.getEngineByID(engineId);

    if (Array.isArray(specificEngine)) {
      if (specificEngine.length === 0) {
        return res.status(404).json({ error: "Engine not found" });
      }
      //Return first element
      return res.json(specificEngine[0]);
    } else if (!specificEngine) {
    
      return res.status(404).json({ error: "Engine not found" });
    }

    res.json(specificEngine);
  } catch (error) {
    console.error("Error fetching engine", error);
    res.status(500).json({ error: "Database query error" });
  }
}


const getEngineByNo = async (req, res) => {
  try {
    const engineNo = req.params.engine_no;

    if (!engineNo) {
      return res.status(400).json({ error: "Engine number is required" });
    }

    const specificEngine = await engineModel.getEngineByNo(engineNo);

    if (!specificEngine) {
      return res.status(404).json({ error: "Engine not found" });
    }

    res.json(specificEngine);
  } catch (error) {
    console.error("Error fetching engine by number:", error);
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
  getEngineByID,
  getEngineByNo,
  createEngine,
  updateEngine,
  deleteEngine,
};
