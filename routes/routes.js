const express = require('express');


const router = express.Router();

// busca por produtos
const product = require('../json/product.json');

// json detalhe do produto
const id_json = require('../json/product_id.json');

router.get('/', (req, res) => {
  res.send(id_json);
});
const capitalize = (s) => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}
router.get('/sites/MLA/search', (req, res) => {
  const productResultQuery = product.filter(c => c.item.title.startsWith(capitalize(req.query.q)));
  if(productResultQuery == Array.isArray({})) res.status(404).send('O produto que voce procura nao existe!')
  res.send(productResultQuery);
});
router.get('/items/:id', (req, res) => {
  const productResultId = id_json.find(c => Number(c.item.id) === Number(req.params.id));
  if(!productResultId) res.status(404).send('O produto que voce procura nao existe!')
  res.send(productResultId);
});


module.exports = router;
