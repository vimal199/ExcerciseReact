import { useContext } from 'react'
import AnecdoteContext from '../AnecdoteContext'
const Notification = (/* { notif } */) => {
  const [notif, notifDispatch] = useContext(AnecdoteContext)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }

  if (notif == '') return null

  return (
    <div style={style}>
      {notif}
    </div>
  )
}

export default Notification
