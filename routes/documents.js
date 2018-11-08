const express = require('express');
const router = express.Router();
const Document = require('../models/Document');
const upload = require('../helpers/multer');

router.post('/createDocument',upload.single('name') ,(req,res) => {
  const {repository,description,parentDocument} = req.body;
  var locationUrl = req.file.url,
  name= req.file.originalname,
  version = req.body.version;
  if(version == 'NaN') version = 0; 
  if(parentDocument === "undefined" || parentDocument === 0) {
    version = 1;
    Document.create({name,description,repository,version,locationUrl})
      .then(() => {
        res.redirect(`/repositories/${repository}`);
      })
  }else{
    
    version = parseInt(version)  + 1;
    Document.create({name,description,repository,locationUrl,version,parentDocument})
      .then(() => {
        res.redirect(`/repositories/${repository}`);
      })
  }
})

router.get('/documents/delete/:id', (req, res) => {
  Document.findByIdAndDelete(req.params.id)
  .then(document => {
    res.redirect(`/repositories/${document.repository}`)
  })
})

router.get('/new-document/:repoId',(req,res) => {
  const repository = req.params.repoId
  const name = 'Primer Documento'
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