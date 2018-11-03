const express = require('express');
const router = express.Router();
const Document = require('../models/Document');
const upload = require('../helpers/multer');

router.post('/createDocument',(req,res) => {
  const {repository,name,description} = req.body;
  // console.log(`repository: ${repository}, name: ${name}, description: ${description} `);
  Document.create({name,description,repository})
  .then(() => {
    res.redirect(`/repositories/${repository}`);
  })
});

router.get('/documents/delete/:id', (req, res) => {
  Document.findByIdAndDelete(req.params.id)
  .then(document => {
    res.redirect(`/repositories/${document.repository}`)
  })
})

router.get('/new-document/:repoId',(req,res) => {
  const repository = req.params.repoId
  const name = 'Sin título'
  Document.create({name, repository})
  .then(document => {
    res.render('private/editor', {document})
  })  
})

router.post('/edit/:id', (req, res) => {
  if (req.body.saveAsNew == "true"){
    Document.findById(req.params.id)
      .then (parent => {
        const version = parent.version + 1;
        const repository = parent.repository;
        const {name, description, content} = req.body;
        const parentDocument = parent._id
        Document.create({name, description, content, repository, version, parentDocument})
        .then(document => {
          res.redirect(`/`)
        })
      })
    
  } else {
    Document.findByIdAndUpdate(req.params.id, {$set: req.body})
    .then(() => {
      res.redirect(`/`)
    })
  }
})

router.post('/edit-created/:id', (req, res) => {
  Document.findByIdAndUpdate(req.params.id)
  .then(document => {
    res.render('private/editor', {document})
  })
})

module.exports = router;