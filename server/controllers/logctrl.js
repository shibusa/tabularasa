var mongoose = require('mongoose');
var User = mongoose.model('User')
module.exports = (function(){
  return{
    currentuser: function(req,res){
      // console.log(req.body)
      User.findOne({_id:req.body._id}, function(searcherr, data){
        if (searcherr){
          res.json({err: searcherr})
        }
        else{
          // console.log(data)
          res.json(data)
        }
      })
    },
    logreg: function (req, res){
      // console.log(req.body)
      User.findOne({name: req.body.name}, function(searcherr, data){
        if (searcherr) {
          console.log("Search error:", searcherr)
          res.json({result: false})
        }

        else if (!data){
          var newName = new User(req.body)
          console.log(newName)
          newName.save(function(saveerr){
            if (saveerr){
              console.log("Save error:", saveerr)
              res.json({result: false})
            }

            else {
              console.log("New user:", newName.name)
              res.json({result: true, _id: newName._id})
            }
          })
        }

        else {
          console.log("Returning user:", data.name)
          res.json({result: true, _id: data._id})
        }
      })
    },
  }
})();
console.log("Login controller loaded")
