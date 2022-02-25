import React from "react";

// propsにtodo、onEditClick、onDeleteClickを渡す
export const TodoItem = ({todo, onEditClick, onDeleteClick}) => {
    return (
        <li key={todo.id}>
            {/* todoオブジェクトのtextの値を表示 */}
            {todo.id}：{todo.text}
            {/* 現在のTODO項目を全て引数に渡す */}
            {/* 関数名変更 handleEditClick → onEditClick */}
            <button onClick={()=> onEditClick(todo)}>Edit</button>
            {/* クリックしたtodoの「id」を引数に渡す */}
            {/* 関数名変更 handleDeleteClick → onDeleteClick */}
            <button onClick={() => onDeleteClick(todo.id)}>X</button>
        </li>
        // Each child in a list should have a unique "key" prop.
        // map関数を使用する際にユニークなkey propを設定する
    );
};