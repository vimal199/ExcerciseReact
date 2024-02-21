import { gql } from "@apollo/client";
export const ALL_AUTHORS = gql`
query{
  allAuthors{
    name,
    born,
    bookCount,
    id
  }
}
`
export const ALLBOOKS = gql`
query{
  allBooks{
    title,
    published,
    author{
      name
    },
    id,
    genres
  }
}
`
export const addBook = gql`
mutation createBook($title: String!,$author: String!, $published: Int, $genres: [String]! ){
  addBook(
    title: $title
    author: $author
    published: $published
    genres: $genres){
      id
  }
}
`
export const EDITAUTHOR = gql`
mutation changeAuthor($name: String!, $setBornTo: Int!){
    editAuthor(
    name: $name,
    setBornTo: $setBornTo){
        name
        id
        born
  }
}
`
export const LOGIN = gql`
mutation login($username: String!, $password: String!){
  login(username: $username, password: $password){
value
  }
}
`
export const USER = gql`
query{
  me{
    favouriteGenre
  }
}
`