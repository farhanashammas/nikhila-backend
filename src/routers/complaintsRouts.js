var express = require('express');
const {complaintModel} = require('../model/complaintModel')
var complaintsRouter = express.Router();

function route() {

    complaintsRouter.route('/')
        .get((req, res) => {
            complaintModel.find((err, data) => {
                if (err) {
                    res.json({ Status: "Error" });
                }
                else {
                    console.log(data);
                    res.json(data);
                }
            });
        });
    // complaintsRouter.route('/')
    //     .post((req, res) => {
            
    //         console.log(req.body);
    //         var complaint = new complaintModel(req.body);
    //         complaint.save((err, result) => {
    //             if (err) {
    //                 res.json({ 'Status': "Error" });
    //             }
    //             else {
    //                 console.log(result);
    //                 res.json({'Status':"Success"});
    //             }
    //         });
    //     });

        complaintsRouter.route('/edit')
        .post((req, res) => {
            complaintModel.findById(req.body.id, (err, data) => {
                if (err) {
                    res.json({ Status: "Error" });
                }
                else {
                    res.json({ Status: "Success", complaint: data });
                }
            });
        });
    complaintsRouter.route('/update')
    .post((req,res)=>{
        console.log(req.body._id);
        complaintModel.findByIdAndUpdate(req.body._id,{$set:req.body},
          (err,result)=>{
            if(err)
            {
                res.json({Status:"Error"});
            }
            else{
                res.json({Status:"Success"});
            }
          });
    });

    complaintsRouter.route('/delete')
    .post((req,res)=>{
        complaintModel.findByIdAndDelete(req.body.id,(err,result)=>{
            console.log(req.body.id)
            if(err){
                res.json({Status:"Error"});
            }
            else{
                res.json({Status:"Success"});
            }
        });
    });

    return complaintsRouter;
}
module.exports = route;