const db = require('../configs/db');

const fetchAllOwners = async () => {
  const query = 'SELECT owner_id, owner_name, owner_email FROM ship_owner';
  const [results] = await db.query(query);
  return results;
};

const updateOwner = async (ownerId, ownerData) => {
  const { owner_name, owner_email } = ownerData;
  const query = 'UPDATE ship_owner SET owner_name = ?, owner_email = ? WHERE owner_id = ?';
  const [result] = await db.query(query, [owner_name, owner_email, ownerId]);

  if (result.affectedRows === 0) {
    return null; // No owner found with that ID
  }

  // Get the updated owner
  const [updatedOwner] = await db.query('SELECT * FROM ship_owner WHERE owner_id = ?', [ownerId]);
  return updatedOwner[0];
};

const deleteOwner = async (ownerId) => {
  const query = 'DELETE FROM ship_owner WHERE owner_id = ?';
  const [result] = await db.query(query, [ownerId]);

  if (result.affectedRows === 0) {
    return false;
  }

  return true;
};

const createOwner = async (ownerData) => {
  const { owner_name, owner_email } = ownerData;
  const connection = await db.getConnection();

  try {
    await connection.beginTransaction();

    // Insert into ship_owner
    const ownerQuery = 'INSERT INTO ship_owner (owner_name, owner_email) VALUES (?, ?)';
    const [ownerResult] = await connection.query(ownerQuery, [owner_name, owner_email]);

    const ownerId = ownerResult.insertId;
    console.log(`Inserted owner with owner_id: ${ownerId}`);

    // Commit to database
    await connection.commit();

    const [newOwner] = await connection.query(
      'SELECT owner_id, owner_name, owner_email FROM ship_owner WHERE owner_id = ?',
      [ownerId]
    );
    if (newOwner.length === 0) {
      throw new Error('Owner creation failed: No owner found with the inserted ID.');
    }

    return newOwner[0];
  } catch (error) {
    console.error('Error during owner creation:', error.message);
    // Rollback transaction if error
    await connection.rollback();
    throw new Error(`Error during owner creation: ${error.message}`);
  } finally {
    // Release connection
    connection.release();
  }
};

module.exports = {
  fetchAllOwners,
  createOwner,
  deleteOwner,
  updateOwner,
};
