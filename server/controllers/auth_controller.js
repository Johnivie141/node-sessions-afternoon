const users =require('../models/users');
let id=1;

module.exports ={
  login: (req,res,next)=>{
    
      let found = users.filter(usr=>{return (usr.username === req.body.username && usr.password === req.body.password);})
       if (found && found.length >0){
         req.session.user.username= found[0].username;
         res.status(200).send(req.session.user);
       }
       else{
           res.status(500);
       }
  },
  register: (req,res,next)=>{
     let{username,password} = req.body;
     users.push({id,username,password});
     id++;
     req.session.user.username=username;
     res.status(200).send(req.session.user);

    
  },
  signout:(req,res,next)=>{
     req.session.destroy();
     res.send(req.session);
    
  },
  getUser:(req,res,next)=>{
      res.status(200).send(req.session.user);
      ;
  }

}