import React from 'react'
import {TodoListItem} from "./todo-list-item/TodoListItem";
import {useTodos} from "./hooks/useTodos";
import './TodoList.scss'
import {Spinner} from "../spinner/spinner";


export function TodoList() {
    const [{todoList, isLoading}, updateTodoMutation, deleteTodoMutation] = useTodos()

    const deleteTodoById = (todoId) => deleteTodoMutation.mutate({todoId})

    const toggleCompleted = (todoId: number, completed: boolean) => updateTodoMutation.mutate({todoId, update: {completed}});

    const handleClick = (event, {id, completed}) => {
        const isCtrlClicked = event.ctrlKey || event.metaKey

        isCtrlClicked ?
            deleteTodoById(id) :
            toggleCompleted(id, !completed);
    }

    return (
        <>
            {isLoading ?
                <Spinner className="progress" label="loading" text="Loading..."/>:
                <div className="todo-list-container">
                    <ul className="todo-list">
                        {todoList.map(({title, id, userId, completed}) => {
                            return <TodoListItem key={id}
                                                 todo={{title, id, userId, completed}}
                                                 onClick={(event) => handleClick(event, {id, completed})}
                            />
                        })}
                    </ul>
                </div>
            }
        </>
    )
}