const express = require('express')
const path = require('path')
const app = require('./config/server');
const PORT = process.env.PORT || 5000

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/info_films/:id', function(req, res){
    res.render('pages/info_films', {id:req.params.id})
  })
  .get('/characters/:url', function(req, res){
    res.render('pages/people', {url:req.params.url})
  })
  .get('/planets/:url', function(req, res){
    res.render('pages/planets', {url:req.params.url})
  })
  .get('/starships/:url', function(req, res){
    res.render('pages/starships', {url:req.params.url})
  })
  .get('/species/:url', function(req, res){
    res.render('pages/species', {url:req.params.url})
  })
  .get('/vehicles/:url', function(req, res){
    res.render('pages/vehicles', {url:req.params.url})
  })

  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
