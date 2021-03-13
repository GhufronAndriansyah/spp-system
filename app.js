require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser');
const Kelas = require('./api/kelas/router');


class Server{
    constructor(){
        this.port = process.env.APP_PORT;
        this.host = process.env.DB_HOST;
        this.app = express();
    }

    appConfig(){
        this.app.use(express.json())
        this.app.use(bodyParser.urlencoded({extended:true}))
        this.app.use(bodyParser.json())
    }
    includeRoutes(){
        new Kelas(this.app).kelasConfig();
    }
    appExecute(){

        this.appConfig();
        this.includeRoutes();

        this.app.listen(this.port, this.host, () => {
            console.log(`Listening on http://${this.host}:${this.port}`);
        });
    }
}
const app = new Server();
app.appExecute();
