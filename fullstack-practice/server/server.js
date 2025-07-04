const express = require("express");
const cors = require("cors");
const axios = require("axios");
require('dotenv').config();

const app = express();

app.use(cors());

app.get("/api/joke", async (req, res) => {
    try{
        const response = await axios.get("https://api.api-ninjas.com/v1/facts", {
        headers: {
            'X-api-key': process.env.API_KEY,
        },
    });
    res.json(response.data);
    } catch(err){
        console.error("Error fetching data", err);
    }
})

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));