const express = require('express');
const router  = express.Router();
const User = require('../models/User')

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

module.exports = router;

//Página de registro ¿mover a otro archivo de rutas?
router.get('/register',(req,res) => {
  res.render('auth/register')
});

router.post('/register',(req,res) => {
  if(req.body.password !== req.body["password-confirm"]) res.render('register',{error: "Las contraseñas no coinciden"});
    const {username, email, password} = req.body;
    User.register({username, email}, password)
        .then(user => {
            const options = {
                email: user.email,
                subject: 'Confirma tu correo',
                text: 'O confirmas'
            };
            mail.send(options);
            res.redirect('/auth/login')
        })
        .catch((err) => {
            res.status(500).render('register',{err, msg: "No pudimos registrate"})
        })
})

router.get('/login',(req,res) => {
    res.render('auth/login')
});

router.post('/auth/login',(req,res,next) => {
    
});