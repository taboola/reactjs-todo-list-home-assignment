import {TodoList} from "./todo-list/TodoList";
import './App.scss'
import {useState} from "react";

export default function App() {
    const [isDarkTheme, setDarkTheme] = useState(false)
    /* click on the `My List` Title to toggle dark theme (WIP) */
    return (
        <div className={`app ${isDarkTheme ? 'dark-theme': 'light-theme'}`}>
            <h1 className="list-title" onClick={()=> setDarkTheme(prev => !prev)}>My List</h1>
            <TodoList className="todo-list"/>
        </div>
    )
}
