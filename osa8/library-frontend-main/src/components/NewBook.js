import { useState } from 'react'
import { useMutation } from '@apollo/client'

import { ALL_AUTHORS, GET_BOOKS, CREATE_BOOK, GET_GENRES } from '../queries'
import Books from './Books'

const NewBook = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState(0)
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])
  
  // tehtävä 8.10
  const [ createBook ] = useMutation(CREATE_BOOK, {
    //refetchQueries: [ { query: GET_BOOKS, variables: { genre: null } }, { query: ALL_AUTHORS }, { query: GET_GENRES } ],
    update: (cache, response) => {
      console.log('CREATE_BOOK',response.data)
      cache.updateQuery({ query: GET_BOOKS }, ({ allBooks }) => {
        allBooks.concat(response.data.addBook)
        console.log('allBooks:', allBooks)
        return {
          allBooks
        }
      })
      cache.updateQuery({ query: ALL_AUTHORS }, ({ allAuthors }) => {
        console.log('allAuthors:', allAuthors)
        return {
          allAuthors: allAuthors.concat(response.data.addBook.author)
        }
      })
      /* cache.updateQuery({ query: GET_GENRES }, ({ allGenres }) => {
        console.log('newbook js allGenres:', allGenres)
        return {
          allGenres: allGenres.concat(response.data.addBook.genres)
        }
      }) */
    }, 
    onError: (error) => {
      console.log(error)
      alert(error)
    }
  }) 

  if (!props.show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()

    console.log('add book...')
    createBook({  variables: { title, author, published, genres } })

    setTitle('')
    setPublished(0)
    setAuthor('')
    setGenres([])
    setGenre('')

    return (
      <>
        <Books show={'books'}/>
      </>
    )
  }

  const addGenre = () => {
    if (genre.length > 0) {
      setGenres(genres.concat(genre))
      setGenre('')
    }
    else {
      alert('Cannot add empty genre!')
    }
    
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(Number(target.value))}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  )
}

export default NewBook
