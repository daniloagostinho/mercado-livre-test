const express = require('express');

const app = express();
var cors = require('cors');
app.use(cors({
  credentials: true,
}));
const port = process.env.PORT || 5000;

const routes =  require('./routes/routes');

app.use(routes);

app.use((req, res, next) => {
  res.setHeader('Acess-Control-Allow-Origin', '*');
  res.setHeader('Acess-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Acess-Control-Allow-Headers', 'X-Requested-With, content-type');
  res.setHeader('Acess-Control-Allow-Credentials', true);

  next();
})

app.listen(port, () => console.log(`Listening on port ${port}`));
