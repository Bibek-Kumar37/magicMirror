const express = require('express');
const corsAnywhere = require('cors-anywhere');

const app = express();

app.use(corsAnywhere());

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`CORS Anywhere is listening on port ${port}`);
});