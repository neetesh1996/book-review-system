# book-review-system
1. take pull from this repository
2. switch to main branch // use git checkout main 
3. do npm install // to install all required libraries
4. to run the project // npm run dev
5. Server ready at http://localhost:4000/

<!-- Submitted By:
Name: Neetesh Kumar
emailId: kumarneetesh96@gmail.com
phone number: 918476828634 -->
API endpoints
<!-- // i used postman for testing APIs -->
url: http://localhost:4000
 Query :- 
1. getBooks: Retrieve all books (public)
request: 
body(json): {
  "query": "{ getBooks(page: 1, limit: 2) { books { id title author publishedYear } count } }"
}

response:
{
    "data": {
        "getBooks": {
            "books": [
                {
                    "id": 1,
                    "title": "Test Book",
                    "author": "Test Author",
                    "publishedYear": 2022
                },
                {
                    "id": 2,
                    "title": "Test Book",
                    "author": "Test Author",
                    "publishedYear": 2022
                }
            ],
            "count": 5
        }
    }
}

2. getBook(id: ID!): Retrieve a specific book by ID (public)
request: 
body(json): {
    "query": "{ getBook(id: 1) { id title author publishedYear } }"
}
response:
{
    "data": {
        "getBook": {
            "id": 1,
            "title": "Test Book",
            "author": "Test Author",
            "publishedYear": 2022
        }
    }
}

3. getReviews(bookId: ID!): Retrieve all reviews for a specific book (public)
request: 
body(json):{
  "query": "{ getReviews(bookId: 1, page: 1, limit: 5) { reviews { id rating comment user { id username } createdAt } count } }"
}

response:
{
    "data": {
        "getReviews": {
            "reviews": [
                {
                    "id": 4,
                    "rating": 5,
                    "comment": "Great book!",
                    "user": {
                        "id": 1,
                        "username": "testuser"
                    },
                    "createdAt": "1719922295074"
                }
            ],
            "count": 1
        }
    }
}

4. getMyReviews: Retrieve all reviews by the authenticated user (authenticated)
request: 
Authorization: Bearer token
body(json):{
  "query": "{ getMyReviews { id rating comment book { id title } createdAt } }"
}
response:{
    "data": {
        "getMyReviews": [
            {
                "id": 3,
                "rating": 3,
                "comment": "this book is not that much good as i was especting!",
                "book": {
                    "id": 2,
                    "title": "Test Book"
                },
                "createdAt": "1719919366351"
            },
            {
                "id": 4,
                "rating": 5,
                "comment": "Great book!",
                "book": {
                    "id": 1,
                    "title": "Test Book"
                },
                "createdAt": "1719922295074"
            },
            {
                "id": 2,
                "rating": 4,
                "comment": "Updated comment",
                "book": {
                    "id": 2,
                    "title": "Test Book"
                },
                "createdAt": "1719918966296"
            }
        ]
    }
}

Mutations:-
1. register(username: String!, email: String!, password: String!): Register a new user

request:
body(json):{
    "query": "mutation { register(username: \"testing user\", email: \"kumarneetesh@gmail.com\", password: \"12345677\") { token user { id username email } } }"
}
response:{
    "data": {
        "register": {
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjUsImlhdCI6MTcxOTk3Mzg1NSwiZXhwIjoxNzIwMDYwMjU1fQ.mGsaqQ90Do1LjrmYpEVzVjmGlscuphWC1aJIqFPAf3w",
            "user": {
                "id": 5,
                "username": "testing user",
                "email": "kumarneetesh@gmail.com"
            }
        }
    }
}

2. login(email: String!, password: String!): Login and receive a JWT
request:
body(json):{
  "query": "mutation { login(email: \"test@example.com\", password: \"12345678\") { token user { id username email } } }"
}

response:{
    "data": {
        "login": {
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcxOTk3Mzc1NiwiZXhwIjoxNzIwMDYwMTU2fQ.dilx3sq3cAbBVedxW0Xjgpa7WQF9ag5vtIXTFumlK6g",
            "user": {
                "id": 1,
                "username": "testuser",
                "email": "test@example.com"
            }
        }
    }
}

3. addBook(title: String!, author: String!, publishedYear: Int!): Add a new book
(authenticated)

request: 
Authorization: Bearer token
body(json):{
  "query": "mutation { addBook(title: \"Book four\", author: \"Neetesh\", publishedYear: 2023) { id title author publishedYear } }"
}

response:
{
    "data": {
        "addBook": {
            "id": 5,
            "title": "Book four",
            "author": "Neetesh",
            "publishedYear": 2023
        }
    }
}

4. addReview(bookId: ID!, rating: Int!, comment: String!): Add a new review for a
book (authenticated)

request: 
Authorization: Bearer token
body(json):{
  "query": "mutation { addReview(bookId: 4, rating: 5, comment: \"Great book!\") { id userId bookId rating comment createdAt } }"
}

response:{
    "data": {
        "addReview": {
            "id": 5,
            "userId": 1,
            "bookId": 4,
            "rating": 5,
            "comment": "Great book!",
            "createdAt": "1719973875240"
        }
    }
}

5. updateReview(reviewId: ID!, rating: Int, comment: String): Update user's own
review (authenticated)

request: 
Authorization: Bearer token
body(json):{
  "query": "mutation { updateReview(id: 2, rating: 4, comment: \"Updated comment\") { id userId bookId rating comment createdAt } }"
}

response:{
    "data": {
        "updateReview": {
            "id": 2,
            "userId": 1,
            "bookId": 2,
            "rating": 4,
            "comment": "Updated comment",
            "createdAt": "1719918966296"
        }
    }
}

6. deleteReview(reviewId: ID!): Delete user's own review (authenticated)

request: 
Authorization: Bearer token
body(json):{
  "query": "mutation { updateReview(id: 3, rating: 4, comment: \"Updated comment\") { id userId bookId rating comment createdAt } }"
}

response:{
    "data": {
        "updateReview": {
            "id": 3,
            "userId": 1,
            "bookId": 2,
            "rating": 4,
            "comment": "Updated comment",
            "createdAt": "1719919366351"
        }
    }
}
