var bodyParser = require("body-parser"),
    express 	   = require("express"),
    app 		   = express();

const convertCurrency = require('./currency-convert');

app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
const port = process.env.PORT || 3000;


app.get("/",function(req,res) {
	console.log("route /");
	res.redirect("/convertCurrency");
});


app.get("/convertCurrency",function(req,res) {
	console.log("get route");
	res.render("index",{status:""});

});

app.post("/convertCurrency",function(req,res) {
  var amount = req.body.conv.amount;
  var from = req.body.conv.from;
  var to = req.body.conv.to
  if(from === to ){
    res.render("index",{status:"Select different currency in From or To field!"});
  }
  convertCurrency.convertCurrencyAlt(from,to,amount).then((status) => {
    res.render("index",{status:status});
  });

	});






app.listen(port, () => {
  console.log(`Server is up on port: ${port}`);
});
