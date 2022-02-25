import React from "react";

export const TodoItem = ({todo, onEditClick, onDeleteClick}) => {
    return (
        <li key={todo.id}>
            {todo.id}：{todo.text}
            <button onClick={()=> onEditClick(todo)}>Edit</button>
            <button onClick={() => onDeleteClick(todo.id)}>X</button>
        </li>
    );
};