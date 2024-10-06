module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define('Image', {
    url: DataTypes.STRING,
    public_id: DataTypes.STRING
  }, {});
  
  Image.associate = (models) => {
    Image.belongsToMany(models.Vehicle, { through: 'VehicleImages' });
    Image.belongsToMany(models.User, { through: 'UserImages' });
  };
  
  return Image;
};