# PANTRY

## Description
![Home page](http://i.imgur.com/ysgCrL8.png)

PANTRY is a comprehansive tool for searching recipes that include ingredients that you already have at home for all food lovers, from professional cooks to just hungry people.

The application allows users without an account to search by ingredients (limited to 3 ingredients per search) or by recipe.

Logged in users have an additional capability to search with what's in their pantry while applying negative filters and excluding recipes that have ingredients they are allergic to (or just prefer to avoid). Additionally, logged in users are allowed to add recipes they liked to the favorite list and access them later. They can provide rating and comments to any recipe to share their experience with others.


## Technologies Used

The technologies used for writing this application include: 

- Node.js
- Express
- JavaScript
- jQuery
- MongoDB
- Mongoose
- Ajax
- Heroku
- Oauth
- HTML5
- CSS3
- Bootstrap
- Spoonacular API

## Getting Started

To start using the application, click Heroku link below, log in with your Google credentials, and enjoy the journey to the best recipes. 

#### [Link to Heroku] (https://my-pantry-app.herokuapp.com/)
#### [Link to Trello] (https://trello.com/b/GWwtiUd0/project-3-pantry)
#### [Link to Pitch Deck] (https://docs.google.com/presentation/d/1WvHoN5MNaRembgcoog5p0GtivVCOZSzvfPyeevzy08g/edit?usp=sharing)



## Next Steps

In the v2 of the application, the following features will be added:

- Allow users to filter search results and search based on cooking method (grill, steam, boil).
- Allow users to recalculate ingredients based on the serving size.
- Allow users to create a grocery list based on missing ingredients.
- Suggest alternative ingredients that user can use to substitude missing ingredients.
- Search Autocomplete - Predicting what the user is typing. Also helps with any misspelling, which returns an empty search. 
- Search by most popular - Being able to filter recipes results based on the ratings

## Major Hurdles
We encountered some hurdles during our production time with Pantry in the form of:
> * **Github merge errors** - These errors hampered our production throughout the process, eating valuable time by forcing us to focus on that problem before being able to move forward
> * **API Functionality** - The API we chose to use, Spoonacular, was both a blessing and a curse at the same time. Having so many different ways to do the same thing took time to sort through
> * **Favorites** - Saving the ID of favorites was difficult. 
> * **Routes for reviews** - The routes for the users kept returning a 404. The way the route was written was eventually the problem.

##Unsolved Issues
> * **Inconsistent API** - Different parts of the API produced different results when it came to producing images for the search results, making it hard to be able to do consistently display images depending on search.

