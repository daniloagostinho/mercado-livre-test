const express = require('express');

const app = express();
var cors = require('cors');
app.use(cors({
  credentials: true,
}));
const port = process.env.PORT || 5000;

// busca por produtos
const product = require('./json/product.json');

// json detalhe do produto
const id_json = require('./json/product_id.json');

app.get('/', (req, res) => {
  res.send(id_json);
});
const capitalize = (s) => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}
app.get('/sites/MLA/search', (req, res) => {
  const productResultQuery = product.filter(c => c.item.title.startsWith(capitalize(req.query.q)));
  if(productResultQuery == Array.isArray({})) res.status(404).send('O produto que voce procura nao existe!')
  res.send(productResultQuery);
});
app.get('/items/:id', (req, res) => {
  const productResultId = id_json.find(c => Number(c.item.id) === Number(req.params.id));
  if(!productResultId) res.status(404).send('O produto que voce procura nao existe!')
  res.send(productResultId);
});


app.use((req, res, next) => {
  res.setHeader('Acess-Control-Allow-Origin', '*');
  res.setHeader('Acess-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Acess-Control-Allow-Headers', 'X-Requested-With, content-type');
  res.setHeader('Acess-Control-Allow-Credentials', true);

  next();
})

app.listen(port, () => console.log(`Listening on port ${port}`));
