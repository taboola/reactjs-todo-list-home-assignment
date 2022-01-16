import './TodoListItem.scss'

export function TodoListItem({todo, onClick}) {
    const {title, completed} = todo
    return (
        <li className="todo-list-item" onClick={onClick} data-completed={completed === true ? '': null}> {title}</li>
    )
}
