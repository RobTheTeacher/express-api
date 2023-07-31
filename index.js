const express = require("express");
const router = require('./routes/characters')
const cors = require("cors");
const app = express();


const port = 3001;

app.use(express.json());
// Apply CORS middleware to all routes
app.use(cors());
app.use('/characters', router)

app.listen(port), () => console.log("Listening on port 3001");