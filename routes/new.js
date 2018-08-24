const express = require('express');
const router = express.Router();
const newModel = require('../models/new');

router.get('/news', (req, res)=>{
  newModel.find().exec()
  .then(news => {
    res.status(200).send({ count: news.length, renders: news, message: res.statusMessage })
  })
  .catch(err => {
    res.status(400).send({message: err.statusMessage})
  })
});

router.get('/new/:id', (req, res)=>{});

router.post('/new', (req, res)=>{
  const data = new newModel({
    title: req.body.title,
    description: req.body.description,
    uploads: req.body.uploads
  });

  data.save()
  .then(resData=> {
    res.status(201).send(resData);
  })
  .catch(err=>{
    res.status(400).send(err);
  })
});

router.put('/new/:id', (req, res)=>{

  newModel.update({_id: req.params.id}, {$set: {
    title: req.body.title,
    description: req.body.description,
    uploads: req.body.uploads
  }})
  .then(resData=> {
    res.status(200).send(resData);
  })
  .catch(err=>{
    res.status(400).send(err);
  })

});

router.delete('/new/:id', (req, res)=>{
  
  newModel.remove({_id: req.params.id})
  .then(resData=> {
    res.status(200).send(resData);
  })
  .catch(err=>{
    res.status(400).send(err);
  })

});

module.exports = router;