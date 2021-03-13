'user strict';

const db = require('../../config/db');

class Helper{

    constructor(){
        this.db = db
    }

    async registerKelas(params){
		try {
			return await this.db.query(`INSERT INTO kelas set ?`,[params]);
		} catch (error) {
			console.error(error);
			return null;
		}
    }
    
    async getKelas(){
        try{
            return await this.db.query(`SELECT * FROM kelas`)
        } catch (error) {
            console.error(error);
            return null;
        }
    }
    async getKelasById(data){
        try{
            return await this.db.query(`SELECT * FROM kelas WHERE id_kelas = ?`,[data])
        }catch(error){
            console.log(error);
            return null
        }
    }
    async updateKelas(data,id_kelas){
        try{
            return await this.db.query(`UPDATE kelas SET ? WHERE id_kelas =?`,[data,id_kelas])
        }catch(error){
            console.log(error);
            return null
        }
    }

}

module.exports = new Helper();