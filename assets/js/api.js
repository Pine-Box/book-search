import {nyArticlesFromQuery,nyCurrentCategories,nyCurrentCategoryDetail} from "./script.js";

const ny_api_key = "IMjI2O8WOEoEHEAW0QERFNiclXEgPgIh";

const currentListsUrl = "https://api.nytimes.com/svc/books/v3/lists/current/";
const nameslisturl = "https://api.nytimes.com/svc/books/v3/lists/names.json?api-key=";
const articlesurl ="https://api.nytimes.com/svc/search/v2/articlesearch.json?q="


    //Returns a list of names (categories) for book types
    function getNamesList() {

        let url = nameslisturl + ny_api_key;

        fetch(url)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {

                return nyCurrentCategories(data);

            });
    }


    function getCurrentNamedListDetails(list_name_encoded, offset) {

        let url = currentListsUrl + list_name_encoded + "/?offset=" + offset + "&api-key=" + ny_api_key;
 
        fetch(url)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
               return nyCurrentCategoryDetail(data);
            });
    }


    function getArticles(query, author){
        let url = articlesurl +query+"&fq=persons:"+ author +"&api-key=" + ny_api_key;
   
        fetch(url)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
               return nyArticlesFromQuery(data);
            });
    }

export {getCurrentNamedListDetails,getNamesList,getArticles}
