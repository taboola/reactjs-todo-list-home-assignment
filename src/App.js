import {TodoList} from "./todo-list/TodoList";
import './App.scss'
import {toggleTheme, useTheme} from "./hooks/useTheme";

export default function App() {
    const [theme, setTheme] = useTheme('light-theme')

    /* click on the `My List` Title to toggle dark theme (WIP) */
    return (
        <div className={`app ${theme}`}>
            <h1 className="list-title" onClick={()=> setTheme(prev => toggleTheme(prev))}>My List</h1>
            <TodoList className="todo-list"/>
        </div>
    )
}
