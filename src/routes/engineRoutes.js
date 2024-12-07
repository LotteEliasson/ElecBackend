const express = require('express');
const router = express.Router();
const { getAllEngines, createEngine, updateEngine, deleteEngine } = require('../controllers/enginecontroller');

router.get('/engines', getAllEngines);
router.post('/engines', createEngine);
router.put('/engines/:id', updateEngine);
router.delete('/engines/:id', deleteEngine);

module.exports = router;
