const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const mongoose = require('mongoose');
const bodyparser =require("body-parser");
const { response } = require("express");
mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser: true});
const port = 8000;

// define mongoose
const contactSchema = new mongoose.Schema({
    name: String,
    Phone: String,
    email: String,
    Address: String,
    concern: String,
});
 const Contact = mongoose.model('Contact', contactSchema);

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory

// ENDPOINTS
app.get('/', (req, res)=>{
    const params = {}
    res.status(200).render('home.pug', params);
})
app.get('/contact', (req, res)=>{
    const params = {}
    res.status(200).render('contact.pug', params);
})
app.post('/contact', (req, res)=>{
    var myData = new Contact(req.body);
    myData.save().then(()=>{
        res.send("This item has been saved successfully to the database")
    }).catch(()=>{
        res.status(400).send("item was not to be saved in database ")
    })
    // res.status(200).render('contact.pug', params);
})

// app.post('/contact', (req, res)=>{
//     name = req.body.name
//     Phone= req.body.Phone
//     email = req.body.email
//     Address = req.body.Address
//     concern = req.body.concern

//     let outputToWrite = 
//     `the name of the client is = ${name},
//      phone no. =${Phone} ,
//      email ad. =${email},
//      address  = ${Address},
//      concern =  ${concern}`
//     fs.writeFileSync('contact_output.txt', outputToWrite)
//     const params = {'message': 'Your form has been submitted successfully'}
//     res.status(200).render('index.pug', params);

// })



// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});