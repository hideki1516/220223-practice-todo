import React from "react";

export const AddTodoForm = ({todo, onAddFormSubmit, onAddInputChange}) => {
    return (
        <form onSubmit={onAddFormSubmit}>
            <h2>Add Todo</h2>
            <label htmlFor='todo'>Add todo: </label>
            <input 
                name='todo'
                type='text'
                placeholder='Create a new todo'
                value={todo}
                onChange={onAddInputChange}
            />
            <button type='submit'>Add</button>
        </form>
    );
};