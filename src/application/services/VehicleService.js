const db = require("../../database/models");
const VehicleDto = require("../dtos/vehicle/VehicleDto");
const ImageStoragerClient = require('../clients/ImageStoragerClient.js')

class VehicleService {

    vehicleRepository;

    constructor(db) {
        this.vehicleRepository = db.Vehicle;
        this.imageRepository = db.Image;
    }

    async getOne(id) {
        const vehicle = await this.vehicleRepository.findOne({ where: { id } });
        const vehicleDto = new VehicleDto(vehicle);
        return vehicleDto;
    }

    async getAll() {
        const vehicles = await this.vehicleRepository.findAll({
            include: this.imageRepository
        });
        const vehicleDtolist = vehicles.map(vehicle => new VehicleDto(vehicle));
        return vehicleDtolist;
    }
    
    async create(vehicleData, images = []) {
        const vehicle = await this.vehicleRepository.create(vehicleData, {
            include: [db.Image]
        });
        const uploadedImages = [];

        for(let img of images) {
            const uploadedImage = await ImageStoragerClient.upload(img)
            const savedimage = await this.imageRepository.create({ url: uploadedImage.url, public_id: uploadedImage.publicId })
            uploadedImages.push(savedimage)
        }
        await vehicle.addImages(uploadedImages);
        vehicle.Images = uploadedImages;

        const vehicleDto = new VehicleDto(vehicle);
        return vehicleDto;
    }

    async delete(id) {
        const result = await this.vehicleRepository.destroy({ where: { id } })
        return result;
    }
}

const vehicleService = new VehicleService(db);

module.exports = vehicleService;