const express = require('express');
const cors = require('cors');
const { config } = require('dotenv');
const { connect_to_db } = require('./db/connection');
const router = require('./routes/routes');

config();

const app = express();
const PORT = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

// server health api
app.get('/health', (req, res) => res.sendStatus(200));
// routes
app.use('/api/v1', router);

app.listen(PORT, () => {
    console.log(`server is running at port ${PORT}.`);
    connect_to_db();
});
