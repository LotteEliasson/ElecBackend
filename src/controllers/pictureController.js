const pictureModel = require('../models/pictureModel');

// Fetch all manuals
const fetchAllPictures = async (req, res) => {
  try {
    const pictures = await pictureModel.fetchAllPictures();
    res.json(pictures);
  } catch (error) {
    console.error('Error fetching pictures:', error);
    res.status(500).json({ error: 'Database query error' });
  }
};

// Fetch a single manual by ID
// const fetchPicturesByUserId= async (req, res) => {
//   const userId = req.params.id;
  
//   try {
//     const pictures = await pictureModel.fetchPicturesByUserId(userId);

//     if(!pictures || pictures.length === 0) {
//       return res.status(404).json({ message: 'Pictures not found.' });
//     }
//     res.json(pictures);
//   } catch (error) {
//     console.error('Error fetching pictures:', error.message);
//     res.status(500).json({ message: 'An unexpected server error occurred while fetching pictures.' });
//   }
// };

const fetchPicturesByUserId = async (req, res) => {
  const userId = req.params.id;

  try {
    const pictures = await pictureModel.fetchPicturesByUserId(userId);
    console.log('Pictures fetched and converted to Base64:', pictures);

    if (!pictures || pictures.length === 0) {
      return res.status(404).json({ message: 'Pictures not found.' });
    }

    res.json(pictures); // Returner billeder med Base64-data
  } catch (error) {
    console.error('Error in fetchPicturesByUserId controller:', error.message);
    res.status(500).json({ message: 'An unexpected server error occurred while fetching pictures.' });
  }
};

module.exports = {
  fetchAllPictures,
  fetchPicturesByUserId,

};