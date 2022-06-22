import React from 'react'
import PropTypes from 'prop-types'

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

// 5.11
Notification.propTypes = {
  error: PropTypes.bool.isRequired
}

export default Notification