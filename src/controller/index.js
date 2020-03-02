const { Pool } = require('pg');

const pool = new Pool({
    host: 'ec2-34-200-116-132.compute-1.amazonaws.com',
    database: 'd1835udc3kvubs',
    user: 'phciihosrqaiwg',
    password: '97537925c7effeca5a4f2164c8af224148bc04ad4f9f2223726c2af96e4f4686',
    port: 5432,
    ssl: {
        rejectUnauthorized: false
    }
});

const inicio = (req, res) => {
    res.render('index.html');
};
const login = (req, res) => {
    res.render('indexlogin.html');
};


const consulta = async (req, res) => {
    const response = await pool.query('SELECT * FROM persona');
    return response.rows;
};

const consultaIdpersona = async (id) => {
    const response = await pool.query('SELECT * FROM persona where idpersona = $1', [id]);
    
    return response.rows;
};

const consultaRepetido = async (usuarioc, emailc) => {
    const response = await pool.query('SELECT * FROM persona WHERE usuario = $1 or email = $2', [usuarioc, emailc]);
    return response.rows;
}

const Usuarioregistrado = async (usuarioc, contraseniac) => {
    const response = await pool.query('SELECT * FROM persona WHERE usuario = $1 and contrasenia = $2', [usuarioc, contraseniac]);
    return response.rows;
}


const agregarpersonas = async (req, res) => {
    const { usuario, contrasenia, email } = req.body;
    const response2 = await consultaRepetido(usuario, email);

    if (usuario == '' || contrasenia == '' || email == '') {
        res.render('indexlogin.html');
    } else if (response2 == 0) {
        const response = await pool.query('INSERT INTO persona (usuario, contrasenia, email, rol) VALUES ($1, $2, $3, $4)', [usuario, contrasenia, email, 'usuario']);
    }
    res.render('indexlogin.html');
};

const Validarsesion = async (req, res) => {
    const { usuario, contrasenia } = req.body;
    const response = await Usuarioregistrado(usuario, contrasenia);
    if (usuario == '' || contrasenia == '') {
        res.render('indexlogin.html');
    } else if (response == 0) {
        res.render('indexlogin.html');
    } else if (response[0].rol == 'usuario') {
        res.render('indexreservas.html', { datos: response });
    } else if (response[0].rol == 'administrador') {

        res.render('indexadmin.html', { datos: response });

    } else if (response[0].rol == 'superadministrador') {
        const response2 = await consulta();
        res.render('indexadministrador.html', { datos: response2 });
    } else {
        res.render('indexlogin.html');
    }
};

const borrarpersona = async (req, res) => {
    const id = req.params.idpersona;
    const response = await pool.query('DELETE FROM persona WHERE idpersona=$1', [id]);
    const response2 = await consulta();
    res.render('indexadministrador.html', { datos: response2 });

};

const actualizar = async (req, res) => {
    const id = req.params.idpersona;
    const response = await pool.query('SELECT * FROM persona WHERE idpersona=$1', [id]);

    const response2 = await consulta();
    res.render('indexadministrador.html', { datos: response2, registro: response.rows });
    console.log(response.rows);
};

const Actualizarpersona = async (req, res) => {
    const { id, rol } = req.body;
    const response = await pool.query('UPDATE persona SET rol = $1 WHERE idpersona = $2', [rol, id]);
    const response2 = await consulta();

    res.render('indexadministrador.html', { datos: response2 });
}


//Platos

const consultaplatos = async (req, res) => {
    const response = await pool.query('SELECT * FROM plato');
    return response.rows;
}

const consultaplatosrepetidos = async (nombreplato) => {
    const response = await pool.query('SELECT * FROM plato where nombreplato = $1', [nombreplato]);
    return response.rows;
}

