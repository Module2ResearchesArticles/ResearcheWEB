const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Repository = require('../models/Repository');
const Document = require('../models/Document');
const moment = require('moment');

function isAuthorized(req, res, next){
  Repository.findById(req.params.id)
      .then (repository => {
          if(repository.author.equals(req.user._id)){
              return next()
          } else {
              console.log('aquí no puedes entrar')
              res.redirect('/')
          }
      })
}

router.post('/create-repository',(req, res) => {
  const {name,description} = req.body;
  console.log(req);
  const author = req.user._id; 
  Repository.create({name,description,author})
            .then(repository => {
              res.redirect(`/${req.user._id}`)
            })
})

router.get('/repositories/:id',isAuthorized,(req, res) => {
    const user = req.user
  Repository.findById(req.params.id)
      .then(repository => {
          Document.find({repository:repository._id})
            .then(documents => {
                /* var documentsandDates = documents.map((doc) => {
                    let formatDate = moment(doc.created_at).fromNow();
                    let newObj = Object.defineProperty(doc,'createdFrom',{value:formatDate});
                    console.log(newObj);
                    return newObj;
                  });
                  console.log(documentsandDates); */
                  documents.forEach((e,index) =>{
                      documents[index].perro = moment(e.created_at).fromNow();
                  });
                  console.log(documents);
                res.render('private/repository-view',{repository, documents, user})
            })
         
      })
      .catch(err => {
          console.log(err)
      })
})

router.post('/delete/:id', (req, res) => {
  Repository.findByIdAndRemove(req.params.id)
      .then(() =>{
          res.redirect(`/${req.user._id}`)
      })
})

router.post('/update/:id', (req, res) => {
  Repository.findById(req.params.id)
      .then(repository => {
          const update = true;
          res.render('private/repository-view',{repository, update})
      })
      .catch(err => {
          console.log(err)
      })
})

router.post('/update-repository/:id', (req, res) => {
  Repository.findByIdAndUpdate(req.params.id, {$set: req.body})
    .then(repository => {
        res.redirect(`/repositories/${repository._id}`)
    })
})


module.exports = router;
