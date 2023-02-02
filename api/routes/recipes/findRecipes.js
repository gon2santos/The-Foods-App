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


router.get('/recipes', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.query;
    const condition = name ? {name: { $regex: '.*' + name + '.*' }/* , include: Diet  */} : {};
    Recipe.default.find(condition).lean() //response es un array, mapear responsedb en responseAPI.results
        .then(function (responseDB) {
            fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${name}&number=100&apiKey=${process.env.REACT_APP_API_KEY}&addRecipeInformation=true`)
                .then(function (responseAPI) {
                    return responseAPI.json();
                })
                .then(responseAPI => {
                    !responseAPI.results ?
                        responseAPI = {
                            ...responseAPI, results: responseDB.map(({ _id, name, summary, hs, diets }) => (
                                {
                                    id: _id,
                                    healthScore: hs,
                                    title: name,
                                    summary: summary,
                                    diets: diets.map(i => i.name),
                                    image: 'https://spoonacular.com/recipeImages/606953-312x231.jpg'
                                }))
                        } :
                        responseAPI.results.push(...responseDB.map(({ _id, name, summary, hs /*, diets */ }) => (
                            {
                                id: _id,
                                healthScore: hs,
                                title: name,
                                summary: summary,
                                /* diets: diets.map(i => i.name), */
                                image: 'https://spoonacular.com/recipeImages/606953-312x231.jpg'
                            })));
                    !responseAPI.results?.length ? res.status(404).json({ error: 'No recipes found' }) : res.json(responseAPI);
                })
        })
        .catch((e) => {
            console.error(`Error searching recipe list: ${e.message}`);
            res.status(503);
        })
}));

exports.default = router;