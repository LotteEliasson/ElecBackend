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
const orderRoutes = require('./src/routes/orderRoutes.js')

const app = express();

//app.use(cors('*')); // Enable CORS for all routes

// Specifik tilladelse for din frontend
const allowedOrigins = ['http://localhost:5173']; // Tilføj flere domæner, hvis nødvendigt

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // Hvis du bruger cookies eller sessioner
};

app.use(cors(corsOptions)); // Brug de opdaterede CORS-indstillinger
app.use(express.json()) //For JSON body parsing

//Handle incoming HTTP-req from frontend/clients, sent it to relevant routes based on the URL.
app.use('/api', userRoutes);
app.use('/api', shipRoutes);
app.use('/api', ownerRoutes);
app.use('/api', engineRoutes);
app.use('/api', componentRoutes);
app.use('/api', junctionBoxRoutes);
app.use('/api', manualRoutes);
app.use('/api', orderRoutes);



app.get('/', (req, res) =>{
  res.send('Nice try');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log('server is running on port 5000')
})