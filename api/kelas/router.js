'use strict';

const helper = require('./helper');
const { request, response } = require('express');

class Kelas{

    constructor(app) {
        this.app = app;
    }

    appRouter(){
        this.app.post('/kelas', async (request,response)=>{
            const registrationResponse = {};
            const body = request.body
            const data = {
            nama_kelas : body.nama_kelas,
            kompetensi_keahlian : body.kompetensi_keahlian
            }

            if(data.nama_kelas === '' || data.kompetensi_keahlian === ''){
                registrationResponse.error = true;
                registrationResponse.message = `Form cant be empty`
                response.status(412).json(registrationResponse);
            }else{
                const result = await helper.registerKelas(data);
                if (result === null) {
					registrationResponse.error = true;
					registrationResponse.message = `Kelas registration unsuccessful,try after some time.`;
					response.status(417).json(registrationResponse);
				} else {
                    registrationResponse.error = false;
                    registrationResponse.kelas = result.values[0].nama_kelas;
					registrationResponse.message = `Kelas registration successful.`;
					response.status(200).json(registrationResponse);
				}
            }
        })
        this.app.get('/kelas',async (request,response)=>{
            const getResponse = {};
            const result = await helper.getKelas();
            if(result === null){
                getResponse.error = true;
                getResponse.message = `Unsuccessful to get data`;
                response.status(417).json(getResponse);
            }else{
                getResponse.error = false;
                getResponse.data = result;
                response.status(200).json(getResponse);
            }
        })

        this.app.get('/kelas/:id_kelas', async (request,response)=>{
            const getResponse = {};
            const data = request.params.id_kelas;
            const result = await helper.getKelasById(data);
            if(result === null){
                getResponse.error = true;
                getResponse.message = `Unsuccessful to get data`;
                response.status(417).json(getResponse);
            }
            else if( result === ""){
                getResponse.error = true;
                getResponse.message = `Data not found`;
                response.status(404).json(getResponse);
            }else{
                getResponse.error = false;
                getResponse.data = result;
                response.status(200).json(getResponse)
            }
        })

        this.app.patch('/kelas/:id_kelas', async(request,response)=>{
            const updateResponse = {};
            const body = request.body;
            const id_kelas = request.params.id_kelas;
            const data = {
                nama_kelas : body.nama_kelas,
                kompetensi_keahlian : body.kompetensi_keahlian
            }
            const result = await helper.updateKelas(data,id_kelas);
            if(result === null){
                updateResponse.error = true;
                updateResponse.message = `Unsuccessful to update data`
                response.status(417).json(updateResponse);
            }else if(result === ""){
                updateResponse.error = true;
                updateResponse.message = `Data not found`;
                response.status(404).json(updateResponse);
            }else{
                updateResponse.error = false;
                updateResponse.message = `Successful to update data`
                response.status(404).json(updateResponse);
            }
        })
    }
    kelasConfig(){
		this.appRouter();
	}

}

module.exports = Kelas;