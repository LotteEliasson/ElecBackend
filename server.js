//The entry point of the application
const express = require('express');
const cors = require('cors');

const userRoutes = require('./src/routes/userRoutes.js')
const shipRoutes = require('./src/routes/shipRoutes.js')
const ownerRoutes = require('./src/routes/ownerRoutes.js')
const engineRoutes = require('./src/routes/engineRoutes.js')
const componentRoutes = require('./src/routes/componentRoutes.js')
const junctionBoxRoutes = require('./src/routes/junctionBoxRoutes.js')
const manualRoutes = require('./src/routes/manualRoutes.js')

const app = express();

app.use(cors('*')); // Enable CORS for all routes
app.use(express.json()) //For JSON body parsing

//Handle incoming HTTP-req from frontend/clients, sent it to relevant routes based on the URL.
app.use('/api', userRoutes);
app.use('/api', shipRoutes);
app.use('/api', ownerRoutes);
app.use('/api', engineRoutes);
app.use('/api', componentRoutes);
app.use('/api', junctionBoxRoutes);
app.use('/api', manualRoutes);



app.get('/', (req, res) =>{
  res.send('Nice try');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log('server is running on port 5000')
})