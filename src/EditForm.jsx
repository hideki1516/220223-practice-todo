import React from "react";

export const EditForm = ({
        currentTodo, 
        setIsEditing, 
        onEditInputChange, // handleEditInputChange
        onEditFormSubmit // handleEditFormSubmit
    }) => {
        
    return (
        <form onSubmit={onEditFormSubmit}>
            <h2>Edit Todo</h2>
            <label htmlFor='editTodo'>Edit todo: </label>
            {/* Editボタンを押したTODO項目=currentTodoオブジェクトの「text」をvalue（入力欄の値）に設定 */}
            <input 
                name='editTodo'
                type='text'
                placeholder='Edit todo'
                value={currentTodo.text}
                onChange={onEditInputChange}
            />
            {/* handleEditFormSubmit関数を使用してフォームを送信 */}
            <button type='submit' onClick={onEditFormSubmit}>Update</button>
            {/* isEditingの状態をfalseに戻して編集モードをキャンセルにする */}
            <button onClick={() => setIsEditing(false)}>Cancel</button>
        </form>
    );
};