const Notification = ({ message }) => {
    if (message === null) {
        return null
    }

    return (
        <div className={message.typeMessage}>
            {message.info}
        </div>
    )
}

export default Notification