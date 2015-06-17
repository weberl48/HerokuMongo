var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// router.get('/albums', function(req, res, next) {
//   albumCollection.find({}, function (err, records) {
//     res.render('albums/index', {allAlbums: records});
//   });
// });
module.exports = router;
