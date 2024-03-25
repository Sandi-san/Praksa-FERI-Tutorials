// VERZIJA FILE-A KJER SO VSE KOMPONENTE V ENEM FILE-U, PONAVADI SO REACT KOMPONENTE V POSAMEZNIH FILE-IH

import { useState } from "react"
import "./styles.css"

export default function App() {
  // immutable spreminjanje: uporabi funkcijo setNewItem da spremenis spremenljivko newItem
  //setNewItem je vrednost v input boxu (glej spodaj)
  const [newItem, setNewItem] = useState("")
  //useState - default vrednost, ko se stran renderira (POZOR: vedno bo vrednost taksna (tj. nespremenljiva), ce ne uporabimo npr. onChange)
  const [todos, setTodos] = useState([])

  function handleSubmit(e) {
    //prevent refreash
    e.preventDefault()

    //vnesi data v funkcijo (currentTodos array)
    setTodos((currentTodos) => {
      //POZOR: sintakso [...currentTodos] uporabimo, ker so useState elementi immutable (tj. ne moremo uporabiti =)
      //dodaj na konec currentTodos arraya: id, title, completed
      return [...currentTodos,
      { id: crypto.randomUUID(), title: newItem, completed: false },
      ]
    })

    setNewItem("")
  }

  //za spreminjanje checkbox-ov
  function toggleTodo(id, completed) {
    //glede na id v currentTodos, spremeni completed spremenljivko
    setTodos(currentTodos => {
      //pojdi cez vsak currentTodos (map==foreach), in preglej ce je id tisti ki ga iscemo
      //todo => za trenutni item (todo) preveri njegov id
      return currentTodos.map(todo => {
        if(todo.id === id) {
          //vrni nov todo objekt, ki ima spremenjen completed spremenlivko
          return {...todo, completed}
        }
        return todo
      })
    })
  }

  //isto kot toggleTodo ampak za delete
  function deleteTodo(id){
    setTodos( currentTodos => {
      //dobi vse todo razen tistega ki deletiramo
      return currentTodos.filter(todo => todo.id !== id)
    })
  }

  // react lahko vrnat le eno komponento, zato vrni component wrapper (<>)
  return (
    <>
      <form onSubmit={handleSubmit} className="new-item-form">
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
      <h1 className="header">Todo List</h1>
      <ul className="list">
        {/* renderiraj posebni tekst, ko nimamo todo elementov (short circuit metoda sintakse) */}
        {todos.length === 0 && "No Todos"}
        {/* react map - pojdi skozi vsak currentTodos in ustvari HTML elemente */}
        {todos.map(todo => {
          // POZOR: za vsak element treba dodat unikaten id (ze ima todo objekt)
          return <li key={todo.id}>
            <label>
              <input type="checkbox" checked={todo.completed}
                onChange={e => toggleTodo(todo.id, e.target.checked)} />
              {todo.title}
            </label>
            {/* e = eventListener - sprozi LE ko kliknemo nanj (onClick) */}
            <button onClick={e => deleteTodo(todo.id)} className="btn btn-danger">Delete</button>
          </li>
        })}
      </ul>
    </>
  )
}