const express= require('express');
var app= new express();
const chalk=require('chalk');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
const cors=require('cors');
const path=require('path');
const {signupModel}=require('./src/model/signupModel')


const {complaintModel} =require('./src/model/complaintModel')



app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:true
}));
app.use(express.static(path.join(__dirname,"/public")));
const complaintsRouter=require('./src/routers/complaintsRouts')();

app.use('/complaints',complaintsRouter);


mongoose.connect('mongodb://localhost:27017/complaintReg');
mongoose.set('useFindAndModify', false);
var db=mongoose.connection;
db.on('error',(error)=>{
    console.log(error);
});
db.once('open',()=>{
    console.log("Success");
})


app.post('/signup',function(req,res){
    res.header("Access-Control-Allow-Origin", "*")
    res.header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
    // console.log("haiiaaaiiii")
    console.log(req.body)
    signupModel.findOne({consumerNo:req.body.consumerNo},(err,data)=>{
        
        if(err){
            res.json({'Status':'Error'})
    
        }
       
         else{
                if(!data){
                            var user=new signupModel(req.body);
                            console.log(user)
                             user.save((err,result)=>{
                               if(err){
                                         res.json({'Status':'Error'});
                                    }
                                else{
                                         res.json({'Status':'Success'});
                                 }
                
                             });
                         }
    
                    else{
                             res.json({'Status':'Invalid'})
                         }  
            }
    })
});

app.post('/login',(req,res)=>{
    console.log(req.body);
    signupModel.findOne({consumerNo:req.body.consumerNo,password:req.body.password},(err,data)=>{
        if (err) {
            res.json({ 'Status': 'Error' });
        }
        else if (!data) {
            res.json({ 'Status': 'Invalid' });
        }
        else {
            res.json({ 'Status': 'Success' });
        }
    })
})

       app.post('/insert',(req, res) => {
            
            console.log(req.body);
            var complaint = new complaintModel(req.body);
            complaint.save((err, result) => {
                if (err) {
                    res.json({ 'Status': "Error" });
                }
                else {
                    console.log(result);
                    res.json({'Status':"Success"});
                }
            });
        });




        app.route('/')
        .get((req, res) => {
            complaintModel.find((err, data) => {
                if (err) {
                    res.json({ 'Status': "Error" });
                }
                else {
                    console.log(data);
                    res.json({'complaits':'data'});
                }
            });
        });
app.listen(3000, function(){
    console.log("listening to port "+chalk.green('3000'));
});
