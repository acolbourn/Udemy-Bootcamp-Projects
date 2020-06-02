//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const _ = require('lodash');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect('mongodb+srv://admin:test123@cluster0-h1axi.mongodb.net/todolistDB', {useNewUrlParser: true, useUnifiedTopology: true});

// Create database schema for a single list item
const itemsSchema = {
  name: String
};

const Item = mongoose.model('item', itemsSchema);

const item1 = new Item({
  name: "Welcome to your todo list!"
});

const item2 = new Item({
  name: "Hit the + button to add a new item."
});

const item3 = new Item({
  name: "<-- Hit this to delete an item."
});

const defaultItems = [item1, item2, item3];

// Create database schema to allow multiple different lists
const listSchema = {
  name: String,
  items: [itemsSchema]
};

const List = mongoose.model('List', listSchema);

app.get("/", function(req, res) {
  Item.find({}, function(err, items){
    // If database is empty, add default items
    if (items.length === 0){
      Item.insertMany(defaultItems, function(err){
        if (err){
          console.log(err);
        } else {
          console.log("Default items added!");
        }
      });
      res.redirect('/');
    } else {
      res.render("list", {listTitle: 'Today', newListItems: items});
    }
  });
});

app.post("/", function(req, res){
  const itemName = req.body.newItem;
  const listName = req.body.list;

  const newItem = new Item({
    name: itemName
  });

  // If on home page, save to default home list. Else lookup current list and save to that.
  if (listName === "Today"){
    newItem.save();
    res.redirect('/');
  } else {
    List.findOne({name: listName}, function(err, foundList){
      if (!err) {
        if (foundList){
          foundList.items.push(newItem);
          foundList.save();
          res.redirect('/' + listName);
        }
      }
    });
  }
});

app.post('/delete', function(req, res){
  const checkedItemId = req.body.checkbox;
  const listName = req.body.listName;

  if (listName === "Today") {
    Item.findByIdAndRemove(checkedItemId, function(err){
      if (err){
        console.log(err);
      } else {
        res.redirect('/');
      }
    });
  } else {
      List.findOneAndUpdate({name: listName}, {$pull: {items: {_id: checkedItemId}}}, function(err, foundList){
        if (!err){
          res.redirect("/" + listName);
        }
      });
  }
});

app.get('/:customListName', function(req, res){
  // Get name of new list from url paramater
  const customListName = _.capitalize(req.params.customListName);

  // Check if list already exists
  List.findOne({name: customListName}, function(err, foundList){
    if (!err) {
      if (!foundList){
        // Create a new list
        const list = new List({
          name: customListName,
          items: defaultItems
        })

        list.save();
        res.redirect('/' + customListName);
      } else {
        // Show an existing list
        res.render('list', {listTitle: foundList.name, newListItems: foundList.items});
      }
    }
  });
});

app.get("/about", function(req, res){
  res.render("about");
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port, function() {
  console.log("Server started on port 3000");
});
