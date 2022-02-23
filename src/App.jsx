import React, { useState } from 'react';
import './styles.css';

export const App = () => {
    // 配列「todos」の状態を管理（初期値：空の配列を設定）
    const [todos, setTodos] = useState([]);
    // 入力された値「todo」の状態を管理（初期値：空の入力値（文字列）を設定）
    const [todo, setTodo] = useState('');

    const handleInputChange = (e) => {
        // set関数「setTodo」で入力された値（value）を変数「todo」に設定する
        setTodo(e.target.value);
    };

    const handleFormSubmit = (e) => {
        // ブラウザのデフォルトの動作や、送信時にページを更新しないようにする
        e.preventDefault();

        // inputに文字が入力されたら発動（入力が空文字列の場合は発動しない）
        if (todo !== '') {
            // 関数「setTodos()」に配列「todos」を更新するための処理を設定
            setTodos([
                // 配列「todo」に格納された値を展開（現在の状態を展開）
                ...todos,
                {
                    id: todos.length + 1, // idを取得（mapのindexと扱い同じ？）
                    text: todo.trim() // 入力値を取得（空白も削除）
                }
            ]);
        }
        
        // 入力欄を消去する
        setTodo('');
    };

    return (
        <div className='App'>
            {/* onSubmitプロパティにhandleFormSubmit関数を渡す */}
            <form onSubmit={handleFormSubmit}>
                <input 
                    name='todo'
                    type='text'
                    placeholder='Create a new todo'
                    value={todo}
                    // handleInputChange関数（todoの値をsetTodoに渡す）
                    onChange={handleInputChange}
                />
            </form>

            {/* 追加されたTodoを保持するリスト */}
            <ul className='todo-list'>
                {/* set関数「setTodos()」で更新された配列「todos」をmap関数に渡して1つずつ展開 */}
                {todos.map((todo) => (
                    <li key={todo.id}>{todo.id}：{todo.text}</li>
                ))}
            </ul>
        </div>
    );
};