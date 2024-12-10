// componentController handles HTTP requests for components using componentModel

const componentModel = require('../models/componentModel');

const getAllComponents = async (req, res) => {
  try {
    const components = await componentModel.fetchAllComponents();
    res.json(components);
  } catch (error) {
    console.error("Error fetching components", error);
    res.status(500).json({ error: "Database query error" });
  }
};

const createComponent = async (req, res) => {
  try {
    const { component_name, component_description, item_id, component_type, pos_no, maker, ref_id_name, quantity, engine_id, junction_box_id } = req.body;

    if (!component_name || !component_description || !item_id || !component_type || !pos_no || !maker || !ref_id_name || !quantity) {
      return res.status(400).json({ message: 'All fields except engine_id and junction_box_id are required.' });
    }

    const newComponent = await componentModel.createComponent({
      component_name,
      component_description,
      item_id,
      component_type,
      pos_no,
      maker,
      ref_id_name,
      quantity,
      engine_id,
      junction_box_id,
    });

    if (newComponent) {
      res.status(201).json(newComponent);
    } else {
      res.status(500).json({ message: 'Failed to create component.' });
    }
  } catch (error) {
    console.error('Error creating component:', error);
    res.status(500).json({ message: 'Server error.' });
  }
};

const updateComponent = async (req, res) => {
  console.log('Component ID:', req.params.id);
  console.log('Request Body:', req.body);

  const componentId = req.params.id;
  const { component_name, component_description, item_id, component_type, pos_no, maker, ref_id_name, quantity, engine_id, junction_box_id } = req.body;

  if (!component_name || !component_description || !item_id || !component_type || !pos_no || !maker || !ref_id_name || !quantity) {
    return res.status(400).json({ error: 'All fields except engine_id and junction_box_id are required' });
  }

  try {
    const updatedComponent = await componentModel.updateComponent(componentId, {
      component_name,
      component_description,
      item_id,
      component_type,
      pos_no,
      maker,
      ref_id_name,
      quantity,
      engine_id,
      junction_box_id,
    });

    if (!updatedComponent) {
      return res.status(404).json({ error: 'Component not found' });
    }
    res.json(updatedComponent);
  } catch (error) {
    console.error('Error updating component: ', error);
    res.status(500).json({ error: 'Database query error' });
  }
};

const deleteComponent = async (req, res) => {
  const componentId = req.params.id;
  try {
    const deleted = await componentModel.deleteComponent(componentId);
    if (!deleted) {
      return res.status(404).json({ error: 'Component not found' });
    }
    res.status(200).json({ message: 'Component deleted successfully' });
  } catch (error) {
    console.error("Error deleting component:", error);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  getAllComponents,
  createComponent,
  updateComponent,
  deleteComponent,
};
