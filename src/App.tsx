import React from 'react'
import {TodoList} from "./todo-list/TodoList";
import './App.scss'
import {Themes, toggleTheme, useTheme} from "./hooks/useTheme";
import {QueryClient, QueryClientProvider,} from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

const queryClient = new QueryClient()

export default function App() {
    const [theme, setTheme] = useTheme(Themes.LightTheme)

    const handleSetTheme = () => {
        setTheme(prev => toggleTheme(prev))
    }
    /* click on the `My List` Title to toggle dark theme (WIP) */
    return (
        <QueryClientProvider client={queryClient}>
            <div className={`app ${theme}`}>
                <h1 className="list-title" onClick={handleSetTheme}>My List</h1>
                <TodoList/>
            </div>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    )
}
