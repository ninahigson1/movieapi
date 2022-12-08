const path = require('path');
const express = require('express');
const { engine } = require('express-handlebars');
// const fetch = require('node-fetch');
const { runInNewContext } = require('vm');
const { equal } = require('assert');
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.engine('.hbs', engine({extname: '.hbs'}));
app.set('view engine', 'hbs');
app.set('views', './views');

app.listen(3000, () => {
    console.log('app listening on http://localhost:3000');
});