import { useEffect, useState } from "react"
import { NewTodoForm } from "./NewTodoForm"
import { TodoList } from "./TodoList"
import "./styles.css"

export default function App() {
  //useState - default vrednost, ko se stran renderira (POZOR: vedno bo vrednost taksna (tj. nespremenljiva), ce ne uporabimo npr. onChange)
  // const [todos, setTodos] = useState([])
  //dobi podatke o todos iz local storage
  const [todos, setTodos] = useState(() => {
    const localValue = localStorage.getItem("ITEMS")
    if(localValue == null) return []
    return JSON.parse(localValue)
  })

  //useEffect HOOK - shranjevanje v local storage
  //, [todos] = zazeni funkcijo, ko se elementi v arrayu spremenijo
  //POZOR: hooki morajo biti na vrhu App (main) funkcije + ne smejo biti vgnezdene (npr. v if stavku) 
  useEffect(() => {
    localStorage.setItem("ITEMS",JSON.stringify(todos))
  }, [todos])

  //da lahko uporabimo setTodo funkcijo v ostalih komponentih (npr. NewTodoForm.jsx)
  function addTodo(title) {
    //vnesi data v funkcijo (currentTodos array)
    setTodos((currentTodos) => {
        //POZOR: sintakso [...currentTodos] uporabimo, ker so useState elementi immutable (tj. ne moremo uporabiti =)
        //dodaj na konec currentTodos arraya: id, title, completed
        return [...currentTodos,
        { id: crypto.randomUUID(), title, completed: false },
        ]
    })
  }

  //za spreminjanje checkbox-ov
  function toggleTodo(id, completed) {
    //glede na id v currentTodos, spremeni completed spremenljivko
    setTodos(currentTodos => {
      //pojdi cez vsak currentTodos (map==foreach), in preglej ce je id tisti ki ga iscemo
      //todo => za trenutni item (todo) preveri njegov id
      return currentTodos.map(todo => {
        if (todo.id === id) {
          //vrni nov todo objekt, ki ima spremenjen completed spremenlivko
          return { ...todo, completed }
        }
        return todo
      })
    })
  }

  //isto kot toggleTodo ampak za delete
  function deleteTodo(id) {
    setTodos(currentTodos => {
      //dobi vse todo razen tistega ki deletiramo
      return currentTodos.filter(todo => todo.id !== id)
    })
  }

  // react lahko vrnat le eno komponento, zato vrni component wrapper (<>)
  return (
    <>
      {/* UPORABA REACT KOMPONENTE */}
      {/* props: nastavi funkcijo addTodo v komponenti */}
      <NewTodoForm onSubmit={addTodo} />
      <h1 className="header">Todo List</h1>
      {/* podaj todo-je in njihove change/delete funkcije */}
      <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo}/>
    </>
  )
}