const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

var proxySetting = require('../src/setupProxy');

proxySetting(app);

app.use('/', express.static(path.join(__dirname, '../build/')));

app.listen(port, () => {
  console.log(`Casper app listening on port ${port}`);
});
