import React from 'react'

const Notification = ({ message, error }) => {
  if (message === null) {
    return null
  }
  else if (error === true) {
    return (
      <div className="error">
        {message}
      </div>
    )
  }
  return (
    <div className="message">
      {message}
    </div>
  )
}

export default Notification