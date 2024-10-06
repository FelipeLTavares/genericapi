const ImageDto = require("../image/ImageDto");

class VehicleDto {
    id;
    name;
    brand; // marca
    make; // modelo
    year;
    color;
    mileage; // quilometragem
    fuel_type;
    price;
    images;

    constructor(vehicle) {
        this.id = vehicle.id
        this.name = vehicle.name;
        this.brand = vehicle.brand;
        this.make = vehicle.make;
        this.year = vehicle.year;
        this.color = vehicle.color;
        this.mileage = vehicle.mileage;
        this.fuel_type = vehicle.fuel_type;
        this.price = vehicle.price;

        this.images = vehicle.Images ? vehicle.Images.map(vehicle => new ImageDto(vehicle)) : [];
    }
}

module.exports = VehicleDto;