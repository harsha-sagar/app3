var express = require('express');
var Item = require('../models/item');

var itemsRouter = express.Router();

itemsRouter.route('/')
.get(function(req, res){
Item.find(function(err, resItems) {
    if (err) {
        return res.send(err);
    }
    res.json(resItems);
    });
})
.post(function(req, res) {
    var item = new Item(req.body);
    item.save(function(err, resItem) {
        if (err) {
            return res.send(err);
        }
        res.json(resItem);
    });
});

itemsRouter.route('/:id')
.put(function(req, res) {
    Item.findOne({ _id: req.params.id }, function(err, item) {
        if (err) {
            return res.send(err);
        }
        for (prop in req.body) {
            item[prop] = req.body[prop];
        }
        item.save(function(err, resItem) {
        if (err) {
            return res.send(err);
        }
        res.json(resItem);
        });
    });
})
.delete(function(req, res){
    Item.remove({
        _id: req.params.id
    }, function(err, resItem) {
        if (err) {
            return res.send(err);
        }
        res.json(resItem);
    });
});

module.exports = itemsRouter;
