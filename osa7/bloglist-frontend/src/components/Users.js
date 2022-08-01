import userServ from '../services/users'
import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

import { Table } from 'react-bootstrap'

const User = ({ id, name, blogCount }) => {
  return (
    <tr>
      <td>
        <Link to={`/users/${id}`}>{name}</Link>
      </td>
      <td>{blogCount}</td>
    </tr>
  )
}

// 7.15
export const SingleUser = ({ userlist, blogs }) => {
  const id = useParams().id

  const findUser = userlist.find((u) => u.id === id)
  console.log('SINGLEUSER id', findUser)
  if (!findUser) {
    return <div>No such user id exists! Failed!</div>
  }

  const userBlogs = blogs.filter((b) => b.user.username === findUser.username)

  return (
    <div>
      <h2>{findUser.name}</h2>
      <h3>Added blogs</h3>
      <ul>
        {userBlogs.map((b) => (
          <li key={b.id}>{b.title}</li>
        ))}
      </ul>
    </div>
  )
}

const Users = () => {
  const [users, setUsers] = useState([])
  useEffect(() => {
    const getUsers = async () => {
      const users = await userServ.getAll()
      setUsers(users)
    }

    getUsers().catch(console.error)

  }, [])

  console.log('USERS: ', users)
  const mappedUsers = users.map((u) => (
    <User key={u.id} id={u.id} name={u.name} blogCount={u.blogs.length} />
  ))

  return (
    <div>
      <h2>Users</h2>
      <Table striped>
        <tbody>
          <tr>
            <td>
              <b>name</b>
            </td>
            <td>
              <b># of blogs created</b>
            </td>
          </tr>
          {mappedUsers}
        </tbody>
      </Table>
    </div>
  )
}

export default Users

/*
{userList.map((user) => (
  <User key={user.id} name={user.name} blogCount={user.blogs.length} />
))}
*/
