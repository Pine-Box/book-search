import {getNamesList,getCurrentNamedListDetails,getArticles} from "/assets/js/api.js";



//api call backs
function nyCurrentCategories(results){
        console.log(results);
        // for (let i=0;i < results.length; i++){
        //
        // }
}

function  nyCurrentCategoryDetail(results){
        console.log(results);
        // for (let i=0;i < results.books.length; i++){
        //
        // }
}

function nyArticlesFromQuery(results){
        console.log(results);
        // for (let i=0;i < results.books.length; i++){
        //
        // }
}


// end of callbacks

function currentCategoryDetails(category,offset){
    getCurrentNamedListDetails(category,offset)
}

function currentCategories(){
    getNamesList();
}

function searchArticles(query){
    getArticles(query);
}

function searchResults(ev) {
    ev.preventDefault();
    console.log("search click")
}

$('#searchbtn').on('click', searchResults);


//getReviewByTitle('0553418025',encodeURIComponent('THE MARTIAN'), encodeURIComponent('Andy Weir'));


currentCategories();
currentCategoryDetails('hardcover-nonfiction',0);
searchArticles("Fourth Wing");


export{nyCurrentCategoryDetail, nyCurrentCategories, nyArticlesFromQuery};

//https://api.nytimes.com/svc/books/v3/reviews.json?isbn=0553418025&title=The+Martian&author=Andy+Weir&api-key=pifi4e25GCt32q2X47LeT8M19jNWKUgK