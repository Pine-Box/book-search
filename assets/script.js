const api_key = "AIzaSyAoTcAFZL5EMGE3k7XKgBfMrhJ3uLJ2wa0";

https://www.googleapis.com/books/v1/volumes?q=jaws&key=

    function getbookbysearchtext(search
    ) {
        //get lat lon
        let url = "https://www.googleapis.com/books/v1/volumes?q=" + search + "&key=" + api_key;
        fetch(url)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                //console.log(data);
                console.log(data.totalItems);

                for (let i = 0; i < 5; i++) {
                    let volumeinfo = data.items[i].volumeInfo;
                    if (volumeinfo.hasOwnProperty('title') === true)
                        console.log(data.items[i].volumeInfo.title);
                    else
                        console.log('title unavailable');
                    if (volumeinfo.hasOwnProperty('description') === true)
                        console.log(data.items[i].volumeInfo.description)
                    else
                        console.log('decription unavailable');

                    if (volumeinfo.hasOwnProperty('authors') === true)
                        console.log(data.items[i].volumeInfo.authors[0]);
                    else console.log('author unavailable');
                    if (volumeinfo.hasOwnProperty('imageLinks') === true)
                        console.log(data.items[i].volumeInfo.imageLinks.thumbnail)
                    else console.log('thumbnail unavailable');
                }

            });

    }


function searchResults(ev) {
    ev.preventDefault();
    console.log("search click")
    getbookbysearchtext(ev.currentTarget.textContent);
}


// getbookbysearchtext('jaws');
$('#searchbtn').on('click', searchResults);