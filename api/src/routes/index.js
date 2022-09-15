const { Router } = require('express');
require('dotenv').config();
const fetch = (...args) =>
	import('node-fetch').then(({default: fetch}) => fetch(...args));
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/', (req, res) => {
    res.send('Successful response! :P')
})
router.get('/recipes', (req, res) => {
    fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${req.query.name}&number=100&apiKey=${process.env.REACT_APP_API_KEY}&addRecipeInformation=true`)
        .then(response => response.json())
        .then(response => {
            !response.results.length ? res.status(404).json({ error: 'No recipes found' }) : res.json(response);
        });
})


module.exports = router;
