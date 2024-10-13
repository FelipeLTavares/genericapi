const express = require('express');
const vehicleService = require('../services/VehicleService');
const formParser = require('../utils/formParser');

const VehicleRouter = express.Router();

VehicleRouter.get('/find-one/:id', async (req, res) => {
    const response = await vehicleService.getOne(req.params.id)
    return res.status(200).json({ response })
})

VehicleRouter.get('/', async (req, res) => {
    const response = await vehicleService.getAll()
    return res.status(200).json({ response })
})

VehicleRouter.post('/', async (req, res) => {
    const {fields: vehicleData, files} = await formParser(req);
    const response = await vehicleService.create(vehicleData, files.image);
    return res.status(201).json({ response })
})

VehicleRouter.delete('/:id', async (req, res) => {
    const response = await vehicleService.delete(req.params.id);
    return res.status(204).json({ response })
})

module.exports = VehicleRouter;