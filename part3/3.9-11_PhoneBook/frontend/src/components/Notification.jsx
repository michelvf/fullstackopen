const Notification = ({ message, classCSS }) => {
  if (message === '') {
    return null
  }

  return (
    <div className={classCSS}>
      {message}
    </div>
  )
}

export default Notification
