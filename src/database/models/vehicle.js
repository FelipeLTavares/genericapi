module.exports = (sequelize, DataTypes) => {
  const Vehicle = sequelize.define('Vehicle', {
    name: DataTypes.STRING,
    brand: DataTypes.STRING,
    make: DataTypes.STRING,
    year: DataTypes.INTEGER,
    color: DataTypes.STRING,
    mileage: DataTypes.INTEGER,
    fuel_type: DataTypes.STRING,
    price: DataTypes.DECIMAL
  }, {});
  
  Vehicle.associate = (models) => {
    Vehicle.belongsToMany(models.Image, { through: 'VehicleImages' });
  };
  
  return Vehicle;
};