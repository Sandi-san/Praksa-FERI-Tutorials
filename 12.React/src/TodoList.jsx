import { TodoItem } from "./TodoItem"

//uporabi tudi destructured sintakso dodeljevanja prop-ov
export function TodoList({ todos, toggleTodo, deleteTodo }) {
    return (
        <ul className="list">
            {/* renderiraj posebni tekst, ko nimamo todo elementov (short circuit metoda sintakse) */}
            {todos.length === 0 && "No Todos"}
            {/* react map - pojdi skozi vsak currentTodos in ustvari HTML elemente */}
            {todos.map(todo => {
                // POZOR: za vsak element treba dodat unikaten id (ze ima todo objekt)
                return (
                    <TodoItem
                        //podaj vse prope od todo naenkrat
                        {...todo}
                        key={todo.id}
                        // id={todo.id}
                        // title={todo.title}
                        // completed={todo.completed}
                        toggleTodo={toggleTodo}
                        deleteTodo={deleteTodo}
                    />
                )
            })}
        </ul>
    )
}