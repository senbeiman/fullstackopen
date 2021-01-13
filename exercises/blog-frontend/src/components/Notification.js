import React from 'react'
import { useSelector } from 'react-redux'
import { Alert } from '@material-ui/lab'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  if (notification.message === '') {
    return null
  }

  return (
    <div>
      <Alert severity={notification.isError ? 'error' : 'success'}>
        {notification.message}
      </Alert>
    </div>
  )
}

export default Notification
