const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json({extended:true}));
app.use(express.static('views'));
app.set('view engine', 'ejs');



//MongoDBStuff
mongoose.connect('mongodb+srv://AllamLahlouh:AllamLahlouh12345@cluster0.w5avu.mongodb.net/?retryWrites=true&w=majority');
const userC = mongoose.model('userC', {
    name: String,
    phoneNumber: String, 
    passWord: String, 
    whatsAppNumber: String, 
    worker: Boolean, 
    age: Number, 
    locationNow: String, 
    havePremition: Boolean, 
    profetPerDay: Number, 
    workingField: [], 
    avalableNow: Boolean, 
    provideHealthInsurance: Boolean, 
    posts: [],
});

//Vars
let username, password, phonenumber, whatsappnumber, worker, age, locationnow, havepremition,
 profetperday, workingfield, avalablenow, providehealthinsurance
    ,setusername, setpassword, setphonenumber, setwhatsappnumber, setworker, setage, setlocationnow, sethavepremition
    , setprofetperday, setworkingfield, setavalablenow, setprovidehealthinsurance
    , singInphonenumber, singInpassword
 , UserDataDocAfterSingIn
    , canEnterPages = false, 
 postedText, 
    userPostsCopy = []
    , enterBySingIn = false, enterBySingUp = false, 
    specifyPhoneNumber = "";

//HomePage
app.get('/', function(req, res){    
    res.render('index', {});
})

app.post('/', function(req, res){
    canEnterPages = true;
    res.send('This is homePage POST!');
})





// /posts&courses/blog-search
app.get('/posts&courses/blog-search', function(req, res){
    res.render('posts&courses/blog-search', {});
})
app.post('/posts&courses/blog-search', function(req, res){
    res.send('This is homePage POST!');
})




// /find/FindContractor
app.get('/find/FindContractor', function(req, res){
    if(canEnterPages == true){
        res.render('find/FindContractor', {});
    } else{
        res.redirect('/singup&in&password/singIn')
    }
})
app.post('/find/FindContractor', function(req, res){
    res.send('This is homePage POST!');
})




// /account/account-general
app.get('/account/account-general', function(req, res){
    if(canEnterPages == true){
        res.render('account/account-general', {});
    } else{
        res.redirect('/singup&in&password/singIn')
    }
})
app.post('/account/account-general', function(req, res){
    res.send('This is homePage POST!');
})

// /account/account-security
app.get('/account/account-security', function(req, res){
    res.render('account/account-security', {});
})
app.post('/account/account-security', function(req, res){
    res.send('This is homePage POST!');
})

// /account/account-notifications
app.get('/account/account-notifications', function(req, res){
    res.render('account/account-notifications', {});
})
app.post('/account/account-notifications', function(req, res){
    res.send('This is homePage POST!');
})





// /singup&in&password/singIn
app.get('/singup&in&password/singIn', function(req, res){
    canEnterPages = false;
    res.render('singup&in&password/singIn', {});
})
app.post('/singup&in&password/singIn', function(req, res){
    canEnterPages = false;
    enterBySingIn = true;
    singInphonenumber = req.body.singInPhoneNumber;
    singInpassword = req.body.singInPassWord;

    userC.findOne({phoneNumber: singInphonenumber, passWord: singInpassword,}, function(err, doc){
        if(err){
            console.log(err);
        } 
        if(doc == null){
            res.redirect('/singup&in&password/singUp');
        }
        else {
            UserDataDocAfterSingIn = doc;
            //console.log(UserDataDocAfterSingIn);
            canEnterPages = true;
            res.redirect('/');
        }
    })
    //console.log(singInphonenumber + " " + singInpassword);
})




// /singup&in&password/singUp
app.get('/singup&in&password/singUp', function(req, res){
    canEnterPages = false;
    res.render('singup&in&password/singUp', {});
})
app.post('/singup&in&password/singUp', function(req, res){
    enterBySingUp = true;
    username = req.body.userName;
    password = req.body.passWord;
    phonenumber = req.body.phoneNumber;
    whatsappnumber = req.body.whatsAppNumber;
    worker = true;
    if (req.body.worker == "1"){
        worker = true;
    } else {
        worker = false;
    }

    userC.findOne({phoneNumber: phonenumber,}, function(err, doc){
        if(err){
            console.log(err);
        } 
        if(doc == null){
            canEnterPages = true;
            res.redirect('/singup&in&password/getFirstData');
        }
        else {
            console.log("account is already exist!");
            res.send('يوجد حساب في هذا الرقم بالفعل!');
        }
    })
    

    
})


// /singup&in&password/getPassword
app.get('/singup&in&password/getPassword', function(req, res){
    res.render('singup&in&password/getPassword', {});
})
app.post('/singup&in&password/getPassword', function(req, res){
    res.send('This is homePage POST!');
})




// /account/profile
app.get('/account/profile', function(req, res){
    if(canEnterPages == true){
        res.render('account/profile', {});
    } else{
        res.redirect('/singup&in&password/singIn')
    }
})

