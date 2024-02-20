const express = require('express');
const cors = require('cors');
const compression = require('compression');

const port = 3000;

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(compression());
app.use('/', express.static("./"));

app.listen(process.env.PORT || port);