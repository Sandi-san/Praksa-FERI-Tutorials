import { useState } from "react"

export function NewTodoForm(props) {
    // immutable spreminjanje: uporabi funkcijo setNewItem da spremenis spremenljivko newItem
    //setNewItem je vrednost v input boxu (glej spodaj)
    const [newItem, setNewItem] = useState("")

    function handleSubmit(e) {
        //prevent refreash
        e.preventDefault()
        if (newItem === "") return

        //kar smo poslali v NewTodoForm v App.jsx (isto kot addTodo)
        props.onSubmit(newItem)
        // addTodo(newItem)

        setNewItem("")
    }

    return <form onSubmit={handleSubmit} className="new-item-form">
        <div className="form-row">
            {/* povezi label in input za vsak item (htmlFor je for v jsx-u) */}
            <label htmlFor="item">New Item</label>
            <input
                // e=event (tj. trenutni element (podobno this))
                onChange={e => setNewItem(e.target.value)}
                value={newItem}
                type="text"
                id="item" />
        </div>
        <button className="btn">Add</button>
    </form>
}