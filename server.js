//The entry point of the application
const express = require('express');
const cors = require('cors');

const userRoutes = require('./src/routes/userRoutes.js')

const app = express();

app.use(cors('*')); // Enable CORS for all routes
app.use(express.json()) //For JSON body parsing

//Handle incoming HTTP-req from frontend/clients, sent it to relevant routes based on the URL.
app.use('/api', userRoutes);

app.get('/', (req, res) =>{
  res.send('Nice try');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log('server is running on port 5000')
})