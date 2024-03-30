const client = require('../db/connection');
const merkService = require('../services/merkService');
const productService = require('../services/productService');
const restapi = require('../helpers/restapi');
const Exception = require('../helpers/exception');

const summary = async (req, res) => {
    try{
        const merk = await merkService.getAll();
        const summary = await productService.getAll();
        res.status(200).json(restapi(200, 'OK', {
            merk: merk.length,
            product: summary.length
        }));
    } catch(err) {
        res.status(500).json(restapi(500, err.toString(), null));
    }
}



module.exports = {
    summary
}