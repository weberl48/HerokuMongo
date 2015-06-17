var express = require('express');
var router = express.Router();
var db = require('monk')(process.env.MONGOLAB_URI || 'localhost/album_demo');
var albumCollection = db.get('albums');

// router.post('/albums', function(req, res, next) {
//   res.redirect('/albums');
// });

router.get('/albums', function(req, res, next) {
  albumCollection.find({}, function (err, records) {
    res.render('albums/index', {allAlbums: records});
  });
});

router.get('/albums/new', function(req, res, next){
  res.render("albums/new");
});

router.get('/albums/edit', function(req, res, next){
  res.render("albums/edit");
});

router.get('/albums/:id', function(req, res, next) {
  albumCollection.findOne({_id: req.params.id}, function (err, record) {
    res.render('albums/show', {theAlbum: record});
  });
});

router.post('/albums', function(req, res, next) {
  albumCollection.insert({ name: req.body.album_name, genre:req.body.genre, artist: req.body.artist, explicit: req.body.explicit, raiting: req.body.raiting });
  res.redirect('/albums');
});

router.get('/albums/:id/edit', function(req, res, next) {
  albumCollection.findOne({_id: req.params.id}, function (err, record) {
    res.render('albums/edit', {theAlbum: record});
  });
});

router.post('/albums/:id/update', function(req, res, next) {
  albumCollection.update({_id: req.params.id}, {
    name: req.body.album_name,  artist: req.body.artist, genre: req.body.genre
  });
    res.redirect('/albums');

});

router.post('/albums/:id/delete', function(req, res, next) {
  albumCollection.remove({_id: req.params.id}
  );
  res.redirect('/albums');
});



module.exports = router;
