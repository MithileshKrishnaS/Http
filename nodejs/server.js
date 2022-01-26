const express = require('express');
const cors = require('cors');
var fs = require('fs');
const app = express();
var port = 8081;
app.use(express.static('public'))
app.listen(port, () => console.log(`listening on port ${port}!`));
app.all("*", function(req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    next();
  });
app.use(cors(
    {
        origin: "*",
    }
))
app.get('/', function(req, res){
    res.sendFile(__dirname+'/send.json');
});

app.post('/', function(req, res){
    res.json({user:req.query.user});
})
 
app.put('/:id',function(req,res){
    var json=fs.readFileSync('send.json')
    var data=JSON.parse(json)
    var newvalue=req.params.id;  
    data = data.map(function(data) {
        data[newvalue] = data['user']; 
        delete data['user']; 
        return data;
    });
    console.log(data)
    res.json(data)
})
