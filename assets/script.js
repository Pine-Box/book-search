const api_key = "AIzaSyDb8mu9vXX_Wwpbz2-Ayj6Csw8uyU_-M2U";

//www.googleapis.com/books/v1/volumes?q=jaws&key=

https: function getbookbysearchtext(search) {
  //get lat lon
  let url = `https://www.googleapis.com/books/v1/volumes?q=${search}&key=${api_key}`;
  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      //console.log(data);
      console.log(data);

      console.log(data.items[0].volumeInfo.imageLinks.thumbnail);

      var link = data.items[0].volumeInfo.imageLinks.thumbnail;

      $("#book-results").empty();

      const card = $("<div>").addClass("card mb-3");
      const cardBody = $("<div>").addClass("card-body");

      const image = $("<img>")
        .addClass("card-img-top")
        .attr("src", link)
        .attr("alt", "Book Cover");
      cardBody.append(image);

      $("#book-results").append(card);
    });
}

function searchResults(ev) {
  ev.preventDefault();
  // console.log("search click")
  getbookbysearchtext(ev.currentTarget.textContent);
}

// getbookbysearchtext('jaws');
$("#searchbtn").on("click", searchResults);
