const manualModel = require('../models/manualModel');

// Fetch all manuals
const getAllManuals = async (req, res) => {
  try {
    const manuals = await manualModel.fetchAllManuals();
    res.json(manuals);
  } catch (error) {
    console.error('Error fetching manuals:', error);
    res.status(500).json({ error: 'Database query error' });
  }
};

// Create a new manual
const createManual = async (req, res) => {
  try {

    // file - Comes from middleware multer-config, set the file. Here it Log file details
    if (req.file) {
      console.log('File Details After Upload:');
      console.log('Original Name:', req.file.originalname); // File name
      console.log('MIME Type:', req.file.mimetype); // MIME type, e.g., 'application/pdf'
      console.log('File Size (bytes):', req.file.size); // File size in bytes
    } else {
      console.log('No file uploaded');
      return res.status(400).json({ message: 'File upload is required' });
    }

    const { manual_name, version, manual_component, manual_junction_box, ships } = req.body;

    // Validate file upload
    if (!req.file) {
      return res.status(400).json({
        message: 'File upload is required.',
      });
    }

    // Validate required fields
    if (!manual_name || !version) {
      return res.status(400).json({
        message: 'Manual name and version are required.',
      });
    }

    // Call manualModel to create manual and file
    const newManual = await manualModel.createManual(
      {
        manual_name,
        version,
        manual_component: manual_component || null,
        manual_junction_box: manual_junction_box || null,
        ships: ships || null,
      },
      req.file // Send the file directly to the model
      
    );
    console.log('New Manual Details:', newManual);


    if (newManual) {
      return res.status(201).json(newManual); // Return the created manual object
    } else {
      return res.status(500).json({
        message: 'Failed to create manual. Please try again.',
      });
    }
  } catch (error) {
    console.error('Error creating manual:', error.message);
    return res.status(500).json({
      message: 'An unexpected server error occurred while creating the manual.',
    });
  }
};

// Update a manual
const updateManual = async (req, res) => {
  const manualId = req.params.id;
  const { manual_name, version, manual_component, manual_junction_box, ships } = req.body;

  // Validate required fields
  if (!manual_name || !version) {
    return res.status(400).json({
      message: 'Manual name and version are required.',
    });
  }

  try {
    const updatedManual = await manualModel.updateManual(manualId, {
      manual_name,
      version,
      manual_component,
      manual_junction_box,
      ships,
      file_name: req.file ? req.file.originalname : undefined,
      file_data: req.file ? req.file.buffer : undefined,
    });

    if (!updatedManual) {
      return res.status(404).json({ message: 'Manual not found.' });
    }

    res.json(updatedManual);
  } catch (error) {
    console.error('Error updating manual:', error.message);
    res.status(500).json({
      message: 'An unexpected server error occurred while updating the manual.',
    });
  }
};

// Delete a manual
const deleteManual = async (req, res) => {
  const manualId = req.params.id;

  try {
    const deleted = await manualModel.deleteManual(manualId);

    if (!deleted) {
      return res.status(404).json({ message: 'Manual not found.' });
    }

    res.status(200).json({ message: 'Manual deleted successfully.' });
  } catch (error) {
    console.error('Error deleting manual:', error.message);
    res.status(500).json({ message: 'An unexpected server error occurred while deleting the manual.' });
  }
};

// Fetch a single manual by ID
const getManualById = async (req, res) => {
  const manualId = req.params.id;
  
  try {
    const manual = await manualModel.fetchManualById(manualId);

    if (!manual) {
      return res.status(404).json({ message: 'Manual not found.' });
    }
    

    res.json(manual);
  } catch (error) {
    console.error('Error fetching manual:', error.message);
    res.status(500).json({ message: 'An unexpected server error occurred while fetching the manual.' });
  }
};


// Download a manual's PDF file
const downloadManualFile = async (req, res) => {
  const manualId = req.params.id;

  try {
    const manual = await manualModel.fetchManualById(manualId);

    if (!manual || !manual.file_data) {
      return res.status(404).json({ message: 'File not found.' });
    }

    res.setHeader('Content-Disposition', `attachment; filename="${manual.file_name}"`);
    res.setHeader('Content-Type', 'application/pdf');
    res.send(Buffer.from(manual.file_data)); // Send binary data as response
  } catch (error) {
    console.error('Error fetching file:', error.message);
    res.status(500).json({ message: 'An error occurred while fetching the file.' });
  }
};

module.exports = {
  getAllManuals,
  createManual,
  updateManual,
  deleteManual,
  getManualById,
  downloadManualFile, // Add this function to exports
};
