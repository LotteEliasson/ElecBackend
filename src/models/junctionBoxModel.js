const db = require('../configs/db');

const fetchAllJunctionBoxes = async () => {
  const query = 'SELECT junction_box_id, item_id, junction_box_type, junction_box_description FROM junction_box';
  const [results] = await db.query(query);
  return results;
};

const updateJunctionBox = async (junctionBoxId, junctionBoxData) => {
  const { item_id, junction_box_type, junction_box_description } = junctionBoxData;
  const query = `
    UPDATE junction_box 
    SET item_id = ?, junction_box_type = ?, junction_box_description = ? 
    WHERE junction_box_id = ?`;
  const [result] = await db.query(query, [item_id, junction_box_type, junction_box_description, junctionBoxId]);

  if (result.affectedRows === 0) {
    return null; // No junction box found with that ID
  }

  // Get the updated junction box
  const [updatedJunctionBox] = await db.query('SELECT * FROM junction_box WHERE junction_box_id = ?', [junctionBoxId]);
  return updatedJunctionBox[0];
};

const deleteJunctionBox = async (junctionBoxId) => {
  const query = 'DELETE FROM junction_box WHERE junction_box_id = ?';
  const [result] = await db.query(query, [junctionBoxId]);

  if (result.affectedRows === 0) {
    return false; // No junction box found with that ID
  }

  return true;
};

const createJunctionBox = async (junctionBoxData) => {
  const { item_id, junction_box_type, junction_box_description } = junctionBoxData;
  const connection = await db.getConnection();

  try {
    await connection.beginTransaction();

    // Insert into junction_box
    const junctionBoxQuery = `
      INSERT INTO junction_box (item_id, junction_box_type, junction_box_description) 
      VALUES (?, ?, ?)`;
    const [junctionBoxResult] = await connection.query(junctionBoxQuery, [item_id, junction_box_type, junction_box_description]);

    const junctionBoxId = junctionBoxResult.insertId;
    console.log(`Inserted junction box with junction_box_id: ${junctionBoxId}`);

    // Commit to db
    await connection.commit();

    // Get the newly inserted junction box
    const [newJunctionBox] = await connection.query(
      'SELECT junction_box_id, item_id, junction_box_type, junction_box_description FROM junction_box WHERE junction_box_id = ?',
      [junctionBoxId]
    );

    if (newJunctionBox.length === 0) {
      throw new Error('Junction box creation failed: No junction box found with the inserted ID.');
    }

    return newJunctionBox[0];
  } catch (error) {
    console.error('Error during junction box creation:', error.message);
    // Rollback transaction if error
    await connection.rollback();
    throw new Error(`Error during junction box creation: ${error.message}`);
  } finally {
    // Release connection
    connection.release();
  }
};

module.exports = {
  fetchAllJunctionBoxes,
  createJunctionBox,
  deleteJunctionBox,
  updateJunctionBox,
};
