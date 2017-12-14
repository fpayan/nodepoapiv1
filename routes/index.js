var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  let tt = req.t("FIRST_NUMBER_SHOULD_BE_SMALLER_THAN_SECOND");
  /*
  if(req.language.startsWith('es') || req.query.lng.startsWith('es')){
    tt = req.t("USER_NOT_FOUND", "Usuario no encontrado");
  }else if(req.language.startsWith('en') || req.query.lng.startsWith('en')){
    tt = req.t("USER_NOT_FOUND", "User no found");
  }else{
    tt = req.t("USER_NOT_FOUND", ["User no found", "Usuario no encontrado"]);
  }*/
  console.log('ttttttt ', tt, req.language);
  res.render('index', { title: 'Express', msg: tt});
});

router.get('/signup', function(req, res, next) {
  res.format({
    html: ()=>{
      res.send('<h1>This is signup from HTML</h1>');
    },
    json: ()=>{
      res.send('<h1>This is signup from JSON</h1>');
    },
    default: ()=>{
      res.send('<h1>Default response</h1>');
    }
  });
  
});

router.get('/auth', function(req, res, next) {
  res.send('<h1>This is auth</h1>');
});


module.exports = router;
