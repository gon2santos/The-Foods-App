"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });

const express_1 = require("express");
const Recipe = __importDefault(require('../../db/models/Recipe'));
const router = (0, express_1.Router)();
const dotenv = require('dotenv');

const fetch = (...args) =>
    import('node-fetch').then(({ default: fetch }) => fetch(...args));

const regexExp = /^[a-f\d]{24}$/i;

router.get('/recipes/:idReceta', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idReceta } = req.params;
    const condition = { _id: idReceta };

    if (regexExp.test(idReceta)) {
        console.log("Requested recipe from db");
        Recipe.default.findOne(condition).lean()
            .then(({ id, name, summary, hs, sbs/* , diets */ }) => {
                const recipe = { id: id, title: name, summary: summary/* , diets: diets.map(i => i.name) */, healthScore: hs/* , tdc: tdc */, instructions: sbs, image: 'https://spoonacular.com/recipeImages/606953-312x231.jpg' };
                res.json(recipe);
            })
    }
    else {
        console.log("Requested recipe from api");
        fetch(`https://api.spoonacular.com/recipes/${idReceta}/information?apiKey=${process.env.REACT_APP_API_KEY}`) //api
            .then(response => response.json())
            .then(response => {
                res.json(response);
            })
            .catch((e) => {
                console.error(`Error bringing specific recipe from api: ${e.message}`);
            })
    }
}));

exports.default = router;