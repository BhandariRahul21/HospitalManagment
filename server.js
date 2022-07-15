const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
let app = express()

app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended:true}))

let db
let port= process.env.PORT
if (port == null || port== "") {
  port=3000
}

async function go(){
    mongoose.connect('mongodb+srv://todoAppUser:qwertyuiop@cluster0.yuair.mongodb.net/Hospital_Mangment?retryWrites=true&w=majority',{
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    
    app.listen(port)
}

go()

const notesSchema ={
    name:String,
    email:String,
    subject:String,
    message:String
}
const Note= mongoose.model("Note",notesSchema)





app.get("/",function(req,res){
    db.collection('items').find().toArray(function(err,items){
        res.sendFile(__dirname+"/index.html")
    })
    
})



app.post('/create-item',function(req,res){
    // console.log(req.body.email)
    let newBlog = new Note({
        name:req.body.name,
        email:req.body.email,
        subject:req.body.subject,
        message:req.body.message 
    })
    // console.log(newNote)
    newBlog.save();
    // res.send("Thanks For Submiting the form");
    res.redirect('/contact.html')
})

