import React from 'react';
import { Route, Switch } from 'react-router-dom';
import DoneRecipes from './pages/DoneRecipes';
import DrinkIngredients from './pages/DrinkIngredients';
import DrinkInProgress from './pages/DrinkInProgress';
import DrinkRecipe from './pages/DrinkRecipe';
import Drinks from './pages/Drinks';
import Explore from './pages/Explore';
import ExploreDrinks from './pages/ExploreDrinks';
import ExploreFoods from './pages/ExploreFoods';
import Favorites from './pages/Favorites';
import FoodIngredients from './pages/FoodIngredients';
import FoodInProgress from './pages/FoodInProgress';
import FoodRecipe from './pages/FoodRecipe';
import Foods from './pages/Foods';
import Login from './pages/Login';
import Nationalities from './pages/Nationalities';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';

const Routes = () => (
  <Switch>
    <Route component={ Login } path="/" exact />
    <Route component={ Foods } path="/foods" exact />
    <Route component={ Drinks } path="/drinks" exact />
    <Route component={ FoodRecipe } path="/foods/:id" exact />
    <Route component={ DrinkRecipe } path="/drinks/:id" exact />
    <Route component={ FoodInProgress } path="/foods/:id/in-progress" exact />
    <Route component={ DrinkInProgress } path="/drinks/:id/in-progress" exact />
    <Route component={ Explore } path="/explore" exact />
    <Route component={ ExploreFoods } path="/explore/foods" exact />
    <Route component={ ExploreDrinks } path="/explore/drinks" exact />
    <Route component={ FoodIngredients } path="/explore/foods/ingredients" exact />
    <Route component={ DrinkIngredients } path="/explore/drinks/ingredients" exact />
    <Route component={ Nationalities } path="/explore/foods/nationalities" exact />
    <Route component={ Profile } path="/profile" exact />
    <Route component={ DoneRecipes } path="/done-recipes" exact />
    <Route component={ Favorites } path="/favorite-recipes" exact />
    <Route component={ NotFound } path="*" />
  </Switch>
);

export default Routes;
