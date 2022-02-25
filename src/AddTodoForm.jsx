import React from "react";

export const AddTodoForm = ({todo, onAddFormSubmit, onAddInputChange}) => {
    return (
        // 関数名変更 handleAddFormSubmit → onAddFormSubmit
        <form onSubmit={onAddFormSubmit}>
            <h2>Add Todo</h2>
            <label htmlFor='todo'>Add todo: </label>
            <input 
                name='todo'
                type='text'
                placeholder='Create a new todo'
                value={todo}
                // handleInputChange関数（todoの値をsetTodoに渡す）
                // 関数名変更 handleAddInputChange →　onAddInputChange
                onChange={onAddInputChange}
            />
            <button type='submit'>Add</button>
        </form>
    );
};