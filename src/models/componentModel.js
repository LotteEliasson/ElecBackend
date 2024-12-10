const db = require('../configs/db');

const fetchAllComponents = async () => {
  const query = 'SELECT component_id, component_name, component_description, item_id, component_type, pos_no, maker, ref_id_name, quantity, engine_id, junction_box_id FROM components';
  const [results] = await db.query(query);
  return results;
};

const updateComponent = async (componentId, componentData) => {
  const { component_name, component_description, item_id, component_type, pos_no, maker, ref_id_name, quantity, engine_id, junction_box_id } = componentData;
  const query = `
    UPDATE components 
    SET component_name=?, component_description=?, item_id=?, component_type=?, pos_no=?, maker=?, ref_id_name=?, quantity=?, engine_id=?, junction_box_id=? 
    WHERE component_id=?`;
  const [result] = await db.query(query, [
    component_name, component_description, item_id, component_type, pos_no, maker, ref_id_name, quantity, engine_id, junction_box_id, componentId,
  ]);

  if (result.affectedRows === 0) {
    return null; // No component found with that ID
  }

  // Get the updated component
  const [updatedComponent] = await db.query('SELECT * FROM components WHERE component_id = ?', [componentId]);
  return updatedComponent[0];
};

const deleteComponent = async (componentId) => {
  const query = 'DELETE FROM components WHERE component_id = ?';
  const [result] = await db.query(query, [componentId]);

  if (result.affectedRows === 0) {
    return false;
  }

  return true;
};

const createComponent = async (componentData) => {
  const { component_name, component_description, item_id, component_type, pos_no, maker, ref_id_name, quantity, engine_id, junction_box_id } = componentData;
  const connection = await db.getConnection();

  try {
    await connection.beginTransaction();

    // Insert into components
    const componentQuery = `
      INSERT INTO components (component_name, component_description, item_id, component_type, pos_no, maker, ref_id_name, quantity, engine_id, junction_box_id) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const [componentResult] = await connection.query(componentQuery, [
      component_name, component_description, item_id, component_type, pos_no, maker, ref_id_name, quantity, engine_id, junction_box_id,
    ]);

    const componentId = componentResult.insertId;
    console.log(`Inserted component with component_id: ${componentId}`);

    // Commit to db
    await connection.commit();

    // Get the newly inserted component
    const [newComponent] = await connection.query(
      'SELECT component_id, component_name, component_description, item_id, component_type, pos_no, maker, ref_id_name, quantity, engine_id, junction_box_id FROM components WHERE component_id = ?',
      [componentId]
    );
    if (newComponent.length === 0) {
      throw new Error('Component creation failed: No component found with the inserted ID.');
    }

    return newComponent[0];
  } catch (error) {
    console.error('Error during component creation:', error.message);
    // Rollback transaction if error
    await connection.rollback();
    throw new Error(`Error during component creation: ${error.message}`);
  } finally {
    // Release connection
    connection.release();
  }
};

module.exports = {
  fetchAllComponents,
  createComponent,
  deleteComponent,
  updateComponent,
};
