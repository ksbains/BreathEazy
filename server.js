const express = require('express');
const app = express();
const port = 3000;
const routes = require('./routes');

routes(app);

app.listen(port, () => console.log('Listening on port 3000'));