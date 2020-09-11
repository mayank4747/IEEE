var express=require("express"),
	bodyparser=require("body-parser"),
	flash=require("connect-flash");
var app=express();

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/ieee_web', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to DB!'))
.catch(error => console.log(error.message));
app.use(flash());
app.use(require("express-session")({
	secret:"Hey this is secret  Shhhhhhh !!!",
	resave:false,
	saveUninitialized:false
}))
app.use(bodyparser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(function(req,res,next){
	res.locals.currentuser=req.user;
	res.locals.error=req.flash("error");
	res.locals.warn=req.flash("warn");
	res.locals.message=req.flash("success");
	next();
})



var userschema= new mongoose.Schema({
	fname : String,
	lname: String,
	email : String,
	uname: String,
	pname:String
	
});
var user=mongoose.model("user",userschema);
//user.create({
//	fname : "mayank",
//	lname: "kushwah",
//	email : "sess@gmail.com",
//	uname:"makarov",
//	pname:"123321"
	
//});

app.get("/",function(req,res){
	res.render("home");
});
//app.get("/form",function(req,res){
//	user.find({},function(err,user){
//		if(err){
//			console.log("error");
//		}else{
//			res.render("form",{user:user});
//		}
//	});
//});
app.get("/form",function(req,res){
	user.find({},function(err,user){
		if(err){
			console.log("error")
		}else{
			res.render("form",{user:user})
		}
	})
})
app.post("/form",function(req,res){
	user.create(req.body.user,function(err,newuser){
		if(err){
			console.log("some error");
		}else{
			req.flash("error","Please Log In First !!");
			res.render("welcome");
		}
	})
});

app.listen(process.env.PORT || 4000, process.env.IP ,function()
		   {
	console.log("listening to port 4000");
});


