var express = require('express');
var path = require('path');
var app = express();

const PORT = 3000;


app.get('/', (req,res) =>{
    res.sendFile(path.resolve(__dirname,'html', 'index.html'));
})

app.get('/news', (req,res) =>{
    res.sendFile(path.resolve(__dirname,'html', 'news.html'));
})

app.get('/about-us', (req,res) =>{
    res.sendFile(path.resolve(__dirname,'html', 'about-us.html'));
})

app.get('/sign-in', (req,res) =>{
    res.sendFile(path.resolve(__dirname,'html', 'sign-in.html'));
})

app.get('/register', (req,res) =>{
    res.sendFile(path.resolve(__dirname,'html', 'register.html'));
})

app.listen(PORT, ()=>{
    console.log(`Server has been started on port ${PORT} ...`);
});