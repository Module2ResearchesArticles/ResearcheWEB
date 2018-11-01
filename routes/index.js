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



/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index',{user:req.user});
});

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



module.exports = router;

