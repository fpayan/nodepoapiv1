var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', msg: "Hello word!"});
});

// router.get('/signup', function(req, res, next) {
//   res.format({
//     html: ()=>{
//       res.send('<h1>This is signup from HTML</h1>');
//     },
//     json: ()=>{
//       res.send('<h1>This is signup from JSON</h1>');
//     },
//     default: ()=>{
//       res.send('<h1>Default response</h1>');
//     }
//   });
  
// });

// router.get('/auth', function(req, res, next) {
//   res.send('<h1>This is auth</h1>');
// });


module.exports = router;
