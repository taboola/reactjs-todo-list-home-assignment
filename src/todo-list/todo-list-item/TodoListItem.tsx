import React from 'react'

import './TodoListItem.scss'

export function TodoListItem({todo, onClick}) {
    const {title, completed} = todo
    return (
        <li className="todo-list-item" onClick={onClick} data-completed={completed? completed : null} aria-label={title}>{title}</li>
    )
}
