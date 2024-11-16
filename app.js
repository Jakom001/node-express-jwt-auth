const express = require('express');
const mongoose = require('mongoose');
const  authRoutes = require('./routes/authRoute')
const cookieParser = require('cookie-parser')
const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser())

// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = 'mongodb://localhost:27017/node-auth';
mongoose.connect(dbURI)
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log(err));

// routes
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', (req, res) => res.render('smoothies'));
app.use(authRoutes)



// cookies
app.get('/set-cookies', (req, res) =>{
  // res.setHeader('Set-Cookie', 'newUser=true');


  res.cookie('newUser', false, {maxAge: 1800 * 60 * 60 *24, httpOnly:true});
  res.cookie('isEmployee', true);

  res.send("you get the cookies!");
  
})
app.get('/read-cookies', (req, res) => {
  const cookies = req.cookies;

  res.json(cookies.newUser)
})

app.listen(3000, () =>{
  console.log("Server running on port 3000")
})
