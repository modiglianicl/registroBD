import pool from './model/db.js';

// Argumentos

let valoresQuery = process.argv.slice(2);
let operacion = valoresQuery[0];


// Funciones

let registrarEstudiante = async (nombre,rut,curso,nivel) => {

    try {
        let queryText = 'INSERT INTO estudiantes (nombre,rut,curso,nivel) values ($1,$2,$3,$4) RETURNING *';
        let valoresQuery = [nombre,rut,curso,nivel];
        let finalQuery = await pool.query(queryText,valoresQuery);
        console.log("Datos añadidos : ",finalQuery.rows)
    } catch (error) {
        console.log(error);
    }
    
}

let obtenerEstudiante = async (rut) => {
    try {
        let queryText = 'SELECT * FROM estudiantes WHERE rut = $1';
        let valoresQuery = [rut];
        let finalQuery = await pool.query(queryText,valoresQuery);
        console.log(finalQuery.rows)
    } catch (error) {
        console.log(error);
    }
}

let obtenerTodos = async () => {
    try {
        let queryText = "SELECT * FROM estudiantes";
        let finalQuery = await pool.query(queryText);
        console.log(`Mostrando todos los estudiantes de la escuela, actualmente son ${finalQuery.rows.length}.`)
        console.log(finalQuery.rows);
    } catch (error) {
        console.log(error);
    }
}

let editarEstudiante = async (rut,nombre,curso,nivel) => {
    try {
        if (rut && nombre && curso && nivel) {
            let queryText = "UPDATE estudiantes SET nombre = $1 , curso = $2 , nivel = $3 WHERE rut = $4 RETURNING *";
            let valoresQuery = [nombre,curso,nivel,rut];
            let finalQuery = await pool.query(queryText,valoresQuery);
            console.log(finalQuery.rows);
        } else if (rut && nombre && curso) {
            let queryText = "UPDATE estudiantes SET nombre = $1 , curso = $2 WHERE rut = $3 RETURNING *";
            let valoresQuery = [nombre,curso,rut];
            let finalQuery = await pool.query(queryText,valoresQuery);
            console.log(finalQuery.rows);
        } else if (rut && nombre) {
            let queryText = "UPDATE estudiantes SET nombre = $1 WHERE rut = $2 RETURNING *";
            let valoresQuery = [nombre,rut];
            let finalQuery = await pool.query(queryText,valoresQuery);
            console.log(finalQuery.rows);
        } else if (rut) {
            console.log("Debes de por lo menos darle otro argumento más a la funcionar editar!")
        }
    } catch (error) {
        console.log(error);
    }
}

let borrarEstudiante = async(rut) => {
    try {
        if (rut){
            let queryText = "DELETE FROM estudiantes where rut = $1 RETURNING *";
            let valoresQuery = [rut]
            let finalQuery = await pool.query(queryText,valoresQuery);
            console.log(finalQuery.rows);
        } else {
            console.log("Debes de ingresar un rut!")
        }
    } catch (error) {
        console.log(error);
    }
}

// Fin Funciones


// Lógica programa

if (process.argv.length <= 2) { // Menos de dos argumentos hace un query a toda la BD.
    obtenerTodos();
} else if (operacion === "registrar") {
    // Creamos variables si queremos registrar
    let nombreEstudiante = valoresQuery[1];
    let rutEstudiante = valoresQuery[2];
    let cursoEstudiante = valoresQuery[3];
    let nivelEstudiante = valoresQuery[4];
    if (nombreEstudiante && rutEstudiante && cursoEstudiante && nivelEstudiante) { // Chequeamos si se ingresaron todos los args.
        registrarEstudiante(nombreEstudiante,rutEstudiante,cursoEstudiante,nivelEstudiante);
    }  else {
        console.log("Se necesitan los siguientes argumentos para usar la funcion registrar : nombre,rut,curso,nivel.");
    }
} else if (operacion == "buscar") {
    let rutEstudiante = valoresQuery[1];
    if (rutEstudiante) {
        obtenerEstudiante(rutEstudiante);
    } else{
        console.log("Se necesita el siguiente argumento para usar la funcion buscar : rut.")
    }
} else if (operacion == "todos") {
    obtenerTodos();
} else if (operacion == "editar") {
    try {
        let rutEstudiante = valoresQuery[1]
        let nombreEstudiante = valoresQuery[2];
        let cursoEstudiante = valoresQuery[3];
        let nivelEstudiante = valoresQuery[4];
        editarEstudiante(rutEstudiante,nombreEstudiante,cursoEstudiante,nivelEstudiante)
    }
    catch (error) {
        console.log(error);
    }
    
} else if(operacion == "borrar"){
    let rutEstudiante = valoresQuery[1];
    borrarEstudiante(rutEstudiante);
} else {
    console.log("Porfavor leer el manual de como usar este programa.")
}