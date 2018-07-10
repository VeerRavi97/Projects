


function admin (req, res, next) {
 

  if(!req.user.isAdmin) return res.json({
 success:false,
 message:"Access Denied"
    

  });
  next();

}

module.exports=admin;