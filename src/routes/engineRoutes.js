const express = require('express');
const router = express.Router();
const { getAllEngines, createEngine, updateEngine, deleteEngine, getEngineByID, getEngineByNo } = require('../controllers/enginecontroller');

router.get('/engines', getAllEngines);
router.get('/engines/:id', getEngineByID);
router.get('/engines/by_no/:engine_no', getEngineByNo);
router.post('/engines', createEngine);
router.put('/engines/:id', updateEngine);
router.delete('/engines/:id', deleteEngine);

module.exports = router;
