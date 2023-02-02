# Henry Foods


Henry Foods is a full stack, responsive application made using the following technologies: React, Redux, React-Router, Express and Postgres interfacing via Sequelize ORM. The deployed application can be found at [henryfoods.vercel.app](https://henryfoods.vercel.app/).


# Front-end features





## Landing Page


## Main page
Features a navigation bar containing a search field to find recipes. The user can search for specific recipes or just type a few keywords to find related results.



## Recipes List


Upon searching for a recipe a list with results will be displayed on the same route. If more than 9 results are shown, the list will get cut into pages of up to 9 results each and the user can navigate through them using the navigation buttons. The user can also filter results by type of diet and reorder them by name or Health Score.
## Create New Recipes
New recipes can be created when clicking on the **Create New Recipe** button on the right side of the navigation bar. A dynamically controlled form is offered to fill in the Name, Summary, Health Score, Diets and Instructions of the new recipe. Only when the obligatory fields are properly completed the **Submit** button will be enabled and a confirmation message will be shown when the recipe js correctly added into the database. The app will not add two identical recipes and an appropriate warning message will be shown in case the user attempts to do that.


