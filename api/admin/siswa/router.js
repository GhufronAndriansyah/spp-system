'use strict';

const helper = require('./helper');
const bcrypt = require('bcryptjs');


class Siswa{

    constructor(app) {
        this.app = app;
    }

    appRouter(){
        this.app.post('/admin/siswa', async (request,response)=>{
            const registrationResponse = {};
            const body = request.body
            body.password = bcrypt.hashSync(body.password,bcrypt.genSaltSync(10));
            const data = {
            nisn : body.nisn,
            nis : body.nis,
            nama : body.nama,
            id_kelas : body.id_kelas,
            alamat : body.alamat,
            no_telp : body.no_telp,
            id_spp : body.id_spp,
            username : body.username,
            password : body.password
            }
            // Belum sempurna
            if(data.nisn === '' || data.nis === ''){
                registrationResponse.error = true;
                registrationResponse.message = `Form cant be empty`
                response.status(412).json(registrationResponse);
            }else{
                await helper.registerSiswa(data,(result)=>{
                    if (result === null || result.affectedRows === 0) {
                        registrationResponse.error = true;
                        registrationResponse.message = `Siswa registration unsuccessful,try after some time.`;
                        response.status(417).json(registrationResponse);
                    } else {
                        registrationResponse.error = false;
                        registrationResponse.siswa = result;
                        registrationResponse.message = `Siswa registration successful.`;
                        response.status(200).json(registrationResponse);
                    }
                })
            }
        })
        this.app.get('/admin/siswa', async(request,response)=>{
            const getResponse = {};
            await helper.getSiswa((result)=>{
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
        this.app.get('/admin/siswa/:nisn', async (request,response)=>{
            const getResponse = {};
            const data = request.params.nisn;
            
            await helper.getSiswaById(data,(result)=>{
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

        this.app.patch('/admin/siswa/:nisn', async(request,response)=>{
            const updateResponse = {};
            const body = request.body;
            const nisn = request.params.nisn;
            const data = {
                nisn : body.nisn,
                nis : body.nis,
                nama : body.nama,
                id_kelas : body.id_kelas,
                alamat : body.alamat,
                no_telp : body.no_telp,
                id_spp : body.id_spp,
                username : body.username,
                password : body.password
            }
            await helper.updateSiswa(data,nisn,(result)=>{
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

        this.app.delete('/admin/siswa/:nisn', async(request,response)=>{
            const deleteRespone = {};
            const nisn = request.params.nisn;
            await helper.deleteSiswa(nisn,(result)=>{
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
    siswaConfig(){
		this.appRouter();
	}

}

module.exports = Siswa;