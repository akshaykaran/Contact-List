const express = require ('express');
const path = require('path');
const env = require("dotenv").config();
const port = process.env.PORT || 8000;




const db = require('./config/mongoose');
const Contact = require('./models/contact');


const app = express();

app.set('view engine', 'ejs');
app.set('views',path.join(__dirname, 'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));

//MIDDLEWAERE 1
// app.use(function(req, res, next){
//     console.log('middleware 1 called');
//     // next();
// });

// //MIDDLEWAERE 2
// app.use(function(req, res, next){
//     console.log('middleware 2 called');
//     next();
// });



var contactList = [
    {
        name: "Akshay",
        phone: "1111111111"
    }, 
    {
        name: "Vinayak",
        phone: "1234567890"
    }, 
    {
        name: "Coding Ninjas",
        phone: "5216513135"
    }
]


app.get('/', function(req, res){
    // console.log(__dirname);
    Contact.find({}, function(err, contacts){
        if(err){
            console.log('Error in fetching contacts from db');
            return;
        }

        return res.render('home', {
            title:"My Contacts List",
            contact_List: contacts
        });
    });
 });


app.get('/practice', function(req, res){
    return res.render('practice', {
        title: "Let is play with EJS"
    });
});


app.post('/create-contact', function(req, res){
    // contactList.push({
    //     name: req.body.name,
    //     phone: req.body.phone
    // });

    // contactList.push(req.body);
    Contact.create({
        name: req.body.name,
        phone: req.body.phone
    },function(err, newContact){
            if(err){console.log('error in creating a contact!');
            return;}

            // console.log('***********', newContact);
            return res.redirect('back');
        });

});

// FOR DELETING A CONTACT

app.get('/delete-contact', function(req, res){
    //let phone = req.params.phone;
    let id = req.query.id;

    Contact.findByIdAndDelete(id, function(err){
        if(err){
            console.log('error in deleting an object from database');
            return;
        }
        return res.redirect('back');
    });
    // let contactIndex = contactList.findIndex(contact => contact.phone == phone);

    // if(contactIndex != -1){
    //     contactList.splice(contactIndex, 1);
    // }

   
});




app.listen(port, function(err){
    if (err){
        console.log('error in running the server', err);
    }console.log('Yep!My Express server is running on Port:', port);
    
});
