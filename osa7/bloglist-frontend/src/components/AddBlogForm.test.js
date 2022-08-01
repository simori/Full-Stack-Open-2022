import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import AddBlogForm from './AddBlogForm'
import userEvent from '@testing-library/user-event'

/*
5.16
Tee uuden blogin luomisesta huolehtivalle lomakkelle testi, joka varmistaa,
että lomake kutsuu propseina saamaansa takaisinkutsufunktiota oikeilla
tiedoilla siinä vaiheessa kun blogi luodaan.
*/
test('5.16 make sure that form calls callback function with real info?', async () => {
  const user = userEvent.setup()
  const mockerFunc = jest.fn()

  render(<AddBlogForm createBlog={mockerFunc} />)

  const titlePh = screen.getByPlaceholderText('BlogTitle!')

  const authorPh = screen.getByPlaceholderText('BlogAuthor!')
  const urlPh = screen.getByPlaceholderText('BlogUrl!')

  const sendButton = screen.getByText('create new blog!')

  // mockerFunc.mockReturnValueOnce('TestBlog')
  await user.type(titlePh, 'TestBlog')
  await user.type(authorPh, 'TestAuthor')
  await user.type(urlPh, 'http://www.testurl.fi')
  //screen.debug(titlePh)
  await user.click(sendButton)
  //console.log('mockeria kutsuttud lopussa', mockerFunc.mock.calls)
  expect(mockerFunc.mock.calls).toHaveLength(1)
  console.log(mockerFunc.mock.calls[0][0])
  expect(mockerFunc.mock.calls[0][0].title).toBe('TestBlog')
  expect(mockerFunc.mock.calls[0][0].author).toBe('TestAuthor')
  expect(mockerFunc.mock.calls[0][0].url).toBe('http://www.testurl.fi')
})
