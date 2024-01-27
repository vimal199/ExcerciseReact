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
    title
    published
    author
    id
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