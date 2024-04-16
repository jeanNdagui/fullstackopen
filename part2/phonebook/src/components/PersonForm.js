const PersonForm = ({onSendForm, pName, pNumber, onChangeName, onChangeNumber}) => {

    return (
        <form onSubmit={onSendForm}>
            <div>name: <input value={pName} onChange={onChangeName} /></div>
            <div>number: <input value={pNumber} onChange={onChangeNumber} /></div>
            <div><button type="submit">add</button></div>
        </form>
    )
}

export default PersonForm