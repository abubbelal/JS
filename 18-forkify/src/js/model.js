import {async} from 'regenerator-runtime.js';
import { API_URL, RES_PER_PAGE, KEY } from './config.js';
// import { getJSON, sendJSON } from './helpers.js';
import { AJAX } from '/helpers.js';


export const state = {
    recipe: {},
    search: {
        query: '',
        results: [],
        resultsPerPage: RES_PER_PAGE,
        page: 1,
    },
    bookmarks: [],
};

const createRecipeObject = function (data) {
    let { recipe } = data.data;
    state.recipe = {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        sourceUrl: recipe.source_url,
        image: recipe.image_url,
        servings: recipe.servings,
        cookingTime: recipe.cooking_time,
        ingredients: recipe.ingredients,
        ...(recipe.key && {key: recipe.key}), //we can short circuit the recipe if it exists and add it
    };
};


export const loadRecipe = async function(id) {
    try {     
        
        const data = await AJAX(`${API_URL}${id}?key=${KEY}`);

        state.recipe = createRecipeObject(data);

        if(state.bookmarks.some(bookmark => bookmark.id === id)){
            state.recipe.bookmarked = true;
        } else {
            state.recipe.bookmarked = false;
        }
        
        // console.log(state.recipe);
    } catch (e) {
        throw e;
    }
}

export const loadSearchResults = async function(query) {
    try {
        state.search.query = query;
        const data = await AJAX(`${API_URL}?search=${query}&key=${KEY}`);
        console.log(data);

        state.search.results = data.data.recipes.map(rec => {
            return {
                id: rec.id,
                title: rec.title,
                publisher: rec.publisher,
                image: rec.image_url,
                ...(rec.key && {key: rec.key})
            }
        });
        state.search.page = 1; //when we search for a new query reset page back to 1
        console.log(state.search.results);
    }catch(e) {
        console.error(`${e} -------------`);
        throw e;
    }
}


export const getSearchResultsPage = function(page = state.search.page) {
    state.search.page = page;

    const start = (page - 1) * state.search.resultsPerPage;//0;
    const end = page * state.search.resultsPerPage; //9;

    return state.search.results.slice(start, end);
}

export const updateServings = function(newServings) {
    state.recipe.ingredients.forEach(ing => {
        ing.quantity = ing.quantity * newServings / state.recipe.servings;
        //new quantity = old quantity * new servings / old servings -- 2 * 8 / 4
    });

    state,recipe.servings = newServings;
}

const persistBookmarks = function () {
    localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
}

export const addBookmark = function(recipe) {
    //add bookmark
    state.bookmarks.push(recipe);

    //mark current recipe as bookmark
    if(recipe.id === state.recipe.id) {
        state.recipe.bookmarked = true;
    }

    persistBookmarks();
}

export const deleteBookmart = function (id) {
    //delete bookmark
    const index = state.bookmarks.findIndex(el => el.id === id); //finding element index of bookmark
    state.bookmarks.splice(index, 1);

    //remove mark current recipe as bookmark
    if(id === state.recipe.id) {
        state.recipe.bookmarked = false;
    }

    persistBookmarks();
}

export const uploadRecipe = async function (newRecipe) {
    try{

        console.log(Object.entries(newRecipe));
        
        const ingredients = Object.entries(newRecipe).filter(
            entry => entry[0].startsWith('ingredient') && entry[1] != ''
            ).map(ing => {
                // const ingArr = ing[1].replaceAll(' ', '').split(',');
                const ingArr = ing[1].split(',').map(el => el.trim());
                if(ingArr.length !== 3){
                    throw new Error ("Wrong ingredient format! Please use the correct format.");
                }
                
                const [quantity, unit, description] = ingArr;
                
                return {quantity: quantity ? +quantity : null, unit, description};
            });
            console.log(ingredients);
            const recipe = {
                title: newRecipe.title,
                source_url: newRecipe.sourceUrl,
                image_url: newRecipe.image,
                publisher: newRecipe.publisher,
                cooking_time: +newRecipe.cookingTime,
                servings: +newRecipe.servings,
                ingredients,
            };
            console.log(recipe);

            const data = await AJAX(`${API_URL}?key=${KEY}`, recipe);
            state.recipe = createRecipeObject(data);
            addBookmark(state.recipe);
    } catch (e) {
        throw e;
    }



};



const init = function() {
    const storage = localStorage.getItem('bookmarks');
    if(storage) state.bookmarks = JSON.parse(storage);
}

init();

const clearBookmarks = function() {
    localStorage.clear('bookmarks');
}
// clearBookmarks(); //use just for testing
