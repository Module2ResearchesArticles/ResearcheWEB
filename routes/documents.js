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

router.get('/new-document/:repoId',(req,res) => {
  const repository = req.params.repoId
  const name = 'Sin título'
  Document.create({name, repository})
    .then(document => {
      res.render('private/editor', {document})
    })  
})

router.post('/edit/:id', (req, res) => {
  Document.findByIdAndUpdate(req.params.id, {$set: req.body})
      .then(() => {
        res.redirect(`/main/${req.user._id}`)
      })
})

router.post('/edit-created/:id', (req, res) => {
  Document.findByIdAndUpdate(req.params.id)
      .then(document => {
        res.render('private/editor', {document})
      })
})

module.exports = router;