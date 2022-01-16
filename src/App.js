import {TodoList} from "./todo-list/TodoList";
import './App.scss'


export default function App() {

    return (
        <div className="app">
            <h1 className="list-title">My List</h1>
            <TodoList className="todo-list"/>
        </div>
    )
}
