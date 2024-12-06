const db = require('../configs/db');

const fetchAllships = async () => {
  const query = 'SELECT ship_id, ship_name, ship_type, designspec, owner_id, imo_no FROM ships'
  const [results] = await db.query(query);
  return results;
}

const updateShip = async (shipId, shipData) => {
  const { ship_name, ship_type, designspec, owner_id, imo_no } = shipData;
  const query = 'UPDATE ships SET ship_name=?, ship_type=?, designspec=?, owner_id=?, imo_no=? WHERE ship_id=?';
  const [result] = await db.query(query, [ship_name, ship_type, designspec, owner_id, imo_no, shipId]);

  if (result.affectedRows === 0) {
    return null; // No ship found with that ID
  }

  // Get the updated ship
  const [updatedShip] = await db.query('SELECT * FROM ships WHERE ship_id = ?', [shipId]);
  return updatedShip[0];
}

const deleteShip = async (shipId) => {
  const query = 'DELETE FROM ships WHERE ship_id = ?';
  const [result] = await db.query(query, [shipId])

  if (result.affectedRows === 0) {
    return false;
  }

  return true;
}


const createShip= async (shipData) => {
  const {ship_name, ship_type, designspec, owner_id, imo_no} = shipData;
  const connection = await db.getConnection();

  try {
    await connection.beginTransaction();

    //Insert into users
    const shipQuery = 'INSERT INTO ships (ship_name, ship_type, designspec, owner_id, imo_no) VALUES (?, ?, ?, ?, ?)';
    const [shipResult] = await connection.query(shipQuery,[ship_name, ship_type, designspec, owner_id, imo_no]);

    const shipId = shipResult.insertId;
    console.log(`Inserted ship with ship_id: ${shipId}`);

    //Commit to db
    await connection.commit();

    
    const [newShip] = await connection.query('SELECT ship_id, ship_name, ship_type, designspec, owner_id, imo_no FROM ships WHERE ship_id = ?', [shipId]);
    if (newShip.length === 0) {
      throw new Error('Ship creation failed: No ship found with the inserted ID.');
    }
    
    return newShip[0];
  } catch (error) {
    console.error('Error during ship creation:', error.message);
       // Rollback transaction if error
       await connection.rollback();
       throw new Error(`Error during ship creation: ${error.message}`);
  } finally {
    // Relaese connection
    connection.release();
  }

}

module.exports = {
  fetchAllships,
  createShip,
  deleteShip,
  updateShip,
}