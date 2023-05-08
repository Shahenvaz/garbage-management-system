const express = require('express')
const app = new express()
require("dotenv").config()
const {Connection}  = require('./database')
const Prometheus = require('prom-client')
const db =  new Connection

app.use(express.urlencoded({ extended: false }))
app.use(express.static('public'))
app.set('view engine', 'ejs')

// cookies work start here

var cookieParser = require('cookie-parser');
app.use(cookieParser());

// cookies work end here






//graphana metrics

const client = require('prom-client');


// Create a Registry to register the metrics
const register = new client.Registry();

// const resource = 'example-resource';
// const value = 42;
// register.labels(resource).set(value);


client.collectDefaultMetrics({register});

client.collectDefaultMetrics({
    app: 'node-application-monitoring-app',
    prefix: 'node_',
    timeout: 10000,
    gcDurationBuckets: [0.001, 0.01, 0.1, 1, 2, 5],
    register
});


console.log(client)
app.get('/metrics', async (req, res) => {
    res.setHeader('Content-Type', register.contentType);
    res.send(await register.metrics());
});



//end metric


app.get('/',(req,res)=>{
    res.render('index')
})



// admin login work

app.get('/admin-login',(req,res)=>{
    let warning = req.cookies.warning
    res.clearCookie('warning')
    res.render('admin/login',{warning:warning})
})

app.get('/admin-sign-up',(req,res)=>{
    res.render('admin/signup')
})

app.post('/admin-sign-up',(req,res)=>{
    db.adminSignUp(req.body)
    res.redirect('/admin-login')
})

app.post('/admin-login',async (req,res)=>{
    result = await db.adminLoginCheck(req.body)
    if(result.length)
    {
        res.cookie('adminInformation',result)
        res.redirect('/admin-dashboard')
    }
    else
    {
        res.cookie("warning","wrong email id or password unable to login")
        res.redirect('/admin-login')
    }
})
// admin login finish

// admin Dashboard start

app.get('/admin-dashboard',async(req,res)=>{
    let adminInfo = req.cookies.adminInformation
    let data = await db.getAllAdminDetails()
    if(adminInfo)
    res.render('admin/dashboard',{adminInfo:adminInfo,data:data})
    else
    res.redirect('/admin-login')
})

//admin Dashboard End


//admin log out

app.get('/admin-logout',(req,res)=>{

    res.clearCookie('adminInformation')
    res.redirect('/admin-login')
})

//admin log out end


app.listen(process.env.PORT, ()=>{
    console.log("server is running on this port "+ process.env.PORT)
})