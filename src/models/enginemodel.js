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

module.exports = {
  fetchAllEngines,
  createEngine,
  updateEngine,
  deleteEngine,
};
