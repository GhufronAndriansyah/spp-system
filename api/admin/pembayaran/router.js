'use strict';

const helper = require('./helper');

class Pembayaran{

    constructor(app) {
        this.app = app;
    }

    appRouter(){
        this.app.post('/admin/pembayaran', async (request,response)=>{
            const registrationResponse = {};
            const body = request.body
            const data = {
            id_petugas : body.id_petugas,
            nisn : body.nisn,
            tgl_bayar : body.tgl_bayar,
            bulan_dibayar : body.bulan_dibayar,
            tahun_dibayar : body.tahun_dibayar,
            id_spp : body.id_spp,
            jumlah_bayar : body.id_petugas,
            status : body.status
            }
            // Belum sempurna
            if(data.id_petugas === '' || data.nisn === ''){
                registrationResponse.error = true;
                registrationResponse.message = `Form cant be empty`
                response.status(412).json(registrationResponse);
            }else{
                await helper.registerPembayaran(data,(result)=>{
                    if (result === null || result.affectedRows === 0) {
                        registrationResponse.error = true;
                        registrationResponse.message = `Pembayaran registration unsuccessful,try after some time.`;
                        response.status(417).json(registrationResponse);
                    } else {
                        registrationResponse.error = false;
                        registrationResponse.pembayaran = result;
                        registrationResponse.message = `Pembayaran registration successful.`;
                        response.status(200).json(registrationResponse);
                    }
                })
            }
        })
        this.app.get('/admin/pembayaran', async(request,response)=>{
            const getResponse = {};
            await helper.getPembayaran((result)=>{
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
        this.app.get('/admin/pembayaran/:id_pembayaran', async (request,response)=>{
            const getResponse = {};
            const data = request.params.id_pembayaran;
            await helper.getPembayaranById(data,(result)=>{
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
        this.app.patch('/admin/pembayaran/:id_pembayaran', async(request,response)=>{
            const updateResponse = {};
            const body = request.body;
            const id_pembayaran = request.params.id_pembayaran;
            const data = {
                id_petugas : body.id_petugas,
                nisn : body.nisn,
                tgl_bayar : body.tgl_bayar,
                bulan_dibayar : body.bulan_dibayar,
                tahun_dibayar : body.tahun_dibayar,
                id_spp : body.id_spp,
                jumlah_bayar : body.id_petugas,
                status : body.status
            }
            await helper.updatePembayaran(data,id_pembayaran,(result)=>{
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

        this.app.delete('/admin/pembayaran/:id_pembayaran', async(request,response)=>{
            const deleteRespone = {};
            const id_pembayaran = request.params.id_pembayaran;
            await helper.deletePembayaran(id_pembayaran,(result)=>{
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
    pembayaranConfig(){
		this.appRouter();
	}

}

module.exports = Pembayaran;