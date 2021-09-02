'use strict'
import recipeView from "./views/demorecipeView.js";
import { MODAL_CLOSE_SEC } from "./democonfig.js";
import * as model from "./demomodel.js";
import resultView from "./views/demoresultView";
import bookmarksView from "./views/demobookmarksView";
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import SearchView from "./views/demosearchView.js";
import AddRecipeView from "./views/demoaddRecipeView.js";
import paginationView from "./views/demopaginationView.js";
//export const API_URL = 'https://forkify-api.herokuapp.com/api/v2/recipes/';


console.log("welcome");
const fn = async function () {
    //loading the recipe

    try {

        const id = window.location.hash.slice(1);
        if (!id) return;
       
        recipeView.renderspinner();
        resultView.update(model.getSearchResultsPage());
        bookmarksView.update(model.state.bookmark);
        await model.loadRecipe(id);
        const recipe = model.state.recipe;
       // console.log("hi");
        //console.log(recipe);
        recipeView.render(recipe); 
       
      }
    catch (e) {

        recipeView.renderError();

    }
    


};

const controlSearchResults = async function () {
    try {
        resultView.renderspinner();
        const query = SearchView.getQuery();
        if (!query) return;
        await model.loadSearchResult(query);
       // const searchResult=model.state.search.results;
     
        resultView.render(model.getSearchResultsPage(1));
        paginationView.render(model.state.search);

    }
    catch (err) {
        console.log(err);

    }


};



//fn();
const controlServings = function (servings) {
    model.updateServings(servings);
    const recipe = model.state.recipe;
    recipeView.update(recipe);
    //recipeView.render(recipe);

}



const controlPagination = function (goto) {


    resultView.render(model.getSearchResultsPage(goto));
    paginationView.render(model.state.search);

}
const controlBookmark = function () {
    if (!model.state.recipe.bookMarked) { model.bookMark(model.state.recipe); }
    else { model.deleteBookMarked(model.state.recipe.id)}
    console.log(model.state.recipe);
    recipeView.update(model.state.recipe);
   
    bookmarksView.render(model.state.bookmark);
}
const controlSavedBookmark = function () {
    bookmarksView.render(model.state.bookmark);

}
const controlAddRecipe = async function (newRecipe) {

    try {
        AddRecipeView.renderspinner();
        await model.uploadRecipe(newRecipe);
        recipeView.render(model.state.recipe);
        AddRecipeView.renderMessage();
        bookmarksView.render(model.state.bookmarks);
        window.history.pushState(null, '', `#${model.state.recipe.id}`);
        
        setTimeout(function () { AddRecipeView.toggleWindow(); }, MODAL_CLOSE_SEC*1000);
        
    }
    catch (err) {

        console.error(err);
        AddRecipeView.renderError(err.message);

    }
};

const init = function () {
    AddRecipeView._addHandlerUpload(controlAddRecipe);
    bookmarksView.addHandlerRender(controlSavedBookmark)
    recipeView.addHandleRender(fn);
    recipeView.addHandlerUpdateServings(controlServings);
    recipeView.addHandlerBookmark(controlBookmark);
    SearchView.addHandlerSearch(controlSearchResults);
    paginationView.addHandlerPagination(controlPagination);
}


init();


//window.addEventListener("hashchange", fn);
//window.addEventListener("load", fn);