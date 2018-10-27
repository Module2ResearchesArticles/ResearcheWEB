const express = require('express');
const router  = express.Router();
const User = require('../models/User')

//Registro de usuario

router.get('/register',(req,res) => {
  res.render('auth/register')
});

router.post('/register',(req,res) => {
  if(req.body.password !== req.body["password-confirm"]) res.render('auth/register',{error: "Las contraseñas no coinciden"});
    const {username, email, password} = req.body;
    User.register({username, email}, password)
        .then (() =>{
          res.redirect('/')
        })
        // .then(user => {
        //     const options = {
        //         email: user.email,
        //         subject: 'Confirma tu correo',
        //         text: 'O confirmas'
        //     };
        //     mail.send(options);
        //     res.redirect('/auth/login')
        // })
        .catch((err) => {
            console.log(err);
            res.render('auth/register',{err, error: "No pudimos registrate"})
        })
})

module.exports = router;