const agregarplato = async (req, res) => {
    const { id, nombreplato1, precioplato1, descripcion1, imagen } = req.body;


    const response3 = await consultaplatosrepetidos(nombreplato1);
    if (id == 0) {
        console.log('registrando');
        if (nombreplato1 == '' || precioplato1 == '' || descripcion1 == '') {
        } else if (response3 == 0) {
            const response = await pool.query('INSERT INTO plato (nombreplato, descripcionplato, precio,imagen) VALUES ($1, $2, $3, $4)', [nombreplato1, descripcion1, precioplato1, imagen]);
        }

    } else {

        const response = await pool.query('UPDATE plato SET nombreplato = $1, descripcionplato = $2, precio = $3 WHERE idplato = $4', [nombreplato1, descripcion1, precioplato1, id]);
    }
    const response2 = await consultaplatos();
    res.render('indexadminplatos.html', { datos: response2 });
};

const Eliminarplato = async (req, res) => {
    const id = req.params.id;
    const consultaidplato = await pool.query('DELETE FROM plato WHERE idplato = $1', [id]);
    const response = await consultaplatos();
    res.render('indexadminplatos.html', { datos: response });
};

const ActualizarEnviarplato = async (req, res) => {
    const idplato = req.params.idplato;
    const consultaidplato = await pool.query('SELECT * FROM plato WHERE idplato = $1', [idplato]);
    const response = await consultaplatos();
    res.render('indexadminplatos.html', { datos: response, datosplato: consultaidplato.rows });
};

const adminplatos = async (req, res) => {
    const response2 = await consultaplatos();

    res.render('indexadminplatos.html', { datos: response2 });
};


const administrador1 = (req, res) => {
    res.render('indexadmin.html');
};
//const validarusuarios = (req, res) => {
//   res.render('indexreservas.html');
//};
const superadmin = async (req, res) => {
    const response = await consulta();
    //console.log(response);

    res.render('indexadministrador.html', { datos: response });
};

const adminmesas = async (req, res) => {
    res.render('indexadminmesas.html');
};

const consultafecharepetida = async (fechac,mesitas) => {

    const response5 = await pool.query('SELECT * FROM reserva WHERE fecha = $1 and mesa = $2  ', [fechac,mesitas]);
    console.log(response5.rows);
    return response5.rows;
}

const addreservas = async (req, res) => {
    const { fecha, estado, mesitas, fkpersona } = req.body;
    const id = req.params.id;
    console.log(""+  mesitas  );
    const nombrepersona = await consultaIdpersona(id);
    console.log(nombrepersona[0].usuario);
    
   


    if (mesitas === '') {
        
        console.log("por favor sleccione la fecha y la mesa a reservar");
        res.render('indexreservas.html');
        
    }else{
        const response5 = await consultafecharepetida(fecha,mesitas);
        if (response5 == 0) {
            const response3 = await pool.query('INSERT INTO reserva (fecha, estado, mesa, fkpersona) VALUES ($1, $2, $3, $4)', [fecha, 'noactiva', mesitas, id]);
            
        } else {
            console.log("esta fecha ya esta reservada");
            res.render('indexreservas.html');
            

        }
    }
        res.render('indexreservas.html', { datos: nombrepersona });
    
    };

    const consultareserva = async (req, res) => {
        const response = await pool.query('SELECT * FROM reserva');
        return response.rows;
    };
    const consultareservapersona = async (req, res) => {
        const response = await pool.query('SELECT * FROM reserva inner join persona on reserva.fkpersona = persona.idpersona');
        return response.rows;
    };
    const consultareservaget = async (req, res) => {
        const response = await consultareservapersona();
        console.log(response);
        res.render('indexadminmesas.html', { datos2: response });
    };




    module.exports = {
        inicio, login, agregarpersonas, superadmin, administrador1, Validarsesion, adminplatos, adminmesas,
        borrarpersona, actualizar, Actualizarpersona, agregarplato, ActualizarEnviarplato, addreservas,
        consultareserva, consultareservaget, Eliminarplato, consultafecharepetida
    };
