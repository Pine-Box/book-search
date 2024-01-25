import {
  getNamesList,
  getCurrentNamedListDetails,
  getArticles,
} from './api.js'


//api call backs
function nyCurrentCategories(results) {

  // for (let i=0;i < results.length; i++){
  //
  // }
}

const readingList = "history";
function loadHistory() {
  let history = JSON.parse(localStorage.getItem(readingList));
  if (history == null) history = [];
  return history;
}

function nyCurrentCategoryDetail(results) {
  
  $("#book-results").empty();
  for (let i = 0; i < results.results.books.length; i++) {
    var nyCurrentResults = results.results.books[i];

    var newCard = $(`
      <div class="row">
      <div class="mx-auto card mb-3 p-1" style="max-width: 50rem;">
        <div class="row">
          <div class="col-md-4">
            <img src=${nyCurrentResults.book_image} class="img-fluid rounded-start" alt="book cover">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">${nyCurrentResults.title}</h5>
              <h6>${nyCurrentResults.author}</h6>
              <p class="card-text">${nyCurrentResults.description}</p>
              <a href="#" class="btn btn-success readList-btn ms-0 m-2 data-bs-toggle="modal"
              data-bs-target="#bookDetailsModal"
              data-title="${nyCurrentResults.title}"
              data-author="${nyCurrentResults.author}"
              data-description="${nyCurrentResults.description}">Save to Read Later</a>
              <button
              type="button"
              class="btn btn-success m-2 newsModalBtn"
              id="newsModalBtn" 
              data-bs-toggle="modal"
              data-bs-target="#newsModal"
            >This Book in the News</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    `);

    $("#book-results").append(newCard);
  }

  $(".readList-btn").on("click", addToReadingList);

  //////////////////////////////////////////////////////////

  $(".newsModalBtn").on("click", searchArticles);

  //////////////////////////////////////////////////////////
}

function addToReadingList(event) {
  event.preventDefault();

  // Find the parent card element of the clicked button
  var cardElement = $(event.currentTarget).closest(".card");

  // Extract information from the card
  var title = cardElement.find(".card-title").text();
  var author = cardElement.find("h6").text();

  // Create an object with the extracted information
  var bookInfo = {
    title: title,
    author: author,
  };

  // Get the existing reading list from local storage
  var readingList = loadHistory();
  var readingKey = "history";
  

  // Add the new book to the reading list only if it does not exist in the array
  // found is True if it finds an object with the same title and author
  const found = readingList.some(function (object) {
    return object.title === bookInfo.title && object.author === bookInfo.author;
  });

  if (!found) {
    readingList.push(bookInfo);
    // Store the updated reading list in local storage
    localStorage.setItem(readingKey, JSON.stringify(readingList));
  }

}

// Function to handle modal details when it is shown
function handleModalDetails(event) {
  var history = loadHistory();

  // clear the content of the modal so that every time it is clicked, it doesnt append the array again
  var modalContent = $("#bookDetailsModalBody");
  modalContent.empty();
  // var button = $(event.relatedTarget); // Button that triggered the modal
  for (let i = 0; i < history.length; i++) {
    // Dynamically fill in the details
    var title = history[i].title; // Extract data from the button
    var author = history[i].author;
    var listItem = $(`<div class="reading-list-item">
    <h5 id="title">${title}</h5>
    <h6 id="author">${author}</h6>
    </div>
  `);

    var removeButton = $("<button>");
    removeButton.text("Remove");
    removeButton.addClass("btn btn-danger");

    removeButton.on("click", function (event) {
      var bookTitle = $(event.target).parent().children("#title").text();
      var bookAuthor = $(event.target).parent().children("#author").text();

      function removeFromLS(bookTitle, bookAuthor) {
        var history = loadHistory();


        var newHistory = history.filter(
          (book) => book.author !== bookAuthor || book.title !== bookTitle
        );


        localStorage.setItem("history", JSON.stringify(newHistory));
      }
      removeFromLS(bookTitle, bookAuthor);
      handleModalDetails();
    });

    listItem.append(removeButton);
    modalContent.append(listItem);
  }

 
  // var modalBody = $("#bookDetailsModalBody"); // Find modal body element

  $("#bookDetailsModal").modal("show");
  
}

