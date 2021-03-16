'user strict';

const db = require('../../../config/db');

class Helper{

    constructor(){
        this.db = db
    }

    registerPembayaran(data, callBack){
		try {
			this.db.query(`INSERT INTO pembayaran set ?`,[data],(error,res)=>{
                return callBack(res);
            });
		} catch (error) {
			console.error(error);
			return null;
		}
    }
    
    getPembayaran(callBack){
        try{
            this.db.query(`SELECT * FROM pembayaran`, (error,res)=>{
                return callBack(res);
            })
        }catch (error) {
            console.error(error);
            return callBack(null);
        }
    }
    getPembayaranById(data,callBack){
        try{
            this.db.query(`SELECT * FROM pembayaran WHERE id_pembayaran = ?`,[data],(error,res)=>{
                return callBack(res);
            })
        }catch(error){
            console.log(error);
            return null;
        }
    }
    updatePembayaran(data,id_pembayaran,callBack){
        try{
            this.db.query(`UPDATE pembayaran SET ? WHERE id_pembayaran =?`,[data,id_pembayaran],(error,res)=>{
                return callBack(res);
            })
        }catch(error){
            console.log(error);
            return null;
        }
    }
    deletePembayaran(id_pembayaran,callBack){
        try{
            this.db.query(`DELETE FROM pembayaran WHERE  id_pembayaran=?`,[id_pembayaran],(error,res)=>{
                return callBack(res)
            })
        }catch(error){
            console.log(error);
            return null;
        }
    }

}

module.exports = new Helper();