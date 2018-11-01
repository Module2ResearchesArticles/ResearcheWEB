const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Repository = require('../models/Repository');
const Document = require('../models/Document');

router.post('/create-repository',(req, res) => {
  const {name,description} = req.body;
  console.log(req);
  const author = req.user._id; 
  Repository.create({name,description,author})
            .then(repository => {
              res.redirect('/')
            })
})



module.exports = router;
