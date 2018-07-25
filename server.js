let express=require('express');
const request =require('request');
const bodyParser=require('body-parser');
let app=express();
let apiKey='16d448dec1c0f40685bbe7b20e793fe1';
const PORT= process.env.port;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine','ejs');

app.get('/', function(req, res){
  res.render('index',{weather:null, error:null});
})

app.post('/',function(req, res){
  let city=req.body.city;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  request(url, function(err,response,body){
    if(err){
      res.render('index',{weather:null,error:'Error try again'});}
    else{
        let weather=JSON.parse(body)
        if(weather.main==undefined){
          res.render('index',{weather:null,error:"jibberish text"})
        }else{
          let weatherText=`It's ${weather.main.temp} degrees in ${weather.name}`;
          res.render('index',{weather:weatherText, error:null});
        }

    }
  })

})

app.listen(PORT,function(err){
  if(err){
    console.log(err);
  }else{
    console.log("app listeneing onport 3000");
  }
})
