const fs = require('fs');
const url = require('url');

/**
 * @class dispatcher
 * @classdesc classe per la gestione delle richieste
 * @param {object} header - header della risposta
 * @param {object} servizi - servizi disponibili
 * @param {object} estensioni - estensioni dei file
 * @param {function} addServizio - aggiunge un servizio
 * @param {function} smista - smista la richiesta
 * @param {function} ritornaRisorsaStatica - ritorna una risorsa statica
 */
class dispatcher{
    #servizi = {};

    #header = {};

    #estensioni = {
        'html': 'text/html',
        'css': 'text/css',
        'js': 'text/javascript',
        'png': 'image/png',
        'jpg': 'image/jpg',
        'jpeg': 'image/jpeg',
        'gif': 'image/gif',
        'json': 'application/json'
    };

    constructor(header){
        this.#header = header;
    }

    /**
     * @function addServizio
     * aggiunge un servizio al dispatcher
     * @param {string} nomeServizio - nome del servizio
     * @param {function} servizio - funzione del servizio 
     */
    addServizio(nomeServizio, servizio){ this.#servizi[nomeServizio] = servizio; }

    /**
     * @function smista
     * smista la richiesta
     * @param {object} richiesta - richiesta del client
     * @param {object} risposta - risposta del server
     * @returns {boolean} stato - stato della richiesta
     */
    smista(richiesta, risposta){
        let risorsa = url.parse(richiesta.headers.host + richiesta.url, true).pathname;
        let stato = true;
        let funzione = this.#servizi[risorsa];

        if(funzione)
            funzione(richiesta, risposta);
        else if(risorsa.includes('.') || risorsa == '/')
            this.ritornaRisorsaStatica(risorsa, richiesta, risposta);
        else
            stato = false;

        return stato;
    }

    ritornaRisorsaStatica(risorsa, richiesta, risposta){
        if(risorsa == '/')
            risorsa = '/index.html';

        try{
            let file = fs.readFileSync('public' + risorsa);
                        
            this.#header['Content-Type'] = this.#estensioni[risorsa.split('.')[1]];

            risposta.writeHead(200, this.#header);
            risposta.write(file);
            risposta.end();
        }
        catch(ex){
            this.#header['Content-Type'] = 'text/plain';
            risposta.writeHeader(404, this.#header);
            risposta.write('404 - pagina non trovata');
            risposta.end();
        }
    }
}

module.exports = dispatcher;