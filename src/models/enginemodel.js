const db = require('../configs/db');

const fetchAllEngines = async () => {
  const query = `
    SELECT e.engine_id, e.engine_type, e.engine_cylinders, e.engine_no, e.internal_engine_id, e.ship_id, s.ship_name 
    FROM ship_engine e 
    LEFT JOIN ships s ON e.ship_id = s.ship_id
  `;
  const [results] = await db.query(query);
  return results;
};

const createEngine = async (engineData) => {
  const { engine_type, engine_cylinders, engine_no, internal_engine_id, ship_id } = engineData;
  const query = `
    INSERT INTO ship_engine (engine_type, engine_cylinders, engine_no, internal_engine_id, ship_id) 
    VALUES (?, ?, ?, ?, ?)
  `;
  const [result] = await db.query(query, [engine_type, engine_cylinders, engine_no, internal_engine_id, ship_id]);
  return result.insertId;
};

const updateEngine = async (engineId, engineData) => {
  const { engine_type, engine_cylinders, engine_no, internal_engine_id, ship_id } = engineData;
  const query = `
    UPDATE ship_engine 
    SET engine_type = ?, engine_cylinders = ?, engine_no = ?, internal_engine_id = ?, ship_id = ?
    WHERE engine_id = ?
  `;
  const [result] = await db.query(query, [engine_type, engine_cylinders, engine_no, internal_engine_id, ship_id, engineId]);
  return result.affectedRows > 0;
};

const deleteEngine = async (engineId) => {
  const query = 'DELETE FROM ship_engine WHERE engine_id = ?';
  const [result] = await db.query(query, [engineId]);
  return result.affectedRows > 0;
};

//const getEngineByID = async (engineId) => {
 
  //const query = `SELECT * FROM ship_engine WHERE engine_id = ?`;
  //const [results] = await db.query(query, [engineId])
  //return results;

//}

const getEngineByID = async (engineId) => {
  const query = `
    SELECT 
      se.engine_type,
      se.engine_cylinders,
      se.engine_no,
      se.internal_engine_id,
      se.ship_id,
      s.ship_name,
      s.ship_type,
      se.owner_id,
      so.owner_name,
      so.owner_email
    FROM 
      ship_engine se
    JOIN 
      ship_owner so
    ON 
      se.owner_id = so.owner_id
    JOIN 
      ships s
    ON 
      se.ship_id = s.ship_id
    WHERE 
      se.engine_id = ?;
  `;
  
  const [results] = await db.query(query, [engineId]);
  
  // Return the first result if found
  return results.length > 0 ? results[0] : null;
};



const getEngineByNo = async (engineNo) => {
  const query = `SELECT * FROM ship_engine WHERE engine_no = ?`;
  const [results] = await db.query(query, [engineNo]);
  return results.length ? results[0] : null;
};


module.exports = {
  fetchAllEngines,
  createEngine,
  updateEngine,
  deleteEngine,
  getEngineByID,
  getEngineByNo
  
};
