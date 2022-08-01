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

/*
WANHA:
import React from 'react'
//import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { createNotification } from '../reducers/notificationReducer'

const Notification = (props) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(createNotification(message))
  }, [dispatch])
  const msg = dispatch(createNotification(props.message, props.error))
  console.log('msg olio on', msg)
  console.log('propsit', props)

  if (!props.message) {
    return ''
  } else if (props.error === true) {
    return (<div className="error">{msg.data.message}</div>)
  }
  return (<div className="message">{msg.data.message}</div>)
}

// 5.11
Notification.propTypes = {
  error: PropTypes.bool.isRequired
}

export default Notification

*/
