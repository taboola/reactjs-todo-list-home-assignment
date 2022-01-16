import {useEffect, useState} from "react";
import {getTodos} from "../api";

export function useTodos() {
    const [todosList, setTodosList] = useState([])
    const [isLoading, setIsLoading] = useState(true) // isLoading customHook

    useEffect(() => {
        getTodos().then((list) => {
            setTodosList(list)
            setTimeout(()=> setIsLoading(false), 2000)
        })
    }, [])

    return [{todosList,isLoading}, {setTodosList, setIsLoading}]
}