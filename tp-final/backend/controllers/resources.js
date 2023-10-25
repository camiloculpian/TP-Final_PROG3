const resourcesBD = require('../dataBase/resourcesBD');

getCountryList = async(req, res) => {
    try{
        const response = await resourcesBD.getCountryList();
        if(response.errno){
            res.status(400).json({status:'ERROR', message:'ERROR: '+response.sqlMessage});
        }
        res.status(200).json({status:'OK',message:'', headers: response[1],data:response[0]});
    }catch (excep){
        res.status(400).json({status:'ERROR',message:excep});
        throw(excep);
    }
}

module.exports = {
    getCountryList,
}