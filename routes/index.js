const express = require('express');
const router  = express.Router();
const User = require('../models/User')
const Repository = require('../models/Repository')

function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next()
  } else {
  console.log('no estás perro')
  res.redirect('/auth/login')
  }
}

function isAuthorized(req, res, next){
    Repository.findById(req.params.id)
        .then (repository => {
            console.log(repository.author + req.user._id)
            if(repository.author.equals(req.user._id)){
                return next()
            } else {
                console.log('aquí no puedes entrar')
                res.redirect('/')
            }
        })
}

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index',{user:req.user});
});
/* GET home page */

router.get ('/main/:id', isLoggedIn, (req,res,next) => {
  User.findById(req.params.id)
      .then(user => {
        Repository.find({author:user._id})
          .then(repositories => {
            // console.log(repositories)
            res.render('private/user-main',{user, repositories})
          })        
          .catch(err => {
            console.log(err);
          })
      })
})

router.get('/editor', (req, res, next) => {
    var info = '<h1>aqui estara todo el pedo de la base</h1>';
    res.render('private/editor',{info});
  });

router.post('/editor', (req, res, next) => {
    console.log(req.body);
  });

module.exports = router;

