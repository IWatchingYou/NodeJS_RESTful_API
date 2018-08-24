## NodeJS API with Mongodb

1. ### Introduction

  * #### What is RESTful API ?
  
    A RESTful API is an application program interface (API) that uses HTTP requests to GET, PUT, POST and DELETE data.

    A RESTful API -- also referred to as a RESTful web service -- is based on representational state transfer (REST) technology, 
    an architectural style and approach to communications often used in web services development.
  
  * #### What is Mongo DB ?
    
    MongoDB is an open-source, document database designed for ease of development and scaling. 
    The Manual introduces key concepts in MongoDB, presents the query language,
    and provides operational and administrative considerations and procedures as well as a comprehensive reference section.
  
  * #### Why use NODE JS for build API ?
  
    Node.js is an application runtime environment that allows you to write server-side applications in JavaScript. 
    Thanks to its unique I/O model, it excels at the sort of scalable and real-time situations we are increasingly demanding of our servers.
    It’s also lightweight, efficient, and its ability to use JavaScript on both frontend and backend opens new avenues for development.
    It comes as no surprise that so many big companies have leveraged Node.js in production. In this article,
    I want to discuss when it is worth using Node.js, and in what cases it might not be the best idea.

2. ### Setup

    * #### Download install NODEJS
    * #### Download install MongoDB
    * #### Create project
      ```
        $ mkdir mode_trash_talk
      ```
    * #### Initialize npm
      ```
        $ npm init
      ```
    * #### Install package
      ```
        $ npm i -s nodemon
        $ npm i -s express
        $ npm i -s body-parser
        $ npm i -s mongoose
      ```

3. ### About use in code

    * #### make port listen

      * Create file server.js
        ```
          $ touch server.js
          $ nano server.js
        ```
        next
        ``` javascript
          const http = require('http');
          const express = require('express');
          const app = express();
          const bodyParser = require('body-parser');
          const mongoose = require('mongoose');
          const port = process.env.port || 3000;
          const server = http.createServer(app);

          const ROUTE_NAME = require('./routes/ROUTE_NAME');

          const DATABASE_NAME = 'Your_Database';

          mongoose.connect(`mongodb://localhost:27017/${DATABASE_NAME}`, {useNewUrlParser: true});
          mongoose.createConnection();

          app.use((req, res, next)=>{
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
            res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
            res.setHeader('Access-Control-Allow-Credentials', true);
            next();
          });

          app.use(bodyParser.urlencoded({
            extended: false
          }));

          app.use(bodyParser.json());

          app.use('link', DATABASE_NAME);

          server.listen(port);
        ```

      * Create folder and file models
        ```
          $ mkdir models
          $ touch models\mode.js
        ```
        next
        ``` javascript
          const mongoose = require('mongoose');

          var SCHEMA_NAME = new mongoose.Schema({
            title: String,
            description: String,
            uploads: Array,
            created_at: {
              type: Date,
              default: new Date(+new Date() + 7*24*60*60*1000)
            }
          });

          module.exports = mongoose.model('COLLECTION_NAME', SCHEMA_NAME);
        ```
      * Create folder routes
        ```
          $ mkdir routes
          $ touch routes\mode.js
        ```
        next
        ``` javascript
        const express = require('express');
        const router = express.Router();
        const newModel = require('../models/mode');

        router.get('/mode', (req, res)=>{
          newModel.find().exec()
          .then(news => {
            res.status(200).send({ count: news.length, renders: news, message: res.statusMessage })
          })
          .catch(err => {
            res.status(400).send({message: err.statusMessage})
          })
        });

        router.get('/mode/:id', (req, res)=>{});

        router.post('/mode', (req, res)=>{
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

        router.put('/mode/:id', (req, res)=>{

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
        ```

4. ### Deloy project

5. ### References

    [https://searchmicroservices.techtarget.com](https://searchmicroservices.techtarget.com/definition/RESTful-API)
    
    [https://www.mongodb.com](https://www.mongodb.com/what-is-mongodb)
