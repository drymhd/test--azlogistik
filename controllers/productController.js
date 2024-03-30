const client = require('../db/connection');
const productService = require('../services/productService');
const restapi = require('../helpers/restapi');
const Exception = require('../helpers/exception');


const show = async (req, res) => {
    try{
        const data = await productService.show(req.params.id);
        res.status(200).json(restapi(200, 'OK', data));
    } catch(err) {
        if(err instanceof Exception) {
            res.status(err.getStatusCode()).json(err);
        } else {
            res.status(500).json(restapi(500, err.toString(), null));
        }

    }
    

}


const create = async (req, res) => {
    try{
        // console.log()
        const data = await productService.create(req.body);
        res.status(200).json(restapi(200, 'OK', data));
    } catch(err) {
        if(err instanceof Exception) {
            res.status(err.getStatusCode()).json(err);
        } else {
            res.status(500).json(restapi(500, err.toString(), null));
        }

        // throw new Error(err);
    }
}

const pagination = async (req, res) => {
    try{
        const data = await productService.pagination(req.body);
        res.status(200).json(restapi(200, 'OK', data));
    } catch(err) {
        console.log(err)
        if(err instanceof Exception) {
            res.status(err.getStatusCode()).json(err.getException());
        } else {

            res.status(500).json(restapi(500, err.toString(), null));
        }
    }
}

const update = async (req, res) => {
    try{
        let product = await productService.show(req.params.id);
        if(req.body.name == product.name) {
            throw new Exception('name cannot be the same', 400);
          }
        const data = await productService.update(product, req.body);

        res.status(200).json(restapi(200, `Sukss mengubah product`, data));
    } catch(err) {
        if(err instanceof Exception) {
            res.status(err.getStatusCode()).json(err);
        } else {
            res.status(500).json(restapi(500, err.toString(), null));
        }

    }
}

const getAll = async (req, res) => {
    try{
        const data = await productService.getAll();
        res.status(200).json(restapi(200, 'OK', data));
    } catch(err) {
        if(err instanceof Exception) {
            res.status(err.getStatusCode()).json(err);
        } else {
            res.status(500).json(restapi(500, err.toString(), null));
        }

    }
}

const destroy = async (req, res) => {
    try{
        const merk = await productService.show(req.params.id);
        const data = await productService.destroy(merk);
        res.status(200).json(restapi(200, 'OK', data));
    } catch(err) {
        if(err instanceof Exception) {
            res.status(err.getStatusCode()).json(err);
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