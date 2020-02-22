//jshint esversion:6
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const ejs = require('ejs');
const express = require('express');

const app = express()

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'));

mongoose.connect('mongodb://localhost:27017/wikiDB', {useNewUrlParser: true, useUnifiedTopology: true});

articleSchema = {
  title: String,
  content: String
}

const Article = mongoose.model('Article', articleSchema);

////////////////// Requests Targeting All Articles //////////////////
app.route('/articles')
  .get(function(req, res){
    Article.find(function(err, foundArticles){
      if (!err){
        res.send(foundArticles);
      } else {
        res.send(err);
      }
    });
  })
  .post(function(req, res){
    const newArticle = new Article({
      title: req.body.title,
      content: req.body.content,
    });

    newArticle.save(function(err){
      if (!err){
        res.send("Successfully added a new article!")
      } else {
        res.send(err);
      }
    });
  })
  .delete(function(req, res){
    Article.deleteMany(function(err){
      if (!err){
        res.send("Successfully deleted all articles!");
      } else {
        res.send(err);
      }
    });
  });

////////////////// Requests Targeting Specific Articles //////////////////
app.route('/articles/:articleTitle')
  .get(function(req, res){
    Article.findOne({title: req.params.articleTitle}, function(err, foundArticle){
      if (foundArticle){
        res.send(foundArticle);
      } else {
        res.send('No article with that title found.');
      }
    });
  })
  .put(function(req, res){
    Article.update(
      {title: req.params.articleTitle},
      {title: req.body.title, content: req.body.content},
      {overwrite: true},
      function(err){
        if (!err){
          res.send('Successfully uploaded article!');
        }
      }
    );
  })
  .patch(function(req, res){
    Article.update(
      {title: req.params.articleTitle},
      {$set: req.body},
      function(err){
        if(!err){
          res.send('Successfully updated article.');
        } else {
          res.send(err);
        }
      }
    );
  })
  .delete(function(req, res){
    Article.deleteOne({tite: req.body.articleTitle}, function(err){
      if (!err){
        res.send("Successfully deleted article!");
      } else {
        res.send(err);
      }
    });
  });


app.listen(3000, () => console.log(`Server running on port 3000!`))