// Event listener for the modal show event
$("#readModal").on("click", handleModalDetails);

function nyArticlesFromQuery(results) {
  // clear the content of the modal so that every time it is clicked, it doesnt append the array again
  var modalContent = $("#newsModalBody");
  modalContent.empty();


  for (let i = 0; i < results.response.docs.length; i++) {

    var artcileAbstract = results.response.docs[i].abstract;
    var articleLink = results.response.docs[i].web_url;

    // var articleItem = $('<div class="article-list-item">').append(
    //   $("<h5>").attr("id", "articelTitle").text(artcileAbstract),
    //   $("<a>")
    //     .attr("href", articleLink)
    //     .attr("target", "_blank")
    //     .text("Read More")
    // );

    // if (results.response.docs[i].multimedia.length > 0) {
    //   var link = results.response.docs[i].multimedia[17].legacy.thumbnail
    //   var imageLink = `https://www.nytimes.com/${link}` // Change the index as needed
    //   // Prepend another image tag
    //   articleItem.prepend(
    //     $("<img>")
    //       .attr("src", imageLink)
    //       .addClass("img-fluid")
    //       .attr("alt", "Article Image")
    //   );
    // }

    // card version
    var articleItem = $('<div class="row">').append(
      $('<div class="mx-auto card mb-3 p-1" style="max-width: 50rem;">').append(
        $('<div class="row align-items-center">').append(
          // Check if multimedia is available
          results.response.docs[i].multimedia.length > 0
            ? $('<div class="col-md-4 mx-auto text-center">').append(
                // Create image tag if multimedia is available
                $("<img>")
                  .attr(
                    "src",
                    `https://www.nytimes.com/${results.response.docs[i].multimedia[17].legacy.thumbnail}`
                  )
                  .addClass("img-fluid rounded-start")
                  .attr("alt", "Article Image")
              )
            : null,
          $('<div class="col-md-8 mx-auto">').append(
            $('<div class="card-body">').append(
              $('<h5 class="card-title">').text(artcileAbstract),
              $("<a>")
                .attr("href", articleLink)
                .attr("target", "_blank")
                .text("Read More")
            )
          )
        )
      )
    );

    modalContent.append(articleItem);
  }
}

// end of callbacks

function currentCategoryDetails(category, offset) {
  getCurrentNamedListDetails(category, offset);
}

function currentCategories() {
  getNamesList();
}

function searchArticles(ev) {

  //getArticles(query);

  var cardElement = $(ev.currentTarget).closest(".card");

  // Extract information from the card
  var title = cardElement.find(".card-title").text();
  var author = cardElement.find("h6").text();
  author = author.replace(/ /g, "+")
  var query = title.replace(/ /g, "+");

  // console.log(query)
  getArticles(query, author);

}

$("#categoryOptions").on("hide.bs.dropdown", ({ clickEvent }) => {
  if (clickEvent?.target) {
    var categoryName = clickEvent.target.id;
    $("#categoryName").text(clickEvent.target.innerText)
    currentCategoryDetails(categoryName, 0);
    
  }

  // currentCategoryDetails(categoryName, 0);
});

// function searchResults(ev) {
//   ev.preventDefault();

// }

// $("#searchbtn").on("click", searchResults);

//getReviewByTitle('0553418025',encodeURIComponent('THE MARTIAN'), encodeURIComponent('Andy Weir'));

currentCategories();
currentCategoryDetails("hardcover-nonfiction", 0);

export { nyCurrentCategoryDetail, nyCurrentCategories, nyArticlesFromQuery };

//https://api.nytimes.com/svc/books/v3/reviews.json?isbn=0553418025&title=The+Martian&author=Andy+Weir&api-key=pifi4e25GCt32q2X47LeT8M19jNWKUgK
