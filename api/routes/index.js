"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();

/* ============PRODUCTS FILES============ */
const postRecipe = __importDefault(require("./recipes/postRecipe"));
const getRecipe = __importDefault(require("./recipes/getRecipe"));
const getDiets = __importDefault(require("./diets/getDiets"));
const findRecipes = __importDefault(require("./recipes/findRecipes"));

const test =  __importDefault(require("./test/getTest"));



/* ============PRODUCTS============ */
router.use("/", postRecipe.default);
router.use("/", getRecipe.default);
router.use("/", getDiets.default);
router.use("/", findRecipes.default);

router.use("/", test.default);

exports.default = router;