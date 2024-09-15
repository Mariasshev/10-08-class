var express = require('express');
var path = require('path');
var app = express();
var fs = require('fs');

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

app.get('/submit-register', (req, res) => {
    console.log('register');
    fs.writeFile('inf.txt', `attempt to register!`, (err, data)  => {
        if (err) throw err;
    })
})

app.get('/submit-sign-in', (req, res) => {
    fs.writeFile('inf.txt', `attempt to sign in!`, (err, data)  => {
        if (err) throw err;
    })
})

var buff = '';
fs.readFile('products.txt',  (err, data) => {
    if (err) throw err;
    buff = JSON.parse(data);
    //console.log(buff);
});

app.get('/name/:nameId/price/:priceId', function(request, response){
    console.log(`price: ${request.params['priceId']}`);
    var name = request.params['nameId'];
    var price = request.params['priceId'];
    
    //поиск по названию в buff и отображение других данных, которые относятся к этому названию
    var product = buff.find(item => item.name == name);

    if (product) {
        if (product.price === price) {
            response.send(`
                <h1>Product Details</h1>
                <p><strong>Name:</strong> ${product.name}</p>
                <p><strong>Price:</strong> ${product.price}</p>
                <p><strong>CPU:</strong> ${product.CPU}</p>
            `);
        } else {
            response.send('Price does not match the product');
        }
    } else {
        response.send('Product not found');
    }


});

app.listen(PORT, ()=>{
    console.log(`Server has been started on port ${PORT} ...`);
});

///     name/Dell XPS 13/price/$999