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
app.set('home', './views');

app.get('/home', async (req, res) => {
    let data = await fetch('https://api.themoviedb.org/3/movie/upcoming?api_key=64f6192caf236420f5fed7018238a8a5');
    // console.log(await data.json());
    res.render('home', {data});
    data = await data.json();
    
    let obj = {
    title: data.original_title,
    img: data.poster_path
    }
    
    res.render('home', obj);
});


app.get('*', (req, res) => {
    res.render('404');

});


app.listen(4000, () => {
    console.log('app listening on http://localhost:4000');
});


