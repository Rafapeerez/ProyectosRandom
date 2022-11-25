import React, { Fragment, useRef, useState, useEffect} from "react";
import { TodoList } from "./TodoList";
//import {v4 as uuidv4} from 

const KEY = "todoApp.todos"

export function App() {
    const [todos, setTodos] = useState([
        { id: 1, task: "Tarea 1", completed: false}
    ]);
    
    const todoTaskRef = useRef();

    const uuid = () => {
        return Math.random() + 1;
    };

    //Para traernos los que esten ya en el localStorage de otra vez
    useEffect(() => {
        const storedTodos = JSON.parse(localStorage.getItem(KEY));
        if(storedTodos){
            setTodos(storedTodos);
        }
    }, []);

    //Para que cada vez que se recarge no se vayan las tareas añadidas
    useEffect(() => {
        localStorage.setItem(KEY, JSON.stringify(todos));
    }, [todos]);

    const toggleTodo = (id) => {
        const newTodos = [...todos];
        const todo = newTodos.find((todo) => todo.id ===id);
        todo.completed = !todo.completed;
        setTodos(newTodos);
    };

    const handleTodoAdd = () => {
        const task = todoTaskRef.current.value;
        if(task === ''){return;}

        setTodos((prevTodos) => {
            return [...prevTodos, {id: uuid(), task, completed: false}];
        });

        todoTaskRef.current.value = null;
    };

    const handleClearAll = () => {
        const newTodos = todos.filter((todo) => !todo.completed);
        setTodos(newTodos);
    }
    
    return (
    <Fragment>
        <TodoList todos={todos} toggleTodo={toggleTodo} />
        <input ref={todoTaskRef} type="text" placeholder="Nueva Tarea" />
        <button onClick={handleTodoAdd}>➕</button>
        <button onClick={handleClearAll}>🗑️</button>
        <div>
            Te quedan {todos.filter((todo) => !todo.completed).length} tareas 
            por realizar, ponte las pilas
        </div>
    </Fragment>
    );
}
