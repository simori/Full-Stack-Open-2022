// import { useSelector } from 'react-redux'
import { connect } from 'react-redux'
// import { createNotification } from '../reducers/notificationReducer'
// Your initial state is an array, then you replace it with a string and then with an empty string. Try with initial state null, string for notification and null again to remove the notification

const Notification = (props) => {
  // const dispatch = useDispatch()
  /*   const notification = 
    () => 
      { return props.notification } */
  //dispatch(createNotification(['Redux Toolkit is awesome!']))
  //return 'createNotification([\'Redux Toolkit is awesome!\'])'

  //createNotification(['Redux Toolkit is awesome!'])
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  if (!props.notification) {
    return ''
  }
  return <div style={style}>{props.notification}</div>
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

const ConnectedNotification = connect(mapStateToProps)(Notification)
export default ConnectedNotification