app.post('/account/profile', function(req, res){
    setusername = req.body.setUserName;
    setpassword = req.body.setPassWord;
    setphonenumber = phonenumber;
    setwhatsappnumber = req.body.setWhatsAppNumber;
    setworker = true;
    if(req.body.setWorker == "1"){
        setworker = true;
    } else {
        setworker = false;
    }
    setage = Number(req.body.setAge);
    setlocationnow = req.body.setLocationNow
    sethavepremition = true;
    if(req.body.setHaveInsurance == "1"){
        sethavepremition = true;
    } else {
        sethavepremition = false;
    }
    setprofetperday = Number(req.body.setProfitPerDay);
    setworkingfield = req.body.setWorkingField;
    setavalablenow = true;
    if(req.body.setAvalableNow == "1"){
        setavalablenow = true;
    } else {
        setavalablenow = false;
    }
    setprovidehealthinsurance = true;
    if(req.body.setProvideHealthInsurance == "1") {
        setprovidehealthinsurance = true;
    } else {
        setprovidehealthinsurance = false;
    }




    postedText = req.body.postTextArea; ///////////////////////////////////////////////////////////////////////////////////////
    console.log(postedText);


    if(enterBySingIn == true) {
        specifyPhoneNumber = singInphonenumber;
    } else{
        specifyPhoneNumber = phonenumber;
    }
    console.log(specifyPhoneNumber);

    if(postedText != null){
        userC.findOne({phoneNumber: specifyPhoneNumber}, function(err, doc){
            if(err){
                console.log(err);
            }else {
                userPostsCopy = doc.posts;
            }
        })
        userPostsCopy.push(postedText);

        userC.updateOne({phoneNumber: specifyPhoneNumber}, {
            posts: userPostsCopy,
        }, function(err){
            if(err){
                console.log(err);
            } else {
                console.log(userPostsCopy);
                console.log('SucsessFuly Updated!');
            }
        });
    }




    userC.updateOne({phoneNumber: specifyPhoneNumber}, {
        name: setusername,
        phoneNumber: setphonenumber, 
        passWord: setpassword, 
        whatsAppNumber: setwhatsappnumber, 
        worker: setworker, 
        age: setage, 
        locationNow: setlocationnow, 
        havePremition: sethavepremition, 
        profetPerDay: setprofetperday, 
        workingField: setworkingfield, 
        avalableNow: setavalablenow, 
        provideHealthInsurance: setprovidehealthinsurance, 
    }, function(err){
        if(err){
            console.log(err);
        } else {
            console.log(userPostsCopy);
            console.log('SucsessFuly Updated!');
        }
    });

    res.redirect('/');
})





// /find/FindWorker
app.get('/find/FindWorker', function(req, res){
    if(canEnterPages == true){
        res.render('find/FindWorker', {});
    } else{
        res.redirect('/singup&in&password/singIn')
    }
})
app.post('/find/FindWorker', function(req, res){
    res.send('This is homePage POST!');
})





// /posts&courses/Posts
app.get('/posts&courses/Posts', function(req, res){
    res.render('posts&courses/Posts', {});
})
app.post('/posts&courses/Posts', function(req, res){
    res.send('This is homePage POST!');
})




// /singup&in&password/getFirstData
app.get('/singup&in&password/getFirstData', function(req, res){
    res.render('singup&in&password/getFirstData', {});
})
app.post('/singup&in&password/getFirstData', function(req, res){
    age = Number(req.body.age);
    locationnow = req.body.locationNow;
    havepremition = true;
    if(req.body.havePremition == "1") {
        havepremition = true;
    } else {
        havepremition = false;
    }
    profetperday = Number(req.body.profetPerDay);
    workingfield = req.body.workingField;
    avalablenow = true;
    if(req.body.avalableNow == "1") {
        avalablenow = true;
    } else {
        avalablenow = false;
    }
    providehealthinsurance = true;
    if(req.body.provideHealthInsurance == "1") {
        providehealthinsurance = true;
    } else {
        providehealthinsurance = false;
    }

    const user = new userC({
        name: username,
        phoneNumber: phonenumber, 
        passWord: password, 
        whatsAppNumber: whatsappnumber, 
        worker: worker, 
        age: age, 
        locationNow: locationnow, 
        havePremition: havepremition, 
        profetPerDay: profetperday, 
        workingField: workingfield, 
        avalableNow: avalablenow, 
        provideHealthInsurance: providehealthinsurance, 
    })
    user.save();
    //console.log(username + " " + phonenumber + " " + password +  " " + whatsappnumber + " " + worker + " " +  age + " " + locationnow + " " +  havepremition + " " + profetperday + " " + workingfield + " " + avalablenow + " " + providehealthinsurance + " ");

    res.redirect('/');
})





// /posts&courses/blog-search
// /find/FindContractor
// /account/account-general
// /singup&in&password/singIn
// /singup&in&password/singUp
// /account/profile
// /find/FindWorker
// /posts&courses/Posts
// /account/account-security
// /account/account-notifications
// /singup&in&password/getPassword
// /singup&in&password/getFirstData

const PORT = 3000;
app.listen(PORT, function(){
    console.log('Server Runing on PORT ' + PORT);
})