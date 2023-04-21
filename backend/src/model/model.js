const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('my_todo', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});
const { DataTypes } = require('sequelize');

const User = sequelize.define('User1s', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const Task = sequelize.define('tasks', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('done', 'pending', 'in progress', 'completed'),
    allowNull: false,
    defaultValue: 'pending',
  },
});

User.hasMany(Task);
Task.belongsTo(User);


sequelize.sync().then(() => {
  console.log('Database synchronized');
}).catch((err) => {
  console.error('Failed to sync database:', err);
});
