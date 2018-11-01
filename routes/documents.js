const express = require('express');
const router = express.Router();
const Document = require('../models/Document');

router.post('/createDocument',(req,res) => {
  const {repository,name,description} = req.body;
  console.log(`repository: ${repository}, name: ${name}, description: ${description} `);
  Document.create({name,description,repository})
    .then(() => {
      res.redirect(`/repositories/${repository}`);
    })
});

module.exports = router;