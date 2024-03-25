export function TodoItem({id, title, completed, toggleTodo, deleteTodo}) {
    return (<li>
        <label>
            <input type="checkbox" checked={completed}
            onChange={e => toggleTodo(id, e.target.checked)}
            />
            {title}
        </label>
        {/* e = eventListener - sprozi LE ko kliknemo nanj (onClick) */}
        <button
            onClick={e => deleteTodo(id)}
            className="btn btn-danger">Delete</button>
    </li>
    )
}