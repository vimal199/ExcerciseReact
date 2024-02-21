
const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { v1: uuid } = require('uuid')
const Book = require('./Book')
const Author = require('./Author')
const User = require('./User')
const mongoose = require('mongoose')
const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')
mongoose.set('strictQuery', false)
require('dotenv').config()
const MONGODB_URI = process.env.MONGODB_URI
console.log('connecting to ', MONGODB_URI);
mongoose.connect(MONGODB_URI).then(
    () => {
        console.log('connected to MongoDB');
    }
).catch((error) => {
    console.log('error connection to MongoDB:', error.message)
}
)
const typeDefs = `
type Author{
    name: String!
    id: ID!
    born: Int
    bookCount: Int
}
type Book{
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
}
type User{
    username: String!
    favouriteGenre: String!
    id: ID!
}
type Token{
    value: String!
}
type Query {
    bookCount: Int
    authorCount: Int
    allBooks(author: String,genre: String): [Book]
    allAuthors: [Author]
    me: User
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
    createUser(
        username: String!,
        favouriteGenre: String!
    ): User
    login(
        username: String!,
        password: String!
    ):Token
}
`

const resolvers = {

    Query: {
        bookCount: async () => {
            const books = await Book.find({});
            return books.length;
        },
        authorCount: async () => {
            const authors = await Author.find({});
            return authors.length;
        },
        allBooks: async (root, args) => {

            console.log(args);
            if (!args.author && !args.genre) {
                console.log(args);
                let books = null;
                try {
                    books = await Book.find({}).populate("author");
                    console.log(books);
                } catch (error) {
                    console.log(error);
                    throw new GraphQLError('Getting allBooks failed', {
                        extensions: {
                            code: 'BAD_USER_INPUT',
                            invalidArgs: args,
                            error
                        }
                    })
                }
                return books
            } else if (args.author && !args.genre) {
                let allbooks = [];
                allbooks = await Book.find({}).populate("author")
                return allbooks.filter(
                    (book) => {
                        return book.author.name === args.author
                    }
                )
            } else if (args.genre && !args.author) {
                const books = await Book.find({});
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
                let allbooks = await Book.find({}).populate("author")
                let booksAuthor = allbooks.filter(
                    (book) => {
                        return book.author.name === args.author
                    }
                )
                /* let booksAuthor = books.filter(
                    (book) => {
                        return book.author === args.author
                    }
                ) */
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
        allAuthors: async (root, args, context) => await Author.find({}),
        me: (root, args, context) => context.loggedInUser
    },
    Author: {
        bookCount: async (root) => {
            const books = await Book.find({}).populate("author");

            //    console.log('books', books);

            const filtered_data = books.filter((book) => {
                return book.author.name === root.name;
            }
            )
            //   console.log('filtered_data', filtered_data);
            return filtered_data.length
        }
    },
    Mutation: {
        addBook: async (root, args, context) => {
            const currentUser = context.loggedInUser;
            if (!currentUser) {
                throw new GraphQLError('Logged in failed', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        invalidArgs: context,
                    }
                })
            }
            const FindAuthor = await Author.findOne({ name: args.author });
            console.log(FindAuthor);
            if (!FindAuthor) {
                console.log('fddfd');
                const newAuthor = {
                    name: args.author,
                    born: null
                }
                const author = new Author(newAuthor);
                try {
                    await author.save();
                } catch (error) {
                    throw new GraphQLError('Saving author failed', {
                        extensions: {
                            code: 'BAD_USER_INPUT',
                            invalidArgs: args.author,
                            error
                        }
                    })
                }
                console.log('x', author);
                if (author) {
                    const book = new Book({
                        ...args, author: author._id
                    });
                    try {
                        await book.save()
                    } catch (error) {
                        throw new GraphQLError('Saving book failed', {
                            extensions: {
                                code: 'BAD_USER_INPUT',
                                invalidArgs: args.author,
                                error
                            }
                        })
                    }
                    return book;
                }
            } else {
                console.log('FindAuthor._id', FindAuthor._id);

                const book = new Book({
                    ...args, author: FindAuthor._id
                });
                try {
                    await book.save();
                } catch (error) {
                    throw new GraphQLError('Saving book failed', {
                        extensions: {
                            code: 'BAD_USER_INPUT',
                            invalidArgs: args.author,
                            error
                        }
                    })
                }

                console.log('bookAdded', book);
                return book;
            }
        },
        editAuthor: async (root, args, context) => {
            console.log('hjhjhj', args);
            const currentUser = context.loggedInUser;
            if (!currentUser) {
                throw new GraphQLError('Logged in failed', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        invalidArgs: context,

                    }
                })
            }
            const AuthorToBeChanged = await Author.findOne({ name: args.name })
            console.log('AuthorToBeChanged', AuthorToBeChanged);
            if (AuthorToBeChanged) {
                /* const updatedAuthor = { ...AuthorToBeChanged, born: args.setBornTo }
                const author = new Author(updatedAuthor);
                console.log('author', author); */
                AuthorToBeChanged.born = args.setBornTo
                try {
                    await AuthorToBeChanged.save();
                } catch (error) {
                    throw new GraphQLError('Editing author failed', {
                        extensions: {
                            code: 'BAD_USER_INPUT',
                            invalidArgs: args.name,
                            error
                        }
                    })
                }

                return AuthorToBeChanged
            } else {
                return null;
            }
        },
        createUser: async (root, args) => {
            const newuser = { ...args };
            const user = new User(newuser);
            try {
                await user.save();
            } catch (error) {
                throw new GraphQLError('Creating user failed', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        invalidArgs: args,
                        error
                    }
                })
            }
            return user;
        },
        login: async (root, args) => {
            const user_details = { ...args };
            const userExists = await User.findOne({ username: user_details.username })
            if (!userExists || user_details.password !== 'secret') {
                throw new GraphQLError('User authentication failed', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        invalidArgs: args,
                    }
                })
            } else {
                const userForToken = {
                    username: userExists.username,
                    id: userExists._id,
                }
                return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
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
    context: async ({ req, res }) => {
        const auth = req ? req.headers.authorization : null
        if (auth && auth.startsWith('Bearer ')) {
            const decodedToken = jwt.verify(auth.substring(7), process.env.JWT_SECRET)
            const loggedInUser = await User.findById(decodedToken.id)
            console.log('Logged in User ', loggedInUser);
            return {
                loggedInUser
            }
        }
    }
}).then(({ url }) => {
    console.log(`Server ready at ${url}`)
})