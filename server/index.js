const express = require('express'),
      app = express(),
      bodyParser=require('body-parser'),
      cors=require('cors'),
      session=require('express-session'),
  
      port=3000,
      config = require('/Users/john/security/config/config'),
      checkForSession = require('./middlewares/checkForSession'),
      swagController=require('./controllers/swag_controller'),
      auth = require('./controllers/auth_controller') ,
      cartController = require('./controllers/cart_controller'),
      searchController = require('./controllers/search_controller')  
      ;

app.use(bodyParser());
app.use(cors());

app.use(session({
    secret:config.secret,
    saveUninitialized:false,
    resave:false
}))
app.use(checkForSession);
app.use(express.static("../public/build"));

app.get('/api/swag',swagController.read);

app.post('/api/login',auth.login);
app.post('/api/register',auth.register);
app.post('/api/signout',auth.signout);
app.get('/api/user',auth.getUser);

app.post('/api/cart',cartController.add);
app.post('/api/cart/checkout',cartController.checkout);
app.delete('/api/cart',cartController.delete);


app.get('/api/search',searchController.search);







app.listen(port,()=>{console.log(`listening on port ${port}`)});