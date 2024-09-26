var express = require('express');
var path = require('path');
var fs = require('fs');

const PORT = 3000;

var app = express();

var ui = express();   // для пользовательского интерфейса (UI)
var api = express();  // для API

app.get('/', function(req, res) {
    res.writeHead(200, {'Content-Type':'text/html'});
    res.write('<a href="/ui">UI page</a>');
    res.write('<br />');
    res.write('<a href="/api">API page</a>');
    res.end();
});

// для UI
ui.get('/', function (req, res) {
    res.sendFile(path.resolve(__dirname, 'html', 'index.html'));
});

ui.get('/news', function (req, res) {
    res.sendFile(path.resolve(__dirname, 'html', 'news.html'));
});

ui.get('/about-us', function (req, res) {
    res.sendFile(path.resolve(__dirname, 'html', 'about-us.html'));
});

ui.get('/sign-in', function (req, res) {
    res.sendFile(path.resolve(__dirname, 'html', 'sign-in.html'));
});

ui.get('/register', function (req, res) {
    res.sendFile(path.resolve(__dirname, 'html', 'register.html'));
});

ui.on('mount', function() {
    console.log('UI app mounted');
});

// для API
api.get('/', function (req, res) {
    res.sendFile(path.resolve(__dirname, 'html', 'index.html'));
});

api.get('/submit-register', function(req, res) {
    console.log('Register attempt');
    fs.writeFile('inf.txt', `attempt to register!`, (err) => {
        if (err) throw err;
        res.send('Registration attempt logged.');
    });
});

api.get('/submit-sign-in', function(req, res) {
    console.log('Sign-in attempt');
    fs.writeFile('inf.txt', `attempt to sign in!`, (err) => {
        if (err) throw err;
        res.send('Sign-in attempt logged.');
    });
});

api.on('mount', function() {
    console.log('API app mounted');
});

app.use('/ui', ui);
app.use('/api', api);

app.listen(PORT, function() {
    console.log(`App running on port ${PORT}`);
});


// var buff = '';
// fs.readFile('products.txt',  (err, data) => {
//     if (err) throw err;
//     buff = JSON.parse(data);
//     //console.log(buff);
// });

// app.get('/name/:nameId/price/:priceId', function(request, response){
//     console.log(`price: ${request.params['priceId']}`);
//     var name = request.params['nameId'];
//     var price = request.params['priceId'];
    
//     //поиск по названию в buff и отображение других данных, которые относятся к этому названию
//     var product = buff.find(item => item.name == name);

//     if (product) {
//         if (product.price === price) {
//             response.send(`
//                 <h1>Product Details</h1>
//                 <p><strong>Name:</strong> ${product.name}</p>
//                 <p><strong>Price:</strong> ${product.price}</p>
//                 <p><strong>CPU:</strong> ${product.CPU}</p>
//             `);
//         } else {
//             response.send('Price does not match the product');
//         }
//     } else {
//         response.send('Product not found');
//     }


// });