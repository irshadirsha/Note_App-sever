require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const NoteRouter = require('./router/NoteRouter')
const app = express();

app.use(bodyParser.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
});
app.use('/api',NoteRouter)

const PORT = process.env.PORT ||5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
