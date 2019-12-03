const express = require('express');

const app = express();
const port = process.env.PORT || 5000;

const id_json = require('./json/id_json.json')
const produtos = [
  {id: 1, nome: 'cafeteira'},
  {id: 2, nome: 'fruteira'}
]

app.get('/', (req, res) => {
  res.send(id_json);
});

app.get('/items/:id', (req, res) => {
  const productResult = id_json.find(c => Number(c.item.id) === Number(req.params.id));
  if(!productResult) res.status(404).send('O produto que voce procura nao existe!')
  res.send(productResult);
});

app.get('/items/:id/description', (req, res) => {
  res.send(id_json);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
