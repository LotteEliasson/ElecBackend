const db = require('../configs/db');

// Fetch all manuals including their associated PDF files
const fetchAllManuals = async () => {
  const query = `
    SELECT m.manual_id, m.manual_name, m.version, m.manual_component, m.manual_junction_box, m.ships,
           mpf.file_name, mpf.file_data
    FROM manuals m
    LEFT JOIN manual_pdf_files mpf ON m.manual_id = mpf.manual_id
  `;
  const [results] = await db.query(query);
  return results;
};

// Update a manual and its associated PDF file
const updateManual = async (manualId, manualData) => {
  const { manual_name, version, manual_component, manual_junction_box, ships, file_name, file_data } = manualData;
  const connection = await db.getConnection();

  try {
    await connection.beginTransaction();

    // Update the manual metadata
    const manualQuery = `
      UPDATE manuals 
      SET manual_name=?, version=?, manual_component=?, manual_junction_box=?, ships=? 
      WHERE manual_id=?
    `;
    const [manualResult] = await connection.query(manualQuery, [
      manual_name,
      version,
      manual_component,
      manual_junction_box,
      ships,
      manualId,
    ]);

    if (manualResult.affectedRows === 0) {
      throw new Error('Manual not found');
    }

    // Update the associated PDF file
    const pdfQuery = `
      UPDATE manual_pdf_files 
      SET file_name=?, file_data=? 
      WHERE manual_id=?
    `;
    await connection.query(pdfQuery, [file_name, file_data, manualId]);

    await connection.commit();

    // Fetch the updated manual
    const updatedManual = await fetchManualById(manualId);
    return updatedManual;
  } catch (error) {
    await connection.rollback();
    throw new Error(`Error updating manual: ${error.message}`);
  } finally {
    connection.release();
  }
};

// Fetch a single manual by its ID
const fetchManualById = async (manualId) => {
  const query = `
    SELECT m.manual_id, m.manual_name, m.version, m.manual_component, m.manual_junction_box, m.ships,
           mpf.file_name, mpf.file_data
    FROM manuals m
    LEFT JOIN manual_pdf_files mpf ON m.manual_id = mpf.manual_id
    WHERE m.manual_id = ?
  `;
  const [results] = await db.query(query, [manualId]);
  return results.length ? results[0] : null;
};

const getManualByJunctionBoxId = async (junctionBoxId) => {
  const query = `
    SELECT m.manual_id, m.manual_name, m.version, m.manual_component, m.manual_junction_box, m.ships,
           mpf.file_name, mpf.file_data
    FROM manuals m
    LEFT JOIN manual_pdf_files mpf ON m.manual_id = mpf.manual_id
    WHERE m.manual_junction_box = ?
  `;
  const [results] = await db.query(query, [junctionBoxId]);
  return results.length ? results[0] : null;
};

// Delete a manual and its associated PDF file
const deleteManual = async (manualId) => {
  const query = 'DELETE FROM manuals WHERE manual_id = ?';
  const [result] = await db.query(query, [manualId]);

  return result.affectedRows > 0;
};

  // Create a new manual and associated PDF file
  const createManual = async (manualData, file) => {
    const { manual_name, version, manual_component, manual_junction_box, ships } = manualData;
    const connection = await db.getConnection();

    try {
      await connection.beginTransaction();

      // Insert manual details
      const manualQuery = `
        INSERT INTO manuals (manual_name, version, manual_component, manual_junction_box, ships)
        VALUES (?, ?, ?, ?, ?)
      `;
      const [manualResult] = await connection.query(manualQuery, [
        manual_name,
        version,
        manual_component || null,
        manual_junction_box || null,
        ships || null,
      ]);

      const manualId = manualResult.insertId; // Get the inserted manual ID

      // Insert PDF details
      const pdfQuery = `
        INSERT INTO manual_pdf_files (manual_id, file_name, file_data)
        VALUES (?, ?, ?)
      `;
      await connection.query(pdfQuery, [manualId, file.originalname, file.buffer]);
      
      console.log('Buffer Length:', file.buffer.length);
      
      // Commit transaction
      await connection.commit();

      // Fetch and return the newly created manual
      const [newManual] = await connection.query(
        `SELECT m.*, mpf.file_name 
        FROM manuals m 
        LEFT JOIN manual_pdf_files mpf ON m.manual_id = mpf.manual_id 
        WHERE m.manual_id = ?`,
        [manualId]
      );

      return newManual[0];
    } catch (error) {
      await connection.rollback(); // Rollback in case of error
      console.error("Error creating manual:", error.message);
      throw new Error(`Error creating manual: ${error.message}`);
    } finally {
      connection.release(); // Release DB connection
    }
  };

  const getMaunalIdByComponentId = async (componentId) => {
    const query = `
    SELECT manual_id FROM manuals WHERE manual_component = ?
  `;
  const [results] = await db.query(query, [componentId]);
  return results.length ? results[0] : null;
  }

module.exports = {
  fetchAllManuals,
  createManual,
  updateManual,
  deleteManual,
  fetchManualById,
  getManualByJunctionBoxId,
  getMaunalIdByComponentId,
};
