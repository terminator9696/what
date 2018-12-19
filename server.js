const express = require('express')
var bodyParser = require("body-parser");
const port = 4500
const app = express()
// support json encoded bodies
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

var TrieSearch = require('trie-search');
var data = require('./data.json')
console.log(data[4])
var arr = data;
var ts = new TrieSearch([
  'givenName', // Searches `object.name`
  'middleName',
  'surname'
  // ['details', 'age'] // `Search object.details.age`
]);
ts.addAll(arr);


ts.get('andr'); // Returns all 2 items above that begin with 'andr'
ts.get('andre'); // Returns all 2 items above that begin with 'andr'
ts.get('andrew'); // Returns only andrew.

// support encoded bodies

app.post('/h1', (req, res) => {
  console.log(JSON.stringify(req.body))
  term = req.body['term']
  console.log(term)
  res.send(ts.get(term))
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))


