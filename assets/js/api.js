import {nyArticlesFromQuery,nyCurrentCategories,nyCurrentCategoryDetail} from "/assets/js/script.js";

const ny_api_key = "pifi4e25GCt32q2X47LeT8M19jNWKUgK";

const currentListsUrl = "https://api.nytimes.com/svc/books/v3/lists/current/";
const nameslisturl = "https://api.nytimes.com/svc/books/v3/lists/names.json?api-key=";
const articlesurl ="https://api.nytimes.com/svc/search/v2/articlesearch.json?q="



    // HTTP request
// https://api.nytimes.com/svc/books/v3/lists/{date}/{list}.json
// Path Parameters
// date (required)  string
// matches ^(\d{4}-\d{2}-\d{2}|current)$YYYY-MM-DD or "current"
//
// The date the best sellers list was published on NYTimes.com. Use "current" to get latest list.
// list (required) string
//
// Name of the Best Sellers List (e.g. hardcover-fiction). You can get the full list of names from the /lists/names.json service.

// Query Parameters
// offset
// integer
//
// must be a multiple of 20
//
// Sets the starting point of the result set (0, 20, ...). Used to paginate thru books if list has more than 20. Defaults to 0. The num_results field indicates how many books are in the list.


//this recevies the array of names from the fetch call and can be used to populate page controls
    //
    //Returns a list of names (categories) for book types
    function getNamesList() {

        let url = nameslisturl + ny_api_key;
        console.log(url);
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
        console.log(url);
        fetch(url)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
               return nyCurrentCategoryDetail(data);
            });
    }


    function getArticles(query){
        let url = articlesurl +query+"&api-key=" + ny_api_key;
        console.log(url);
        fetch(url)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
               return nyArticlesFromQuery(data);
            });
    }

export {getCurrentNamedListDetails,getNamesList,getArticles}
