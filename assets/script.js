const api_key = "AIzaSyAoTcAFZL5EMGE3k7XKgBfMrhJ3uLJ2wa0";

https://www.googleapis.com/books/v1/volumes?q=jaws&key=

function getbookbysearchtext( search
) {
    //get lat lon
    let url = "https://www.googleapis.com/books/v1/volumes?q=jaws&key=" + api_key;
    fetch(url)
        .then(function (response) {
              return response.json();
        })
        .then(function (data) {
            //console.log(data);
            console.log(data.totalItems);
            console.log(data.items[1].volumeInfo.title);
            console.log(data.items[1].volumeInfo.description);
            console.log(data.items[1].volumeInfo.authors[0]);
            console.log(data.items[1].volumeInfo.imageLinks.thumbnail)

        });

}


function searchResults(ev){
    ev.preventDefault();
    console.log("search click")
   getbookbysearchtext(ev.currentTarget.textContent);
}



$(#searchbtn).on('click', searchResults);