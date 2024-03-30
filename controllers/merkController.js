const client = require('../db/connection');
const merkService = require('../services/merkService');
const restapi = require('../helpers/restapi');
const Exception = require('../helpers/exception');


const getAll = async (req, res) => {
    try{
        const data = await merkService.getAll();
        res.status(200).json(restapi(200, 'OK', data));
    } catch(err) {

        if(err instanceof Exception) {
            res.status(err.getStatusCode()).json(err.getException());
        } else {
            res.status(500).json(restapi(500, err.toString(), null));
        }
    }
}

const show = async (req, res) => {
    try{
        const data = await merkService.show(req.params.id);
        res.status(200).json(restapi(200, 'OK', data));
    } catch(err) {

        if(err instanceof Exception) {
            res.status(err.getStatusCode()).json(err.getException());
        } else {
            res.status(500).json(restapi(500, err.toString(), null));
        }

    }
    

}


const create = async (req, res) => {
    try{
        // console.log()
        const data = await merkService.create(req.body);
        res.status(200).json(restapi(200, 'OK', data));
    } catch(err) {

        if(err instanceof Exception) {
            res.status(err.getStatusCode()).json(err.getException());
        } else {
            res.status(500).json(restapi(500, err.toString(), null));
        }
    }
}

const update = async (req, res) => {
    try{
        let merk = await merkService.show(req.params.id);
        if(req.body.name == merk.name) {
            throw new Exception('name cannot be the same', 400);
          }
        const data = await merkService.update(merk, req.body);
        res.status(200).json(restapi(200, 'OK', data));
    } catch(err) {

        if(err instanceof Exception) {
            res.status(err.getStatusCode()).json(err.getException());
        } else {
            res.status(500).json(restapi(500, err.toString(), null));

        }

    }
}

const destroy = async (req, res) => {
    try{
        const merk = await merkService.show(req.params.id);
        const data = await merkService.destroy(merk);
        res.status(200).json(restapi(200, 'OK', data));
    } catch(err) {

        if(err instanceof Exception) {
            res.status(err.getStatusCode()).json(err.getException());
        } else {

            res.status(500).json(restapi(500, err.toString(), null));
        }

    }
}


const pagination = async (req, res) => {
    try{
        const data = await merkService.pagination(req.body);
        res.status(200).json(restapi(200, 'OK', data));
    } catch(err) {

        if(err instanceof Exception) {
            res.status(err.getStatusCode()).json(err.getException());
        } else {

            res.status(500).json(restapi(500, err.toString(), null));
        }
    }
}

module.exports = {
    show,
    create,
    update,
    destroy,
    getAll,
    pagination
}