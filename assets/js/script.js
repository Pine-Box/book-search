import {
  getNamesList,
  getCurrentNamedListDetails,
  getArticles,
} from '/assets/js/api.js'

//api call backs
function nyCurrentCategories(results) {
  console.log(results)
  // for (let i=0;i < results.length; i++){
  //
  // }
}

const readingList = 'history'
export function loadHistory() {
  let history = JSON.parse(localStorage.getItem(readingList))
  if (history == null) history = []
  return history

const readingList = "history";
function loadHistory() {
  let history = JSON.parse(localStorage.getItem(readingList));
  if (history == null) history = [];
  return history;
}
//store city search to local storage
export function storeHistory(title) {
  let history = loadHistory()
  history.push({ title: title })
  localStorage.setItem(readingList, JSON.stringify(history))
}
// export function storeHistory(title) {
//   let history = loadHistory();
//   history.push({ title: title });
//   localStorage.setItem(readingList, JSON.stringify(history));
// }

function nyCurrentCategoryDetail(results) {
  console.log(results)
  for (let i = 0; i < results.results.books.length; i++) {
    var nyCurrentResults = results.results.books[i]

    var newCard = $(`
      <div class="row">
      <div class="card mb-3" style="max-width: 540px;">
        <div class="row g-0">
          <div class="col-md-4">
            <img src=${nyCurrentResults.book_image} class="img-fluid rounded-start" alt="...">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">${nyCurrentResults.title}</h5>
              <h6>${nyCurrentResults.author}</h6>
              <p class="card-text">${nyCurrentResults.description}</p>
              <a href="#" class="btn btn-success readList-btn data-bs-toggle="modal"
              data-bs-target="#bookDetailsModal"
              data-title="${nyCurrentResults.title}"
              data-author="${nyCurrentResults.author}"
              data-description="${nyCurrentResults.description}">Save to Read Later</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    `)

    $("#book-results").append(newCard);
  }
  $('.readList-btn').on('click', addToReadingList)
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
  console.log(readingList);
  // Add the new book to the reading list
  readingList.push(bookInfo);
  console.log(readingList);
  // Store the updated reading list in local storage
  localStorage.setItem(readingKey, JSON.stringify(readingList));
}

// Function to handle modal details when it is shown
function handleModalDetails(event) {
  var history = loadHistory();

  // var button = $(event.relatedTarget); // Button that triggered the modal
  for (let i = 0; i < history.length; i++) {
    // Dynamically fill in the details
    var title = history[i].title; // Extract data from the button
    var author = history[i].author;
    var listItems = $(`
    <h5>${title}</h5>
    <h6>${author}</h6>
  `);
    $(".modal-body").append(listItems);
  }

  console.log(history);
  // var modalBody = $("#bookDetailsModalBody"); // Find modal body element

  $("#bookDetailsModal").modal("show");
  console.log("modal");
}

// Event listener for the modal show event
$("#readModal").on("click", handleModalDetails);

function nyArticlesFromQuery(results) {
  console.log(results)
  // for (let i=0;i < results.books.length; i++){
  //
  // }
}

// end of callbacks

function currentCategoryDetails(category, offset) {
  getCurrentNamedListDetails(category, offset)
}

function currentCategories() {
  getNamesList()
}

function searchArticles(query) {
  getArticles(query)
}

function searchResults(ev) {
  ev.preventDefault()
  console.log('search click')
}

$(document).ready(function () {
  $('#searchbtn').on('click', searchResults)

  currentCategories()
  currentCategoryDetails('hardcover-nonfiction', 0)
  searchArticles('Fourth Wing')
})

// $("#searchbtn").on("click", searchResults);

// //getReviewByTitle('0553418025',encodeURIComponent('THE MARTIAN'), encodeURIComponent('Andy Weir'));

// currentCategories();
// currentCategoryDetails("hardcover-nonfiction", 0);
// searchArticles("Fourth Wing");

export { nyCurrentCategoryDetail, nyCurrentCategories, nyArticlesFromQuery }

//https://api.nytimes.com/svc/books/v3/reviews.json?isbn=0553418025&title=The+Martian&author=Andy+Weir&api-key=pifi4e25GCt32q2X47LeT8M19jNWKUgK
