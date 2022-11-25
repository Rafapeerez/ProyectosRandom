import React, { Fragment, useRef, useState } from "react";
import { TodoList } from "./TodoList";

export function App() {
    const [todos, setTodos] = useState([{ id: 1, task: "Tarea 1", completed: false}])
    
    const todoTaskRef = useRef();

    const handleTodoAdd = () => {

    }
    
    return (
    <Fragment>
        <TodoList todos = {todos} />
        <input ref={todoTaskRef} type= "text" placeholder="Nueva Tarea" />
        <button onClick={handleTodoAdd}>➕</button>
        <button>🗑️</button>
    </Fragment>
    );
}