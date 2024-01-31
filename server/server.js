'option strict';

// definisco l'header per il server e il dispatcher
const header = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'text/plain'
};

// definisco le varie librerie da utilizzare
const http = require('http');
const dispatcher = new(require('dispatcher/dispatcher'))(header);
const mysql = require('mysql');

// definisco l'oggetto per la connessione al database
const mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'automobili'
});

// definisco la funzione per la connessione al database
function doQuery(query){
    return new Promise((resolve, reject) => {
        mysqlConnection.query(query, (err, rows, fields) => {
            if(err)
                reject(err);
            else
                resolve(rows);
        });
    });
}

// definisco le funzioni del dispatcher
dispatcher.addServizio('/getUser', async (req, res) => {
    
    let param = '';
    
    // recupero i dati in post
    req.on('data', (data) => {
        param += data;    
    });

    // quando ho finito di recuperare i dati in post
    req.on('end', async () => {

        // controllo se ho dei dati in post altrimenti invio un errore
        if(!param) {
            console.log('errore: nessun dato in post');
            res.writeHead(400, header);
            res.end('errore: nessun dato in post');
            return;
        }

        // converto i dati in json
        param = JSON.parse(param);

        // definisco la query
        const query = `SELECT * FROM utenti WHERE username = '${param.username}' AND pwd = '${param.password}'`;

        // eseguo la query
        const result = await doQuery(query);
        console.log(result);

        // definisco la risposta
        // 0 => utente trovato
        // 1 => utente non trovato
        const response = {
            title: 'getUser',
            status: result.length !== 0 ? 0 : 1,
            data: result,
            message: result.length !== 0 ? 'utente trovato' : 'utente non trovato',
            admin: false
        };

        // controllo se il login è stato fatto da un admin o da un utente
        if(result.length !== 0) if(result[0].admin === 1) response.admin = true;

        // invio la risposta
        header['Content-Type'] = 'application/json';

        res.writeHead(200, header);
        res.end(JSON.stringify(response));

        header['Content-Type'] = 'text/plain';
    });
});

dispatcher.addServizio('/visualizeAuto', async (req, res) => {

    // definisco la query
    const query = `SELECT * FROM modelli`;

    // eseguo la query
    const result = await doQuery(query);
    console.log(result);

    // definisco la risposta
    // 0 => auto trovate
    // 1 => auto non trovate
    const response = {
        title: 'visualizeAuto',
        status: result.length !== 0 ? 0 : 1,
        data: result,
        message: result.length !== 0 ? 'auto trovate' : 'auto non trovate'
    };

    // invio la risposta
    header['Content-Type'] = 'application/json';

    res.writeHead(200, header);
    res.end(JSON.stringify(response));

    header['Content-Type'] = 'text/plain';
});

dispatcher.addServizio('/getAuto', async (req, res) => {
    
    let param = '';
    
    // recupero i dati in post
    req.on('data', (data) => {
        param += data;    
    });

    // quando ho finito di recuperare i dati in post
    req.on('end', async () => {

        // controllo se ho dei dati in post altrimenti invio un errore
        if(!param) {
            console.log('errore: nessun dato in post');
            res.writeHead(400, header);
            res.end('errore: nessun dato in post');
            return;
        }

        // converto i dati in json
        param = JSON.parse(param);

        // definisco la query
        const query = `SELECT modelli.id, anno, cilindrata, colore, km, nPorte, nazione, modelli.nome, prezzo, targa, marche.nome AS marca FROM modelli INNER JOIN marche ON modelli.codMarca = marche.id WHERE modelli.id = ${param.id}`;

        // eseguo la query
        const result = await doQuery(query);
        console.log(result);

        // definisco la risposta
        // 0 => auto trovata
        // 1 => auto non trovata
        const response = {
            title: 'getAuto',
            status: result.length !== 0 ? 0 : 1,
            data: result,
            message: result.length !== 0 ? 'auto trovata' : 'auto non trovata'
        };

        // invio la risposta
        header['Content-Type'] = 'application/json';

        res.writeHead(200, header);
        res.end(JSON.stringify(response));

        header['Content-Type'] = 'text/plain';
    });
});

