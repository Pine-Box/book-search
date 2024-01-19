const APIKey = 'piWrvbCgFbcPfVDbQOrN2nA3AEuEQnZP'
// 'AIzaSyDIp2p8Bm4fYaAke4wWcpjfKHXikK1nlbw'
// var queryURL = 'https://www.googleapis.com/books/v1/volumes?q=genre&key='
//www.googleapis.com/books/v1/volumes?q=jaws&key= + api_key

var queryURL =
  'https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=piWrvbCgFbcPfVDbQOrN2nA3AEuEQnZP'
fetch(queryURL)
  .then(function (response) {
    console.log(queryURL)

    return response.json()
  })
  .then(function (data) {
    books.forEach((book) => {
      const books = data.results.books
      const bookImage = book.book_image
      const rank = book.rank
      const bestsellersDate = data.results.bestsellers_date

      console.log(data)
      console.log(data.num_results)
      console.log('Book Image:', bookImage)
      console.log('Rank:', rank)
      console.log('Bestsellers Date:', bestsellersDate)
    })
  })
