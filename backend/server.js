// server.js (or app.js)
const express = require('express');
const cors = require('cors');
const productRoutes = require('./routes/products');
require('dotenv').config();  

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/products', productRoutes);

app.get('/', (req,res)=>{
 res.json({message:"server is running"})
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log('Server is up and waiting for requests...');
});
