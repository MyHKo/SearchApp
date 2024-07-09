'use strict';
import {setSearchFocus, showClearTextButton} from "./searchBar";
import {getSearchTerm} from "./dataFunctions";
import {buildSearchResults,
    deleteSearchResults,
    clearStatsLine,
    setStatsLine
} from "./searchResults";

document.addEventListener("readystatechange", function(event) {
    if(event.target.readyState === "complete") {
        initApp();
    }
})

const initApp = () => {
    setSearchFocus();
    const search = document.getElementById("search");
    search.addEventListener("input", showClearTextButton);

    const form = document.getElementById('searchBar');
    form.addEventListener('submit', submitTheSearch);
};

const submitTheSearch = (event) => {
    event.preventDefault();
    deleteSearchResults();
    proccesTheSearch();
    setSearchFocus()
};



const proccesTheSearch = async () => {

    const searchTerm = gerSearchTerm();
    if(searchTerm === "") return;
    const resultArray = await retrieveSearchResults(searchTerm);
    if(resultArray.length) buildSearchResults(resultArray);
    setStatsLine(resultArray.length );
};

