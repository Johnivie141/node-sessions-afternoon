let swag = require('../models/swag');

module.exports={
    search:(req,res,next)=>{
       if (! req.query.category) res.status(200).send(swag);
       else res.status(200).send(swag.filter(prod=>{return prod.category === req.query.category;}));
       

    }
}