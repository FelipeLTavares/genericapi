module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    nickname: DataTypes.STRING,
    description: DataTypes.STRING
  }, {});
  
  User.associate = (models) => {
    User.belongsToMany(models.Image, { through: 'UserImages' });
  };
  
  return User;
};