dispatcher.addServizio('/getAutoByMarca', async (req, res) => {

    let param = '';

    // recupero i dati in post
    req.on('data', (data) => {
        param += data;
    });

    // quando ho finito di recuperare i dati in post
    req.on('end', async () => {

        // controllo se ho dei dati in post altrimenti invio un errore
        if(!param) {
            console.log('errore: nessun dato in post');
            res.writeHead(400, header);
            res.end('errore: nessun dato in post');
            return;
        }

        // converto i dati in json
        param = JSON.parse(param);

        // definisco la query
        const query = `SELECT * FROM modelli INNER JOIN marche ON modelli.codMarca = marche.id WHERE marche.nome = '${param.marca}'`;

        // eseguo la query
        const result = await doQuery(query);
        console.log(result);

        // definisco la risposta
        // 0 => auto trovate
        // 1 => auto non trovate
        const response = {
            title: 'getAutoByMarca',
            status: result.length !== 0 ? 0 : 1,
            data: result,
            message: result.length !== 0 ? 'auto trovate' : 'auto non trovate'
        };

        // invio la risposta
        header['Content-Type'] = 'application/json';

        res.writeHead(200, header);
        res.end(JSON.stringify(response));

        header['Content-Type'] = 'text/plain';
    });
});

dispatcher.addServizio('/addAuto', async (req, res) => {

    let param = '';

    // recupero i dati in post
    req.on('data', (data) => {
        param += data;
    });

    // quando ho finito di recuperare i dati in post
    req.on('end', async () => {

        // controllo se ho dei dati in post altrimenti invio un errore
        if(!param) {
            console.log('errore: nessun dato in post');
            res.writeHead(400, header);
            res.end('errore: nessun dato in post');
            return;
        }

        // converto i dati in json
        param = JSON.parse(param);

        // controllo se è presente la marca altrimenti la inserisco nella tabella marche
        param.codMarca = await checkMarca(param.marca, param.nazione);

        // definisco la query
        const query = `INSERT INTO modelli 
                       (nome, codMarca, nPorte, cilindrata, colore, anno, prezzo, targa, km) 
                       VALUES 
                       ('${param.nome}', ${param.codMarca}, ${param.nPorte}, ${param.cilindrata}, '${param.colore}', ${param.anno}, ${param.prezzo}, '${param.targa}', ${param.km})`;

        // eseguo la query
        const result = await doQuery(query);
        console.log(result);

        // definisco la risposta
        // 0 => auto aggiunta
        // 1 => auto non aggiunta
        const response = {
            title: 'addAuto',
            status: result.affectedRows !== 0 ? 0 : 1,
            data: result,
            message: result.affectedRows !== 0 ? 'auto aggiunta' : 'auto non aggiunta'
        };

        // invio la risposta
        header['Content-Type'] = 'application/json';

        res.writeHead(200, header);
        res.end(JSON.stringify(response));

        header['Content-Type'] = 'text/plain';
    });
});

// definisco la funzione per controllare se la marca è presente nella tabella marche
async function checkMarca(marca, nazione){
    // definisco la query
    let query = `SELECT id FROM marche WHERE nome = '${marca}' AND nazione = '${nazione}'`;

    // eseguo la query
    let result = await doQuery(query);
    // console.log(result);

    // controllo se la marca è presente nella tabella marche
    if(result.length === 0){
        // definisco la query
        query = `INSERT INTO marche (nome, nazione) VALUES ('${marca}', '${nazione}')`;

        // eseguo la query
        result = await doQuery(query);
        // console.log(result);

        // definisco la query
        query = `SELECT id FROM marche WHERE nome = '${marca}' AND nazione = '${nazione}'`;

        // eseguo la query
        result = await doQuery(query);
        // console.log(result);
    }

    return result[0].id;
}

// definisco il server e lo metto in ascolto sulla porta 1337
const port = 1337;
const server = http.createServer(gestisciRichieste);

server.listen(port, () => {
    console.log(`server in ascolto sulla porta ${port}`);
});

// definisco la funzione per gestire le richieste
function gestisciRichieste(req, res){
    console.log(`richiesta: ${req.url}`);
    dispatcher.smista(req, res);
}