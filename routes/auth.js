const express = require('express');
const router  = express.Router();
const User = require('../models/User')
const mail = require('../helpers/mailer')
const bcrypt = require('bcrypt')
const bcryptSalt = 8;
const passport = require('passport');

//Middleware
function isActive(req, res, next){
  User.findById(req.user._id)
      .then((user) => {
        if(user.active === true) return next();
        res.redirect('/auth/login',{msg: 'Por favor verifica tu correo'})
      })
}

//Registro de usuario


router.get('/register',(req,res) => {
  res.render('auth/register')
});

router.post('/register',(req,res) => {
  if(req.body.password !== req.body["password-confirm"]) res.render('auth/register',{error: "Las contraseñas no coinciden"});
    const {username, email, password} = req.body;
    const salt = bcrypt.genSaltSync(bcryptSalt);
    let hashPreName= bcrypt.hashSync(username,salt);
    const hashName = hashPreName.replace('/','w');


  
    User.register({username, email, confirmationCode: hashName}, password)
        .then(user => {
            const options = {
                username: user.username,
                email: user.email,
                subject: 'Confirma tu correo',
                hashName: hashName
            };
            mail.send(options);
            res.redirect('/auth/login')
        })
        .catch((err) => {
            console.log(err);
            res.render('auth/register',{err, error: "No pudimos registrate"})
        })
})

//Confirmación de usuario

router.get('/confirm/:confirmCode', (req, res) => {
  let confirmCode = req.params.confirmCode;
  User.findOne({"confirmationCode": confirmCode})  
  .then(user => {
      User.update({_id: user.id},{$set : {active: true}})
        .then(() =>{
          res.redirect('/auth/login');
        })
    })
    .catch (err => {
      console.log(err);
    });
});

//Login

router.get('/login',(req,res) => {
  res.render('auth/login')
});

router.post('/login', passport.authenticate('local'), (req, res) =>  {
  console.log('ya te')
  res.redirect(`/main/${req.user._id}`)
});

module.exports = router;

