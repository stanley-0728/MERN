const express=require('express');
const app = express();
const logger=require('morgan');
const mongoose=require('mongoose');
const passport=require('./passport/index');
const cookieSession = require('cookie-session');
const db = require('./config/keys');
const path = require('path');

mongoose
  .connect(
    db.mongoURI,
    { useNewUrlParser: true ,useUnifiedTopology: true}
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieSession({
    name: 'session',
    keys: ['key1', 'key2']
  }));
  app.use(passport.initialize());
app.use(passport.session());

if (process.env.NODE_ENV === "production") {

  // Set static folder
  // All the javascript and css files will be read and served from this folder
  app.use(express.static("client/build"));

  // index.html for all page routes  html or routing and naviagtion
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client/build/index.html"));
  });
}

app.use('/api/favourites',require('./routes/favourite'));
app.use('/api/users',require('./routes/users'));
app.use('/api/comment',require('./routes/comment'));
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));