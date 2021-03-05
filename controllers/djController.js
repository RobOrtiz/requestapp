const db = require("../models");
const passport = require("passport")

// Defining methods for the djController
module.exports = {
  // New DJ signup
  create: function(req, res) {
    db.Dj
    .register(req.body, req.body.password)
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
  },
  login: function(req, res) { 
    if(!req.body.username){ 
      res.json({success: false, message: "Username was not given"}) 
    } else { 
      if(!req.body.password){ 
        res.json({success: false, message: "Password was not given"}) 
      }else{ 
        passport.authenticate('local', function (err, user, info) {  
           if(err){ 
             res.json({success: false, message: err}) 
           } else{ 
            if (! user) { 
              res.json({success: false, message: 'username or password incorrect'}) 
            } else{ 
              req.login(user, function(err){ 
                if(err){
                  res.json({success: false, message: "req.login error"}) 
                }else{ 
                  const token =  jwt.sign({userId : user._id,  
                     username:user.username}, secretkey,  
                        {expiresIn: '24h'}) 
                  res.json({success:true, message:"Authentication successful", token: token }); 
                } 
              }) 
            } 
           } 
        })(req, res); 
      } 
    } 
  },
  // login: passport.authenticate("local"), function(req, res) {
  //   db.Dj
  //   .findOne({ _username: req.params._username})
  //   .then(dbModel => res.json(dbModel))
  //   .catch(err => res.status(422).json(err));
  // },
  // create: function(req, res) {
  //   db.Dj
  //   .create(req.body)
  //   .then(dbModel => res.json(dbModel))
  //   .catch(err => res.status(422).json(err));
  // },
  deleteMany: function(req, res) {
    db.Dj
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.deleteMany())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
}