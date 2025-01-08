const db = require('../configs/db');

const fetchAllPictures = async () => {
  const query = `
    SELECT u.user_documentation_id, u.documentation_description, u.user_id, u.junction_box_id, 
    p.picture_filename, p.picture_data
    FROM user_documentation u
    LEFT JOIN picture_user_documentation p ON u.user_documentation_id = p.user_documentation_id
  `;
  const [results] = await db.query(query);
  return results;
}

// const fetchPicturesByUserId = async (userId) => {
//   const query = `
//   SELECT u.user_documentation_id, u.documentation_description, u.user_id, u.junction_box_id, 
//   p.picture_filename, p.picture_data
//   FROM user_documentation u
//   LEFT JOIN picture_user_documentation p ON u.user_documentation_id = p.user_documentation_id
//   WHERE u.user_id = ?
// `;
// const [results] = await db.query(query, [userId]);
// return results.length ? results[0] : null;
// }

const fetchPicturesByUserId = async (userId) => {
  const query = `
    SELECT u.user_documentation_id, u.documentation_description, u.user_id, u.junction_box_id, 
           p.picture_filename, p.picture_data, p.picture_mimetype
    FROM user_documentation u
    LEFT JOIN picture_user_documentation p ON u.user_documentation_id = p.user_documentation_id
    WHERE u.user_id = ?
  `;

  const [results] = await db.query(query, [userId]);

  // Konverter picture_data til Base64 i backend
  const picturesWithBase64 = results.map((picture) => {
    if (picture.picture_data) {
      picture.picture_data = picture.picture_data.toString('base64'); // Konverter buffer til Base64
    }
    return picture;
  });

  return picturesWithBase64;
};

module.exports = {
  fetchAllPictures,
  fetchPicturesByUserId,
};