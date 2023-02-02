/* const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('diet', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      
      allowNull: false
    }
  }, {
    timestamps: false
  });
}; */

//===================== new =======================
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const dietSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    }
}, {
    versionKey: false,
    timestamps: false,
});
exports.default = (0, mongoose_1.model)("Diet", dietSchema);
