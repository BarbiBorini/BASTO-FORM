const Notification = ({notification}) => {
    return ( 
      <div className='notification'>
        {notification.msg}
      </div>
    )
}
  
export default Notification;