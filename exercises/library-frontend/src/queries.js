import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
      id
    }
  }
`
export const ME = gql`
  query {
    me {
      username
      favoriteGenre
    }
  }
`
export const ALL_BOOKS = gql`
  query fetchBooks($genre: String) {
    allBooks(
      genre: $genre
    ) {
      title
      published
      author {
        name
      }
      id
      genres
    }
  }
`
export const ADD_BOOK = gql`
  mutation createBook($title: String!, $published: Int!, $author: String!, $genres: [String!]!) {
    addBook(
      title: $title,
      published: $published,
      author: $author,
      genres: $genres
    ) {
      title
      published
      author {
        name
      }
      id
    }
  }   
`
export const EDIT_AUTHOR = gql`
  mutation editAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(
        name: $name,
        setBornTo: $setBornTo
    ) {
        name
        born
        id
    }
  }
`
export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`
export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      title
      author {
        name
      }
    }
  }
`