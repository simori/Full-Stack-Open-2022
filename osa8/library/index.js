const { ApolloServer, gql } = require('apollo-server')

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
    born: null,
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  { 
    name: 'Sandi Metz', // birthyear not known
    born: null,
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

const typeDefs = gql`
  type Mutation {
    
    addBook(
      title: String!
      author: String
      published: Int!
      genres: [String!]!
    ): Book

    editAuthor(
      name: String
      setBornTo: Int
    ): Author
  }

  type Book {
    title: String!
    published: Int!
    author: String!
    genres: [String!]!
  }

  type Author {
    name: String!
    born: Int
    bookCount: Int
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }
`

const resolvers = {
  Mutation: {
    addBook: (root, args) => {
      if (books.find(b => b.title === args.title)) {
        throw new UserInputError('Book Title must be unique', {
          invalidArgs: args.name,
        })
      }

      const book = { ...args }
      books = books.concat(book)

      // jos kirjoittajaa ei ole ennestään tiedoissa:
      if (!authors.find(a => a.name === args.author)) {
        console.log('Ei löytynyt sennimistä authoria, lisätään tietoihin:!')
        const newAuthor = {
          name: args.author,
          born: null,
          bookCount: 1
        }
        console.log('newAuthori on:', newAuthor)
        authors.push(newAuthor)
        console.log(authors)
      }
      return book
    },
    editAuthor: (root, args) => {
      // jos authoria ei löydy, palauta null
      const author = authors.find(a => a.name === args.name)
      if (!author) {
        return null
      }
      const updatedAuthor = { ...author, born: args.setBornTo }
      authors = authors.map(a => a.name === args.name ? updatedAuthor : a)
      return updatedAuthor
    }
  },
  Query: {
    // tehtävä 8.1
    bookCount: () => books.length,
    authorCount: () => authors.length,
    // tehtävä 8.2 & 8.4
    allBooks: (root, args) => {
      if (args.author && args.genre) { // jos nimi ja genre molemmat annettu, filtteröi
        console.log(args.author, args.genre)
        const filtered = books.filter(
          b => {
            // filtteröidään genret
            const asd = b.genres.filter(
              g => g === args.genre
            )
            console.log('genret:',asd, 'author', b.author)
            // jos kirjan genreistä löytyy argumenttina annettu genre, palauta kirja
            if (asd.length > 0 && b.author === args.author) {
              return b
            }
          }
        )
        return filtered
      }
      else if (!args.genre && !args.author) {
        console.log('default')
        return books
      }
      else if (!args.author) { // nimeä ei annettu mutta genre on annettu
        console.log('nimeä ei annettu mutta genre on annettu')
        const filtered = books.filter(
          b => {
            // filtteröidään genret
            const asd = b.genres.filter(
              g => g === args.genre
            )
            console.log(asd)
            // jos kirjan genreistä löytyy argumenttina annettu genre, palauta kirja
            if (asd.length > 0) {
              return b
            }
          }
        )
        return filtered
      }
      else if (!args.genre) {
        console.log('nimi annettu mutta genre ei')
        return books.filter(b => b.author === args.author)
      }
      
    },
    // tehtävä 8.3
    allAuthors: () => authors
  },
  // tehtävä 8.3 resolveri bookCountille
  Author: {
    bookCount: (root) => {
      const filtered = books.filter(b => b.author === root.name)
      return filtered.length
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}!`)
})