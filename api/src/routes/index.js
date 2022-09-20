const { Router } = require('express');
require('dotenv').config();
const fetch = (...args) =>
    import('node-fetch').then(({ default: fetch }) => fetch(...args));
const { Recipe, Diet } = require('../db.js');
const { Op } = require("sequelize");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

const regexExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi; //regex for UUID check

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/recipes', async function (req, res) {
    const { name } = req.query;
    const condition = name ? { where: { name: { [Op.iLike]: `%${name}%` } } } : {};
    const responseDB = await Recipe.findAll(condition); //response es un array, mapear responsedb en responseAPI.results
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
        });
})

router.get('/recipes/:idReceta', async (req, res) => {
    const { idReceta } = req.params;
    const condition = { where: { id: idReceta } };
    
    regexExp.test(idReceta) ? 
    Recipe.findOne(condition)
    .then(response => {res.json(response);}) :
    fetch(`https://api.spoonacular.com/recipes/${idReceta}/information?apiKey=${process.env.REACT_APP_API_KEY}`)
        .then(response => response.json())
        .then(response => {
            res.json(response);
        });
})

router.post("/create", async function (req, res) {
    try {
        const msg = { name: req.body.name, summary: req.body.summary, hs: req.body.hs, sbs: req.body.sbs, diets: req.body.diets };
        console.log(`Recived ${msg}`);
        const [instance, created] = await Recipe.findOrCreate({
            where: { name: req.body.name },
            defaults: {
                name: req.body.name,
                summary: req.body.summary,
                hs: req.body.hs,
                sbs: req.body.sbs
            }
        });
        res.status(201).json({ created: created });
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
})


module.exports = router;
