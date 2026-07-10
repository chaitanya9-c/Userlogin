const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Note = sequelize.define(
  "notes",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    description: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },

    categories: {
      type: DataTypes.ENUM(
        "Personal",
        "Work",
        "Study",
        "Meeting",
        "Task",
        "Reminder",
        "Ideas",
        "Shopping",
        "Finance",
        "Health"
      ),
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Note