const  { Router} = require("express");
const Rutas = Router();
const {inicio, login, agregarpersonas, superadmin,administrador1,Validarsesion,adminmesas,adminplatos,
    borrarpersona, actualizar, Actualizarpersona, agregarplato, ActualizarEnviarplato,consultareservaget,
    addreservas, Eliminarplato} = require('../controller/index');

Rutas.get('/', inicio);
Rutas.get('/indexlogin', login);
Rutas.post('/addpersona', agregarpersonas);
Rutas.get('/borrarpersona/:idpersona', borrarpersona);
Rutas.get('/Actualizar/:idpersona', actualizar);
Rutas.post('/Actualizarpersona', Actualizarpersona);

//Rutas.get('/cliente', validarusuarios);
Rutas.get('/superadmin', superadmin);
Rutas.get('/admin1', administrador1);
Rutas.post('/ValidarSesion', Validarsesion);
Rutas.get('/adminmesas', consultareservaget);
Rutas.get('/adminplatos', adminplatos);
Rutas.post('/addreservas/:id',addreservas);

//platos
Rutas.get('/ActualizarEnviarplato/:idplato', ActualizarEnviarplato);
Rutas.post('/Agregarplato', agregarplato);
Rutas.get('/Eliminarplato/:id',Eliminarplato);









module.exports = Rutas;