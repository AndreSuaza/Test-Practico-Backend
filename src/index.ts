import express from 'express';
import items from './routes/items';
import 'dotenv/config';
var cors = require('cors');

const app = express()
app.use(cors());
app.use(express.json()) 

const PORT = process.env.PORT;

app.use('/api/items', items)

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
});