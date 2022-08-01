const Blog = require('../models/blog')

const dummy = (blogs) => {
  // dummytesti, pitää palauttaa 1
  return 1
}

// id: '62a6f908f5758a40f6d67c5a'
const initialBlogs = [
  {
    title: 'Babbyn eka blogi ikinä!',
    author: 'Miro Sihimäki',
    url: 'http://127.0.0.1/babbynekablogi',
    likes: 9001
  },
  {
    title: 'Limoncelloni Mun',
    author: 'Simo Riihimäki',
    url: 'http://127.9000.1337.-42/karhunimunbloki',
    likes: 0
  },
  {
    title: 'Testiblokki',
    author: 'Tommi Testaaja',
    url: 'http://987-654-321-0',
    likes: 0
  },
  {
    title: 'TNeljäs Kerta Toden Sanoi',
    author: 'Jaakko Jokula',
    url: 'http://sieni.us',
    likes: 420
  }
]

const blogsInDatabase = async () => {
  const blogs = await Blog.find({})
  return blogs.map((b) => b.toJSON())
}

/*
tehtävä 4.4
  Lasketaan kaikkien blogien tykkäykset yhteen. Jos blogilista on tyhjä,
  tykkäysten määrä (ja palautettava arvo) on nolla.
  Kerätään ekaksi map-funktiolla blogeista niiden tykkäykset ja sitten
  lasketaan ne yhteen reducella.
*/
const totalLikes = (blogs) => {
  return blogs.length === 0
    ? 0 // jos blogilista on tyhjä palauta nolla
    : blogs.map((blog) => blog.likes).reduce((sum, likes) => sum + likes)
}

/*
tehtävä 4.5
  Funktio selvittää blogin jolla on eniten tykkäyksiä. Jos löytyy monta
  suosikkia, palauttaa niistä yhden.
*/
const favoriteBlog = (blogs) => {
  // console.log(Math.max(...blogs.map(blog => blog.likes)))
  const favorite = blogs.find(
    (blog) => blog.likes === Math.max(...blogs.map((blog) => blog.likes))
  )
  // turhat kentät pois paluuarvosta
  delete favorite.url
  delete favorite._id
  delete favorite.__v
  // console.log('lempiblogi on', favorite)
  return favorite
}

/*
tehtävä 4.6
https://lodash.com/ katso tämä
  Funktio selvittää kirjoittajan, jolla on eniten blogeja.
  Funktion paluuarvo kertoo myös ennätysbloggaajan blogien määrän:
*/
const mostBlogs = (blogs) => {
  const authors = blogs.map((blog) => blog.author)
  let name
  let blogsCounter = 0
  let mostCounter = 0

  for (let i = 0; i < authors.length; i++) {
    for (let j = i; j < authors.length; j++) {
      if (authors[i] === authors[j]) {
        mostCounter++
      }
      if (blogsCounter < mostCounter) {
        blogsCounter = mostCounter
        name = authors[i]
      }
    }
    mostCounter = 0
  }

  const mostAuthor = { author: name, blogs: blogsCounter }
  return mostAuthor
}

/*
tehtävä 4.7
  Funktio selvittää kirjoittajan, jonka blogeilla on eniten tykkäyksiä.
  Funktion paluuarvo kertoo myös suosikkibloggaajan likejen yhteenlasketun määrän
*/
const mostLikes = (blogs) => {
  let mostLikesCounter = 0
  let likeCounter = 0
  let name

  const authorsAndLikes = blogs.map((blog) => {
    return { author: blog.author, likes: blog.likes }
  })
  const uniqueAuthors = [...new Set(blogs.map((b) => b.author))]

  // authorsAndLikes.forEach(i => {
  uniqueAuthors.forEach((j) => {
    // console.log(i.author, i.likes)
    /* if (i.author === j) {
        likeCounter += i.likes
        console.log('likecounter', likeCounter);
      }authorsAndLikes.map(e => {return {author: j, likes: j.likes}}) */
    // console.log(authorsAndLikes, j)
    const mapi = authorsAndLikes.filter((e) => e.author === j)

    // console.log(mapi)
    likeCounter = totalLikes(mapi)
    // console.log(likeCounter);
    if (likeCounter >= mostLikesCounter) {
      mostLikesCounter = likeCounter
      name = j
    }
    likeCounter = 0
  })

  const mostAuthor = { author: name, likes: mostLikesCounter }
  return mostAuthor
}
module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
  blogsInDatabase,
  initialBlogs
}
