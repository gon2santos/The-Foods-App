const { Router } = require('express');
require('dotenv').config();
const fetch = (...args) =>
    import('node-fetch').then(({ default: fetch }) => fetch(...args));
const { Recipe, Diet } = require('../db.js');
const { Op } = require("sequelize");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

const regexExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i; //regex for UUID check

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/recipes', async function (req, res) {
    const { name } = req.query;
    const condition = name ? { where: { name: { [Op.iLike]: `%${name}%` } } } : {};
    Recipe.findAll(condition) //response es un array, mapear responsedb en responseAPI.results
        .then(function (responseDB) {
            fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${name}&number=100&apiKey=${process.env.REACT_APP_API_KEY}&addRecipeInformation=true`)
                .then(function (responseAPI) {
                    return responseAPI.json();
                })
                .then(responseAPI => {
                    !responseAPI.results ?
                        responseAPI = {
                            ...responseAPI, results: responseDB.map(({ id, name, summary, hs }) => (
                                {
                                    id: id,
                                    healthScore: hs,
                                    title: name,
                                    summary: summary,
                                    image: 'https://spoonacular.com/recipeImages/606953-312x231.jpg'
                                }))
                        } :
                        responseAPI.results.push(...responseDB.map(({ id, name, summary, hs }) => (
                            {
                                id: id,
                                healthScore: hs,
                                title: name,
                                summary: summary,
                                image: 'https://spoonacular.com/recipeImages/606953-312x231.jpg'
                            })));
                    !responseAPI.results?.length ? res.status(404).json({ error: 'No recipes found' }) : res.json(responseAPI);
                })
        })
        .catch((e) => {
            console.error(`Error searching recipe list: ${e.message}`);
            res.status(503);
        })
})

router.get('/recipes/:idReceta', async (req, res) => {
    const { idReceta } = req.params;
    const condition = { where: { id: idReceta } };

    if (regexExp.test(idReceta)) {
        console.log("Requested recipe from db");
        Recipe.findOne(condition) //database
            .then(({ id, name, summary, hs, sbs }) => {
                const recipe = { id: id, title: name, summary: summary, healthScore: hs, instructions: sbs, image: 'https://spoonacular.com/recipeImages/606953-312x231.jpg' };
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
})


router.post("/create", async function (req, res) {
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
    };
    req.body.vegetarian ? msg.diets.push('vegetarian') : {};
    console.log(`Recived: ${msg.name},\n ${msg.diets}, \n ${msg.vegetarian}, \n ${msg.vegan}, \n ${msg.glutenFree}, \n ${msg.dairyFree}`);

    var recipe = null;

    Recipe.create({
        name: req.body.name,
        summary: req.body.summary,
        hs: req.body.hs,
        sbs: req.body.sbs
    })
    .then(result => {
        recipe = result;
        var search = msg.diets;
        return Diet.findAll({
            where: {
              name: { [Op.in]: search },
            },
            attributes: ['id']
        })
    })
    .then(dts => {
        recipe.addDiets(dts.map(i => i.id));
        return res.status(201).json({created : true});
    })
    .catch(e => {
        console.log(e);
        res.status(400).json({ error: e.message });
    })
})


module.exports = router;