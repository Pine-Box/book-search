const APIKey = 'piWrvbCgFbcPfVDbQOrN2nA3AEuEQnZP'
const currentHardcoverListUrl =
  'https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=' +
  APIKey
const namesListUrl =
  'https://api.nytimes.com/svc/books/v3/lists/names.json?api-key=' + APIKey

// Function to create book cards
function createBookCards(books) {
  // Clear previous search results
  $('#book-results').empty()

  // Iterate through the list of books and create book cards
  books.forEach(function (book) {
    const bookImage = book.book_image
    const author = book.book_author
    const rank = book.rank
    const bestsellersDate = book.bestsellers_date || 'N/A'

    // Create a book card element
    const bookCard = $('<div>').addClass('card')
    const cardBody = $('<div>').addClass('card-body')
    const cardTitle = $('<h5>')
      .addClass('card-title')
      .text('Author: ' + author)
      .text('Rank: ' + rank)
    const cardSubtitle = $('<h6>')
      .addClass('card-subtitle mb-2 text-muted')
      .text('Bestsellers Date: ' + bestsellersDate)
    const cardImage = $('<img>')
      .addClass('card-img-top')
      .attr('src', bookImage)
      .attr('alt', 'Book Image')

    // Append elements to the card body
    cardBody.append(cardTitle, cardSubtitle, cardImage)
    bookCard.append(cardBody)

    // Append the book card to the results container
    $('#book-results').append(bookCard)
  })
}

// Fetch data from the New York Times Books API when the document is ready
$(document).ready(function () {
  $.ajax({
    url: currentHardcoverListUrl,
    method: 'GET',
    dataType: 'json',
  }).done(function (data) {
    const books = data.results.books
    createBookCards(books)
  })

  // Function to get the list of book names
  function getListOfNames() {
    let url = namesListUrl
    console.log(url)
    fetch(url)
      .then(function (response) {
        return response.json()
      })
      .then(function (data) {
        return apiCurrentData(data)
      })
  }
})

// Event handler for the search button
$('.btn-success').on('click', function () {
  const searchTerm = $('#search-box').val()
  const searchUrl = `https://api.nytimes.com/svc/books/v3/lists/best-sellers/history.json?title=${searchTerm}&api-key=${APIKey}`

  // Fetch data based on search term
  $.ajax({
    url: searchUrl,
    method: 'GET',
    dataType: 'json',
  }).done(function (data) {
    const books = data.results
    createBookCards(books)
  })
})
