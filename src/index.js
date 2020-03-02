const express = require('express');
const path = require ('path');
const app = express();


//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Configuracion
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, '/views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');


//Rutas
app.use(require('./router/'));

// static files
app.use(express.static(path.join(__dirname, '/')));

app.listen(app.get('port'));
console.log('Servidor iniciado en puerto', app.get('port'));