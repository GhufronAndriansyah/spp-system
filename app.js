require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser');
const Kelas = require('./api/admin/kelas/router');
const Spp = require('./api/admin/spp/router');
const Petugas = require('./api/admin/petugas/router');
const Siswa = require('./api/admin/siswa/router');
const Pembayaran = require('./api/admin/pembayaran/router');
const Login = require('./api/login/router')
class Server{
    constructor(){
        this.port = process.env.APP_PORT;
        this.host = process.env.DB_HOST;
        this.app = express();
    }

    appConfig(){
        this.app.use(express.json())
        this.app.use(bodyParser.urlencoded({extended:false}))
        this.app.use(bodyParser.json())
    }
    adminRoutes(){
        new Kelas(this.app).kelasConfig();
        new Spp(this.app).sppConfig();
        new Petugas(this.app).petugasConfig();
        new Siswa(this.app).siswaConfig();
        new Pembayaran(this.app).pembayaranConfig();
    }
    loginRoutes(){
        new Login(this.app).loginConfig();
    }
    appExecute(){

        this.appConfig();
        this.adminRoutes();
        this.loginRoutes();

        this.app.listen(this.port, this.host, () => {
            console.log(`Listening on http://${this.host}:${this.port}`);
        });
    }
}
const app = new Server();
app.appExecute();
