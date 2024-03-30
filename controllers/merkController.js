const client = require('../db/connection');
const merkService = require('../services/merkService');
const restapi = require('../helpers/restapi');


const show = async (req, res) => {
    try{
        const data = await merkService.show(req.params.id);
        res.status(200).json(restapi(200, 'OK', data));
    } catch(err) {
        console.log(err);
        res.status(404).json(restapi(404, err.toString(), null));
        
        // throw new Error(err);
    }
    

}


const create = async (req, res) => {
    try{
        // console.log()
        const data = await merkService.create(req.body);
        res.status(200).json(restapi(200, 'OK', data));
    } catch(err) {
        console.log(err);
        res.status(404).json(restapi(404, err.toString(), null));
        
        // throw new Error(err);
    }
}

const update = async (req, res) => {
    try{
        const merk = await merkService.show(req.params.id);
        const data = await merkService.update(merk, req.body);
        res.status(200).json(restapi(200, 'OK', data));
    } catch(err) {
        console.log(err);
        res.status(500).json(restapi(500, err.toString(), null));
        
        // throw new Error(err);
    }
}

const destroy = async (req, res) => {
    try{
        const merk = await merkService.show(req.params.id);
        const data = await merkService.destroy(merk);
        res.status(200).json(restapi(200, 'OK', data));
    } catch(err) {
        console.log(err);
        res.status(500).json(restapi(500, err.toString(), null));
        
        // throw new Error(err);
    }
}

module.exports = {
    show,
    create,
    update,
    destroy
}