let swag = require('../models/swag');

module.exports={
add: (req,res)=>{
    if (req.query.id){
        let id =Number(req.query.id);

   
      

        if (swag.findIndex(item=>item.id===id)==-1) {
         
            return res.status(200).send(req.session.user).end();
        }
        else {
            
            let products = swag.filter(product=>{return product.id===id});
           
            if (products && products.length >0){
                req.session.user.cart.push(products[0]);
                
                req.session.user.total += products[0].price;
                res.status(200).send(req.session.user).end();
            }
            res.status(403).end();
        }
            
    }
    res.status(404).end();
},
delete: (req,res)=>{
    if (req.query.id){
        let id=Number(req.query.id);
          req.session.user.cart = req.session.user.cart.filter(prod=>prod.id!==id); 
            
        let products = swag.filter(product=>{return product.id===id});
        if (products && products.length >0){
               req.session.user.total-= products[0].price;
        }

            

    }
    res.status(200).send(req.session.user);
},
checkout: (req,res)=>{
     console.log("checking out");
    req.session.user.cart=[];
    req.session.user.total=0;

    res.status(200).send(req.session.user);
}

}