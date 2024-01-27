const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { v1: uuid } = require('uuid')
let authors = [
    {
        name: 'Robert Martin',
        id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
        born: 1952,
    },
    {
        name: 'Martin Fowler',
        id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
        born: 1963
    },
    {
        name: 'Fyodor Dostoevsky',
        id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
        born: 1821
    },
    {
        name: 'Joshua Kerievsky', // birthyear not known
        id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
    },
    {
        name: 'Sandi Metz', // birthyear not known
        id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
    },
]

/*
 * Suomi:
 * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
 * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
 *
 * English:
 * It might make more sense to associate a book with its author by storing the author's id in the context of the book instead of the author's name
 * However, for simplicity, we will store the author's name in connection with the book
 *
 * Spanish:
 * Podría tener más sentido asociar un libro con su autor almacenando la id del autor en el contexto del libro en lugar del nombre del autor
 * Sin embargo, por simplicidad, almacenaremos el nombre del autor en conección con el libro
*/

let books = [
    {
        title: 'Clean Code',
        published: 2008,
        author: 'Robert Martin',
        id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
        genres: ['refactoring']
    },
    {
        title: 'Agile software development',
        published: 2002,
        author: 'Robert Martin',
        id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
        genres: ['agile', 'patterns', 'design']
    },
    {
        title: 'Refactoring, edition 2',
        published: 2018,
        author: 'Martin Fowler',
        id: "afa5de00-344d-11e9-a414-719c6709cf3e",
        genres: ['refactoring']
    },
    {
        title: 'Refactoring to patterns',
        published: 2008,
        author: 'Joshua Kerievsky',
        id: "afa5de01-344d-11e9-a414-719c6709cf3e",
        genres: ['refactoring', 'patterns']
    },
    {
        title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
        published: 2012,
        author: 'Sandi Metz',
        id: "afa5de02-344d-11e9-a414-719c6709cf3e",
        genres: ['refactoring', 'design']
    },
    {
        title: 'Crime and punishment',
        published: 1866,
        author: 'Fyodor Dostoevsky',
        id: "afa5de03-344d-11e9-a414-719c6709cf3e",
        genres: ['classic', 'crime']
    },
    {
        title: 'The Demon ',
        published: 1872,
        author: 'Fyodor Dostoevsky',
        id: "afa5de04-344d-11e9-a414-719c6709cf3e",
        genres: ['classic', 'revolution']
    },
]

const typeDefs = `
type Author{
    name: String!
    id: ID!
    born: Int
    bookCount: Int
}
type Book{
    title: String
    published: Int
    author: String!
    id: ID!
    genres: [String]
}
type Query {
    bookCount: Int
    authorCount: Int
    allBooks(author: String,genre: String): [Book]
    allAuthors: [Author]
}
type Mutation{
    addBook(
        title: String,
        published: Int,
        author: String,
        genres: [String]
    ): Book
    editAuthor(
        name: String!,
        setBornTo: Int!
    ): Author
}
`

const resolvers = {

    Query: {
        bookCount: () => books.length,
        authorCount: () => authors.length,
        allBooks: (root, args) => {
            // console.log(args);
            if (!args.author && !args.genre) {
                console.log(args);
                return books
            } else if (args.author && !args.genre) {
                return books.filter(
                    (book) => {
                        return book.author === args.author
                    }
                )
            } else if (args.genre && !args.author) {
                console.log("genre");
                return books.filter((book) => {
                    let bookGenre = book.genres.find(
                        (genre) => {
                            return genre == args.genre
                        }
                    )
                    if (bookGenre) {
                        return true
                    } else {
                        return false
                    }
                })
            } else if (args.genre && args.author) {
                let booksAuthor = books.filter(
                    (book) => {
                        return book.author === args.author
                    }
                )
                if (booksAuthor) {
                    console.log(booksAuthor);
                    return booksAuthor.filter((book) => {
                        let bookGenre = book.genres.find(
                            (genre) => {
                                return genre == args.genre
                            }
                        )
                        if (bookGenre) {
                            return true
                        } else {
                            return false
                        }
                    })
                }
            }
        },
        allAuthors: () => authors
    },
    Author: {
        bookCount: (root) => {
            return books.filter(book => book.author === root.name).length
        }
    },
    Mutation: {
        addBook: (root, args) => {
            const FindAuthor = authors.find((author) => author.name === args.author)
            console.log(FindAuthor);
            if (!FindAuthor) {
                const newAuthor = {
                    name: args.author,
                    born: null,
                    id: uuid()
                }
                authors = authors.concat(newAuthor)
                console.log(authors);
                const BookToBeAdded = { ...args, id: uuid() }
                books = books.concat(BookToBeAdded)
                return BookToBeAdded
            } else {
                const BookToBeAdded = { ...args, id: uuid() }
                books = books.concat(BookToBeAdded)
                return BookToBeAdded
            }
        },
        editAuthor: (root, args) => {
            console.log('hjhjhj', args);
            const AuthorToBeChanged = authors.find((author) => author.name === args.name)
            if (AuthorToBeChanged) {
                const updatedAuthor = { ...AuthorToBeChanged, born: args.setBornTo }
                authors = authors.map((author) => author.id != AuthorToBeChanged.id ? author : updatedAuthor)
                return updatedAuthor
            } else {
                return null;
            }
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
})

startStandaloneServer(server, {
    listen: { port: 4001 },
}).then(({ url }) => {
    console.log(`Server ready at ${url}`)
})