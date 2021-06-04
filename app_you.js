const express = require("express");
const session = require("express-session");
const MongoDBSession=require("connect-mongodb-session")(session);
const mongoose=require("mongoose");
const app=express();
const mongoURI="mongodb://localhost:27017/sessions";
mongoose.connect(mongoURI,{
  useNewUrlParser:true,
  useCreateIndex:true,
  useUnifiedTopology:true
})
.then(res=>{
  console.log("Mongodb Connected");
});

const store=new MongoDBSession({
  uri:mongoURI,
  collection:"mySession"
});

app.use(
  session({
    secret: "key that will sign cookie",
    resave: false,
    saveUninitialized: false,
    store:store
  })
);

app.get("/", function (req, res) {
    req.session.isAuth=true;
  
  res.send("hello session tut");
});

app.listen(5000, console.log("server running on 5000"));
