'use strict';

const helper = require('./helper');
const bcrypt = require('bcryptjs');


class Login{

    constructor(app) {
        this.app = app;
    }

    appRouter(){
        this.app.post('/login/petugas', async(request, response)=>{ 
            const loginResponse = {};
            const body = request.body
            const data = {
            username : body.username,
            password : body.password
            }
            if(data.username === '' || data.password === ''){
                loginResponse.error = true;
                loginResponse.message = `Form cant be empty`
                response.status(412).json(loginResponse);
            }else{
                await helper.loginPetugas(data,(result)=>{
                    if(result[0] === undefined ){
                        loginResponse.error = true;
                        loginResponse.message = `Username or password invalid`;
                        response.status(417).json(loginResponse);
                    }else{
                        const valid = bcrypt.compareSync(data.password,result[0].password)
                        if (result === null || result === 0) {
                            loginResponse.error = true;
                            loginResponse.message = `Login unsuccessful,try after some time.`;
                            response.status(417).json(loginResponse);
                        }else if (result[0] === undefined || valid === false) {
                            loginResponse.error = true;
                            loginResponse.message = `Username or password invalid`;
                            response.status(417).json(loginResponse);
                        }else{
                            loginResponse.error = false;
                            loginResponse.user = result[0].username;
                            loginResponse.message = `Login successful.`;
                            response.status(200).json(loginResponse);
                        }
                    }
                })
            }
        })
        this.app.post('/login/siswa', async(request, response)=>{ 
            const loginResponse = {};
            const body = request.body
            const data = {
            username : body.username,
            password : body.password
            }
            if(data.username === '' || data.password === ''){
                loginResponse.error = true;
                loginResponse.message = `Form cant be empty`
                response.status(412).json(loginResponse);
            }else{
                await helper.loginSiswa(data,(result)=>{
                    if(result[0] === undefined ){
                        loginResponse.error = true;
                        loginResponse.message = `Username or password invalid`;
                        response.status(417).json(loginResponse);
                    }else{
                        const valid = bcrypt.compareSync(data.password,result[0].password)
                        if (result === null || result === 0) {
                            loginResponse.error = true;
                            loginResponse.message = `Login unsuccessful,try after some time.`;
                            response.status(417).json(loginResponse);
                        }else if (result[0] === undefined || valid === false) {
                            loginResponse.error = true;
                            loginResponse.message = `Username or password invalid`;
                            response.status(417).json(loginResponse);
                        }else{
                            loginResponse.error = false;
                            loginResponse.user = result[0].username;
                            loginResponse.message = `Login successful.`;
                            response.status(200).json(loginResponse);
                        }
                    }
                })
            }
        })
        this.app.get("/logout", (req, res) => {
            req.session.destroy(err => {
              if (err) throw err;
              res.redirect("/login");
            });
        });
    }
    loginConfig(){
		this.appRouter();
	}

}

module.exports = Login;