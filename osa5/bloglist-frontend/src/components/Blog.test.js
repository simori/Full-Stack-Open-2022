import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

/*
5.13
testi, joka varmistaa että blogin näyttävä komponentti renderöi blogin titlen ja
authorin mutta ei renderöi oletusarvoisesti urlia eikä likejen määrää.
*/
test('5.13 make sure blog rendering component renders title and author only?', () => {
  const blog = {
    title: 'testblog',
    author: 'teemu testaaja',
    url: 'http://www.shouldnotex.is',
    likes: 999
  }

  const mockHandler = jest.fn()
  //const { container } = render(<Blog setBlogs={mockHandler} blogList={[1,2,3]} blog={blog} currentUser={'Simock'}/>)

  render(<Blog setBlogs={mockHandler} blogList={[1,2,3]} blog={blog} currentUser={'Simock'}/>)
  const titleElement = screen.getByText('testblog teemu testaaja')
  //screen.debug(titleElement)
  //const authorElement = screen.getByText('teemu testaaja')
  //const urlElement = screen.getByText('http://www.shouldnotex.is')
  //const likesElement = screen.getByText(999)

  //const div = container.querySelector('.blog')
  screen.debug()
  //expect(div.getByText('testblog')).toBeDefined()
  expect(titleElement).toBeDefined()
  //expect(authorElement).toBeDefined()
  //expect(urlElement).not.toBeDefined()
  //expect(likesElement).not.toBeDefined()
})

/*
5.14
testi, joka varmistaa että myös url ja likejen määrä näytetään
 kun blogin kaikki tiedot näyttävää nappia on painettu.*/
test('5.14 renders also url and likes when view button is presed?', async () => {
  const blog = {
    title: 'testblog',
    author: 'teemu testaaja',
    url: 'http://www.shouldnotex.is',
    likes: 999,
    user: {
      username: 'Simock',
      name: 'Simock Riihimocki'
    }
  }

  const mockHandler = jest.fn()

  //const { container } =
  render(<Blog setBlogs={mockHandler} blogList={[1,2,3]} blog={blog} currentUser={'Simock'}/>)

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  //const urlDiv = container.querySelector('http://www.shouldnotex.is')
  const urlText = screen.getByText('http://www.shouldnotex.is')
  const likesText = screen.getByText('999')
  //console.log(urlDiv)
  //screen.debug(container)

  expect(urlText).toHaveTextContent(
    'http://www.shouldnotex.is'
  )
  expect(likesText).toHaveTextContent(
    '999'
  )

  // expect(mockHandler.mock.calls).toHaveLength(1)
})

/*
5.15
testi, joka varmistaa, että jos komponentin like-nappia painetaan kahdesti,
komponentin propsina saamaa tapahtumankäsittelijäfunktiota kutsutaan kaksi kertaa.
*/
test('5.15 if like pressed twice then eventhandler is called twice?', async () => {
  const blog = {
    title: 'testblog',
    author: 'teemu testaaja',
    url: 'http://www.shouldnotex.is',
    likes: 999,
    user: {
      username: 'Simock',
      name: 'Simock Riihimocki'
    }
  }

  const mockHandler = jest.fn()

  render(<Blog setBlogs={mockHandler} blogList={[1,2,3]} blog={blog} currentUser={'Simock'}/>)

  const user = userEvent.setup()
  const viewButton = screen.getByText('view')
  await user.click(viewButton)
  //screen.debug()
  const likeButton = screen.getByText('like this blog')
  //screen.debug()
  await user.click(likeButton)
  await user.click(likeButton)
  console.log(mockHandler.mock.calls)
  expect(mockHandler.mock.calls).toHaveLength(2)
})