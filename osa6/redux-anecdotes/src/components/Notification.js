import { useSelector } from 'react-redux'
// import { createNotification } from '../reducers/notificationReducer'
// Your initial state is an array, then you replace it with a string and then with an empty string. Try with initial state null, string for notification and null again to remove the notification

const Notification = () => {
  // const dispatch = useDispatch()
  const notification = useSelector(
    (state) => 
      {return state.notification}
      //dispatch(createNotification(['Redux Toolkit is awesome!']))
      //return 'createNotification([\'Redux Toolkit is awesome!\'])'
    )
  //createNotification(['Redux Toolkit is awesome!'])
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  if (!notification) {
    return (
      ''
    )
  }
  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification