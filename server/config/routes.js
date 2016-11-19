console.log("Routes loaded")
var bectrl = require('../controllers/logctrl.js')
var qactrl = require('../controllers/qactrl.js')
module.exports = function(app){
  //auth routes
  app.post('/currentuser', function(req,res){
    bectrl.currentuser(req,res);
  });
  app.post('/logreg', function(req, res){
    bectrl.logreg(req, res);
  });

  //qa routes
  app.get('/everything', function(req,res){
    qactrl.everything(req,res);
  });
  app.post('/justone', function(req,res){
    qactrl.justone(req,res);
  });
  app.post('/newquestion', function(req,res){
    qactrl.newquestion(req,res);
  });
  app.post('/newanswer', function(req,res){
    qactrl.newanswer(req,res);
  });
  app.post('/like', function(req,res){
    qactrl.like(req,res);
  });
}
