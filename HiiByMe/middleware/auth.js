const jwt = require('jsonwebtoken');
const config = require('config').get('secret');
// const config=require('../config/config.js');

 function auth (req, res, next) {
  const bearerHeader = req.headers["authorization"];
  // console.log(req.body);
  // console.log("bearerHeader",bearerHeader);
let bearer = bearerHeader.split(" ");
// console.log("bearer",bearer);
  const token = bearer[1];

  // console.log("token is",token);
  if (!token) return res.status(401).send('Access denied. No token provided.');
 // console.log("secret",config);
  jwt.verify(token, config, function(err, decoded) {      
      if (err) {
        // console.log("error is ",err);
        return res.json({ success: false, message: 'Invalid token.' });    
      } else {
        // console.log("decoded is",decoded);
        req.user = decoded;    
        next();
      }
    });
}

module.exports=auth;