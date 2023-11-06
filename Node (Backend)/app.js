const express = require('express');     // inserted the express package
const mongoose = require('mongoose');    // DB Package
const bodyParser = require('body-parser'); // Body Parser (package): Accessing the POST Method
const cors = require('cors');           // importing CORS policies (Connect Backend with Frontend)
const dotenv = require('dotenv');       // Environmental File
const passport = require('passport');   // For Social Media Login
const cookieSession = require('cookie-session');

const app = express();                  // assigning the express component in app variable

const routes = require('./Routes/index');
const paymentRoutes = require('./Controllers/payment');
const passportSetup = require('./Controllers/passport');      // Social Media Login Setup
const authRoute = require('./Controllers/auth');          // Social Media Login Routing Part

app.use(cookieSession({ name:"Session", keys:["edureka"], makAge: 24*60*60*1000 }));

const corsOptions = {
    origin:'http://localhost:3000', 
    credentials:true,            
    optionSuccessStatus:200
}

dotenv.config();

app.use(cors(corsOptions));
app.use(bodyParser.json()); 
app.use(passport.initialize());
app.use(passport.session());

app.use('/', routes);                       // If any requests are made it redirects to routes.
app.use('/api/payment', paymentRoutes);    // If any payment requests are made it redirects to paymentRoutes.
app.use('/auth', authRoute);                // If any social media authentication requests are made it redirects to authRoute.

const port = 5500;
const hostname = 'localhost';

const dbUrl = 'mongodb://127.0.0.1:27017/zomato-79';    // mongodb Shell Connection
const atlasDbUrl='mongodb+srv://shrutiguptabhu:SYhQUKcqrrEeGmp8@cluster0.zcz6o6j.mongodb.net/zomato_clone?retryWrites=true&w=majority'; 

//mongodb Atlas connection
// mongodb+srv://<username>:<password>@cluster0.xwpmebe.mongodb.net/<DB_Name>?retryWrites=true&w=majority

mongoose.connect(atlasDbUrl,{useNewUrlParser: true, useUnifiedTopology: true})

.then (res => {
    app.listen(port, hostname, () => {
        console.log(`Server is running at ${hostname}: ${port}`);
    });
})
.catch(err => console.log(err));
