const express = require('express');
const router = express.Router();
const Document = require('../models/Document');
const upload = require('../helpers/multer');

router.post('/createDocument', upload.single('name') ,(req,res) => {
  const {repository,description,parentDocument} = req.body;
  var locationUrl = req.file.url,
      name= req.file.originalname;
  console.log(`repository: ${repository}, name: ${name}, description: ${description}, url: ${locationUrl}, parentDocument: ${parentDocument} `);
  if(parentDocument === "undefined") {
    Document.create({name,description,repository,locationUrl})
    .then(() => {
      res.redirect(`/repositories/${repository}`);
    })
  }else{
    Document.create({name,description,repository,locationUrl,parentDocument})
    .then(() => {
      res.redirect(`/repositories/${repository}`);
    })
  }
  
});

module.exports = router;