'user strict';

const db = require('../../config/db');

class Helper{

    constructor(){
        this.db = db
    }

    login(data,callBack){
        try {
			this.db.query(`SELECT * FROM petugas where username=?`,[data.username],(error,result)=>{
                return callBack(result);
            });
		} catch (error) {
			console.error(error);
			return null;
		}
    }

}

module.exports = new Helper();