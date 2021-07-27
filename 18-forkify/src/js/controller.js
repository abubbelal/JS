import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import bookmarksView from './views/bookmarksView.js';
import paginationView from './views/paginationView.js';
import addRecipeView from './views/addRecipeView.js';
import { MODAL_CLOSE_SEC } from './config.js';


//for polifying JS
import 'regenerator-runtime/runtime'; //for polifying async await
import 'core-js/stable'; //for polifying other ES6 features
import { async } from 'regenerator-runtime';
import { MODAL_CLOSE_SEC } from './config.js';

// if(module.hot) {
//   module.hot.accept();
// }

const controlRecipes = async function () {
  try {

    const id = window.location.hash.slice(1);
    // console.log(id);

    if(!id) return;
    recipeView.renderSpinner();

    //0 update results view to mark selected search result
    resultsView.update(model.getSearchResultsPage());
    
    //1. loading recipe
    await model.loadRecipe(id); //model returns a promise so we have to await that promise
    
    //2. rendering recipe
    recipeView.render(model.state.recipe);
    
    //3 update bookmark view
    bookmarksView.update(model.state.bookmarks);
  } catch (e) {
    recipeView.renderError();
    console.error(e);
  }
}

const controlSearchResults = async function() {
  try {
    //1) get search query
    const query = searchView.getQuery();
    if(!query) return;

    //2) load search
    await model.loadSearchResults(query);

    //3) render results
    // console.log(model.state.search.results);
    // resultsView.render(model.state.search.results);
    resultsView.render(model.getSearchResultsPage());

    // 4) Render initial pagination
    paginationView.render(model.state.search);

  } catch(e) {
    console.log(e);
  }
}

const controlPagination = function(goToPage) {

    //render new results
    resultsView.render(model.getSearchResultsPage(goToPage));

    //render new pagination buttons
    paginationView.render(model.state.search);
};


const controlServings = function(newServings) {
  //update the recipe servings (in state)
  model.updateServings(newServings);

  //update the recipe view
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);

}

const controlAddBookmark = function() {
  //add/remove bookmark
  if(!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.addBookmark(model.state.recipe);

  //update recipe view
  // console.log(model.state.recipe);
  recipeView.update(model.state.recipe);

  //render bookmarks
  bookmarksView.render(model.state.bookmarks);
}

const controlAddRecipe = async function(newRecipe) {
  try {
    console.log(newRecipe);

    //show loading spinner
    addRecipeView.renderSpinner();

    //upload the new recipe data
    await model.uploadRecipe(newRecipe);
    console.log(model.state.recipe);

    //render recipe
    recipeView.render(model.state.recipe);

    //success message
    addRecipeView.renderMessage();

    //render bookmark view
    bookmarksView.render(model.state.bookmarks);

    //change id in url
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    //close form window
    setTimeout(function() {
      addRecipeView.toggleWindow()
    }, MODAL_CLOSE_SEC * 1000);
  } catch(e) {
    console.error('------------------ERROR', e);
    addRecipeView.renderError(e.message);
  }

}

const controlBookmarks = function() {
  bookmarksView.render(model.state.bookmarks);
}

const init = function() {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(addHandlerAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView._addHandlerUpload(controlAddRecipe);
  // controlServings();
}

init();