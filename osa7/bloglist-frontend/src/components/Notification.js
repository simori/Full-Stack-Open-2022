import React from 'react'
//import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const Notification = (props) => {
  //console.log('propsit', props)

  if (!props.message) {
    return ''
  } else if (props.message.includes('failed')) {
    return <div className="alert alert-danger" role="alert">{props.message}</div>
  }
  return <div className="alert alert-success" role="alert">{props.message}</div>
}

// 5.11
/* Notification.propTypes = {
  error: PropTypes.bool.isRequired
} */

const mapStateToProps = (state) => {
  return {
    message: state.message
  }
}

const ConnectedNotification = connect(mapStateToProps)(Notification)
export default ConnectedNotification