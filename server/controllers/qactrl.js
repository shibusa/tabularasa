var mongoose = require('mongoose');
var User = mongoose.model('User');
var Question = mongoose.model('Question');
var Answer = mongoose.model('Answer');
module.exports = (function(){
  return{
    everything: function(req,res){
      Question.find({}, function(err, data){
        if(err){
          res.json({x: "Message filter mismatch"})
        }
        else{
          res.json({x: data})
        }
      })
    },
    justone: function(req,res){
      Question.findOne({_id:req.body._id}).populate({path: 'answers'}).exec(function(finderr,data){
        if(finderr){
          res.json({x: "Message filter mismatch"})
        }
        else{
          Question.populate(data, {path: 'answers._user', model: 'User'}, function(poperr, popdata){
            if(poperr){
              res.json({x: "Unable to populate answers"})
            }
            else{
              res.json(popdata)
            }
          })
        }
      })
    },
    newquestion: function(req,res){
      console.log(req.body)
      User.findOne({_id: req.body.findId}, function(findusererr, data){
        if(findusererr){
          req.json({x: "User filter mismatch"})
        }
        else{
          var newQuestion = new Question({question: req.body.data.question, description: req.body.data.description});
          newQuestion._user = data._id;
          newQuestion.save(function(qsaveerr){
            if(qsaveerr){
              res.json({x: "Question not saved"})
            }
            else{
              data.questions.push(newQuestion)
              data.save(function(usaveerr){
                if(usaveerr){
                  res.json({x: "User update not saved"})
                }
                else{
                  res.json({x: "Success"})
                }
              })
            }
          })
        }
      })
    },
    newanswer: function(req,res){
      console.log(req.body)
      User.findOne({_id: req.body.findId}, function(finderr,data){
        if(finderr){
          req.json({x: "User filter mismatch"})
        }
        else{
          Question.findOne({_id: req.body._id}, function(findqerr,qdata){
            if(findqerr){
              res.json({x: "Question filter mismatch"})
            }
            else{
              var newAnswer = new Answer({answer: req.body.data.answer, description: req.body.data.description, likes: 0});
              newAnswer._user = data._id;
              newAnswer._question = qdata._id;
              newAnswer.save(function(asaveerr){
                if(asaveerr){
                  res.json({x: "Answer not saved"})
                }
                else{
                  qdata.answers.push(newAnswer)
                  qdata.save(function(qsaveerr){
                    if(qsaveerr){
                      res.json({x: "Question update not saved"})
                    }
                    else{
                      data.answers.push(newAnswer)
                      data.save(function(usaveerr){
                        if(usaveerr){
                          res.json({x: "User update not saved"})
                        }
                        else{
                          res.json({x: "Success"})
                        }
                      })
                    }
                  })
                }
              })
            }
          })
        }
      })
    },
    like: function(req,res){
      Answer.findOneAndUpdate({_id: req.body._id},{$inc: {likes:1}},function(likeerr,data){
        if(likeerr){
          res.json({x: "Like update unsuccessful"})
        }
        else{
          res.json({x: "Success"})
        }
      })
    }
  }
})();
console.log("QA controller loaded")
