'use strict';

const helper = require('./helper');
const bcrypt = require('bcryptjs');
class Petugas{

    constructor(app) {
        this.app = app;
    }

    appRouter(){
        this.app.post('/admin/petugas', async (request,response)=>{
            const registrationResponse = {};
            const body = request.body
            body.password = bcrypt.hashSync(body.password,bcrypt.genSaltSync(10));
            const data = {
            username : body.username,
            password : body.password,
            nama_petugas : body.nama_petugas,
            level : body.level
            }
            
            if(data.username === '' || data.password === ''
                || data.nama_petugas === '' || data.level === ''){
                registrationResponse.error = true;
                registrationResponse.message = `Form cant be empty`
                response.status(412).json(registrationResponse);
            }else{
                await helper.registerPetugas(data,(result)=>{
                    if (result === null || result.affectedRows === 0) {
                        registrationResponse.error = true;
                        registrationResponse.message = `Petugas registration unsuccessful,try after some time.`;
                        response.status(417).json(registrationResponse);
                    } else {
                        registrationResponse.error = false;
                        registrationResponse.petugas = result;
                        registrationResponse.message = `Petugas registration successful.`;
                        response.status(200).json(registrationResponse);
                    }
                })
            }
        })
        this.app.get('/admin/petugas', async(request,response)=>{
            const getResponse = {};
            await helper.getPetugas((result)=>{
                if(result === null || result === undefined){
                    getResponse.error = true;
                    getResponse.message = `Unsuccessful to get data`;
                    response.status(417).json(getResponse);
                }else{
                    getResponse.error = false;
                    getResponse.data = result;
                    response.status(200).json(getResponse);
                }
            })
        })
        this.app.get('/admin/petugas/:id_petugas', async (request,response)=>{
            const getResponse = {};
            const data = request.params.id_petugas;
            
            await helper.getPetugasById(data,(result)=>{
                if(result === null){
                    getResponse.error = true;
                    getResponse.message = `Unsuccessful to get data`;
                    response.status(417).json(getResponse);
                }
                else if(result[0] === undefined){
                    getResponse.error = true;
                    getResponse.message = `Data not found`;
                    response.status(404).json(getResponse);
                }else{
                    getResponse.error = false;
                    getResponse.data = result;
                    response.status(200).json(getResponse)
                }
            })
        })

        this.app.patch('/admin/petugas/:id_petugas', async(request,response)=>{
            const updateResponse = {};
            const body = request.body;
            const id_petugas = request.params.id_petugas;
            const data = {
                username : body.username,
                password : body.password,
                nama_petugas : body.nama_petugas,
                level : body.level
            }
            await helper.updatePetugas(data,id_petugas,(result)=>{
                if(result === null){
                    updateResponse.error = true;
                    updateResponse.message = `Unsuccessful to update data`
                    response.status(417).json(updateResponse);
                }else if(result.affectedRows === 0){
                    updateResponse.error = true;
                    updateResponse.message = `Data not found`;
                    response.status(404).json(updateResponse);
                }else if(result.changedRows === 0){
                    updateResponse.error = true;
                    updateResponse.message = `No data has been changed`;
                    response.status(404).json(updateResponse);
                }else{
                    updateResponse.error = false;
                    updateResponse.message = `Successful to update data`;
                    response.status(200).json(updateResponse);
                }
            })
        })

        this.app.delete('/admin/petugas/:id_petugas', async(request,response)=>{
            const deleteRespone = {};
            const id_petugas = request.params.id_petugas;
            await helper.deletePetugas(id_petugas,(result)=>{
                console.log(result);
                if(result === null){
                    deleteRespone.error = true;
                    deleteRespone.message = `Unsuccessful to delete data`;
                    response.status(417).json(deleteRespone);
                }else if(result.affectedRows === 0){
                    deleteRespone.error = true;
                    deleteRespone.message = `Data not found`;
                    response.status(404).json(deleteRespone);
                }else{
                    deleteRespone.error = false;
                    deleteRespone.message = `Successful to delete data`;
                    response.status(200).json(deleteRespone)
                }
            })
        })
    }
    petugasConfig(){
		this.appRouter();
	}

}

module.exports = Petugas;