const { Router } = require('express');
require('dotenv').config();
const fetch = (...args) =>
    import('node-fetch').then(({ default: fetch }) => fetch(...args));
const { Recipe, Diet } = require('../db.js');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/recipes', (req, res) => {
    fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${req.query.name}&number=100&apiKey=${process.env.REACT_APP_API_KEY}&addRecipeInformation=true`)
        .then(response => response.json())
        .then(response => {
            !response.results.length ? res.status(404).json({ error: 'No recipes found' }) : res.json(response);
        });
})

router.get('/recipes/:idReceta', (req, res) => {//preguntar si tiene la propiedad spoonacularSourceUrl, si no la tiene la receta esta en mi db, si la tiene esta en spoonacular
    fetch(`https://api.spoonacular.com/recipes/${req.params.idReceta}/information?apiKey=${process.env.REACT_APP_API_KEY}`)//reemplazar por llamado al server, meter esto en la api
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
            where: {name: req.body.name},
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
