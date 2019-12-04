const express = require('express');

const app = express();
const port = process.env.PORT || 5000;

const id_json = require('./json/id_json.json');

app.get('/', (req, res) => {
  res.send(id_json);
});
app.get('/sites/MLA/search', (req, res) => {
  const productResultQuery = id_json.find(c => c.item.description === req.query.q);
  if(!productResultQuery) res.status(404).send('O produto que voce procura nao existe!')
  res.send(productResultQuery);
});
app.get('/items/:id', (req, res) => {
  const productResultId = id_json.find(c => Number(c.item.id) === Number(req.params.id));
  if(!productResultId) res.status(404).send('O produto que voce procura nao existe!')
  res.send(productResultId);
});

app.get('/items/:id/description', (req, res) => {
  const productResultDescription = id_json.find(c => c.item.description === req.params.id);
  if(!productResultDescription) res.status(404).send('O produto que voce procura nao existe!')
  res.send(productResultDescription);
});

app.use((req, res, next) => {
  res.setHeader('Acess-Control-Allow-Origin', '*');
  res.setHeader('Acess-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Acess-Control-Allow-Headers', 'X-Requested-With, content-type');
  res.setHeader('Acess-Control-Allow-Credentials', true);

  next();
})

app.listen(port, () => console.log(`Listening on port ${port}`));
