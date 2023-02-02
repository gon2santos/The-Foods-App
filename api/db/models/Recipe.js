/* const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,

    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    summary: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    hs: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    tdc: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    sbs: {
      type: DataTypes.TEXT,
    }
  }, {
    timestamps: false
  });
}; */
//===================== new =======================
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const recipeSchema = new mongoose_1.Schema({
  name: {
    type: String,
    required: true,
  },
  summary: {
    type: String,
    required: true,
  },
  hs: {
    type: Number,
    required: true,
  },
  /* tdc: {
    type: Number,
    required: true,
  }, */
  sbs: {
    type: String,
    required: true,
  },
}, {
  versionKey: false,
  timestamps: false,
});
exports.default = (0, mongoose_1.model)("Recipe", recipeSchema);