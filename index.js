const path = require('path');
const express = require('express');
const { engine } = require('express-handlebars');
const fetch = require('node-fetch');
const { runInNewContext } = require('vm');
const { equal } = require('assert');
const { resourceLimits } = require('worker_threads');
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
    
    // res.render('api', {seasons});

    data = await data.json();
   console.log(data);

   let arr = [

   ]

   for (const movie of data.results) {
    console.log(movie.title);
    arr.push({
        title: movie.original_title,
        img: movie.poster_path
        
    })
   }

   console.log(arr);

res.render('home', {arr});
});

app.get('/extrainfo', (req, res) =>{
    res.render('extrainfo', {movie});
})

app.get('/extrainfo/:movieID', (req, res) => {
    res.render('extrainfo', extrainfo[req.params.movieID]);
});


app.get('*', (req, res) => {
    res.render('404');

});


app.listen(4000, () => {
    console.log('app listening on http://localhost:4000');
});







