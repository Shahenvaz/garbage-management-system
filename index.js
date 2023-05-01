const express = require('express')
const app = new express()
require("dotenv").config()
const {Connection}  = require('./database')
const db =  new Connection

app.use(express.urlencoded({ extended: false }))
app.use(express.static('public'))
app.set('view engine', 'ejs')

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