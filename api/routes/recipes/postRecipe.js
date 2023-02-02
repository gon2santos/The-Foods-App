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

router.post("/create", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const msg = {
        name: req.body.name,
        summary: req.body.summary,
        hs: req.body.hs,
        sbs: req.body.sbs,
        diets: req.body.diets,
        vegetarian: req.body.vegetarian,
        vegan: req.body.vegan,
        glutenFree: req.body.glutenFree,
        dairyFree: req.body.dairyFree,
        /* tdc: req.body.tdc, */
    };
    req.body.vegetarian ? msg.diets.push('vegetarian') : {};
    console.log(`Recived: ${msg.name},\n ${msg.diets}, \n ${msg.vegetarian}, \n ${msg.vegan}, \n ${msg.glutenFree}, \n ${msg.dairyFree}`);

    var query = {
        name: req.body.name,
        summary: req.body.summary,
        hs: req.body.hs,
        sbs: req.body.sbs
    },
        update = {},
        options = { upsert: true };

    Recipe.default.findOneAndUpdate(query, update, options, function (error, result) {
        if (!error) {
            // If the document doesn't exist
            if (!result) {
                // Create it
                result = new Recipe.default({
                    name: req.body.name,
                    summary: req.body.summary,
                    hs: req.body.hs,
                    /* tdc: req.body.tdc, */
                    sbs: req.body.sbs,
                });
            }
            // Save the document
            result.save(function (error) {
                if (!error) {
                    return res.status(201).json({ created: true });
                } else {
                    throw error;
                }
            });
        }
    });
}));

exports.default = router;