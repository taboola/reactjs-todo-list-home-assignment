import {useEffect, useState} from "react";
import {deleteTodo, getTodos, updateTodo} from "../api";
import {TodoListItem} from "./todo-list-item/TodoListItem";
import './TodoList.scss'
import CircularProgress from '@mui/material/CircularProgress';
import {useTodos} from "./useTodos";

/*
* completed
* id
* title
* userId
* */

export function TodoList() {
    const [
        {todosList, isLoading},
        {setTodosList}] =
        useTodos()


    const deleteTodoById = (id) => {
        setTodosList(prevState => {
            return prevState.slice().filter(item => item.id !== id)
        })

        deleteTodo(id)
            .catch(e => {
                console.log(e)
                setTodosList(todosList)
            })
    }

    function updateCompleted(id, completed) {
        setTodosList(prevState => {
            return prevState.slice().map(todo => todo.id === id ? {...todo, completed} : todo)
        })

        updateTodo({todoId: id, update: {completed}})
            .then((updatedTodo) => {
                setTodosList(prevState => {
                    return prevState.slice().map(todo => {
                        return todo.id === id ? {...updatedTodo} : todo
                    })
                })
            })
            .catch(e => {
                console.log(e)
                setTodosList(todosList)
            })
    }

    const handleClick = (event, {id, completed}) => {
        event.stopPropagation()
        const isCtrlClicked = event.ctrlKey || event.metaKey
        // ctrlClicked? deleteTodo : updateTodo
        isCtrlClicked ?
            deleteTodoById(id) :
            updateCompleted(id, !completed);
    }

    return (
        <>
            {isLoading ?
                <div className="progress" aria-label="loading"><CircularProgress/> Loading...</div> :
                <div className="todo-list-container">
                    <ul className="todo-list">
                        {todosList.map(({title, id, userId, completed}) => {
                            return <TodoListItem key={id}
                                                 todo={{title, id, userId, completed}}
                                                 onClick={(event) => handleClick(event, {title, id, userId, completed})}
                            >{title}</TodoListItem>
                        })}
                    </ul>
                </div>
            }
        </>
    )
}