const resourcesBD = require('../dataBase/resourcesBD');

getCountryList = async(req, res) => {
    try{
        const response = await resourcesBD.getCountryList();
        res.status(200).json({status:'OK',message:'', headers: response[1],data:response[0]});
    }catch (excep){
        throw(excep);
    }
}

module.exports = {
    getCountryList,
}