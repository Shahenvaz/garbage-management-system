const express = require('express')
const app = new express()
require("dotenv").config()
const {Connection}  = require('./database')
const Prometheus = require('prom-client')
const db =  new Connection

app.use(express.urlencoded({ extended: false }))
app.use(express.static('public'))
app.set('view engine', 'ejs')

//graphana metrics

const client = require('prom-client');

// Create a Registry to register the metrics
const register = new client.Registry();
client.collectDefaultMetrics({register});

client.collectDefaultMetrics({
    app: 'node-application-monitoring-app',
    prefix: 'node_',
    timeout: 10000,
    gcDurationBuckets: [0.001, 0.01, 0.1, 1, 2, 5],
    register
});

app.get('/metrics', async (req, res) => {
    res.setHeader('Content-Type', register.contentType);
    res.send(await register.metrics());
});



//end metricss


app.get('/',(req,res)=>{
    res.render('index')
})

// admin login work

app.get('/admin-login',(req,res)=>{
    res.render('admin/login')
})

app.get('/admin-sign-up',(req,res)=>{
    res.render('admin/signup')
})

app.post('/admin-sign-up',(req,res)=>{
    db.adminSignUp(req.body)
    res.redirect('/admin-login')
})

// admin login finish


app.listen(process.env.PORT, ()=>{
    console.log("server is running on this port "+ process.env.PORT)
})
