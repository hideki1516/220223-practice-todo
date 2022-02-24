import React, { useEffect, useState } from 'react';
import './styles.css';

export const App = () => {
    // 配列「todos」の状態を管理（初期値に関数を設定）
    const [todos, setTodos] = useState(() => {
        // localStorageに保存された「todos」を取得して変数「savedTodos」に格納
        const savedTodos = localStorage.getItem('todos');
        // 変数「savedTodos」がtrueのとき（値が渡ってきたとき）
        if (savedTodos) {
            // JSON.parse()で変数「savedTodos」の文字列をオブジェクトに変換
            return JSON.parse(savedTodos);
        } else {
            // falseのとき（値が渡ってこなかったとき）は空配列を渡す
            return [];
        }
    });

    // 入力された値「todo」の状態を管理（初期値：空の入力値（文字列）を設定）
    const [todo, setTodo] = useState('');

    // Add TodoとEdit Todoの切り替えを管理（条件付きレンダリング）
    // isEditingにtrueが渡ったらEditTodoモード
    // isEditingにfalseが渡ったらAddTodoモード（初期値）
    const [isEditing, setIsEditing] = useState(false);

    // 編集しているTodo項目を管理するためオブジェクトの状態を設定
    const [currentTodo, setCurrentTodo] = useState({});

    // 配列「todos」の値が変わったときに実行する処理
    useEffect(() => {
        // todosの値を文字列に変換してlocalStorageに格納
        // Key[更新したい値], Value[keyに渡したい値]
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    const handleInputChange = (e) => {
        // set関数「setTodo」を使用して、入力された値（value）を変数「todo」に設定する
        setTodo(e.target.value);
    };

    // 編集入力の値を取得して新しい状態を設定する関数
    const handleEditInputChange = (e) => {
        // set関数「setCurrentTodo」を使用して、
        // 編集するTODO項目と編集されたtextを「currentTodo」に設定する
        setCurrentTodo({...currentTodo, text: e.target.value});
    };

    // 入力の値を取得して、新しい状態を設定する関数
    const handleFormSubmit = (e) => {
        // ブラウザのデフォルトの動作や、送信時にページを更新しないようにする
        e.preventDefault();

        // inputに文字が入力されたら発動（入力が空文字列の場合は発動しない）
        if (todo !== '') {
            // 関数「setTodos()」に配列「todos」を更新するための処理を設定
            setTodos([
                // 配列「todo」に格納された値をコピー（現在の状態をstateにコピー）
                ...todos,
                {
                    id: todos.length + 1, // idを取得（mapのindexと扱い同じ？）
                    text: todo.trim() // 入力値を取得（localStorageに文字列で格納するために空白を削除）
                }
            ]);
        }
        // 入力欄を消去する
        setTodo('');
    };

    // handleEditFormSubmit関数：ボタン「Update」が押された時に処理する関数
    const handleEditFormSubmit = (e) => {
        e.preventDefault();
        // currentTodo.id : 編集したTODO項目のid
        // currentTodo : 編集したTODO項目のオブジェクト（{id, text})
        handleUpdateTodo(currentTodo.id, currentTodo);
    };

    // ToDo項目を ToDo配列から削除する関数
    // handleDeleteClick関数の引数(id)にはクリックされたtodo.idが渡っている
    const handleDeleteClick = (id) => {
        // 配列「todos」をもとにfilter関数を使用（引数(todo)には配列「todos」が渡っている）
        const removeItem = todos.filter((todo) => {
            // 削除する項目と一致しない、残りのTODOを抽出して変数「removeItem」に渡す
            return todo.id !== id;
        });
        
        // setTodos()にremoveItemを渡してtodosを更新
        setTodos(removeItem);
    };

    // handleUpdateTodo関数：TODO項目を編集する関数
    // ... ボタン「Update」が押されて、handleEditFormSubmit関数が起動したあとに発火
    // handleUpdateTodo関数の引数には「id = currentTodo.id」「updatedTodo = currentTodo」が渡っている
    const handleUpdateTodo = (id, updatedTodo) => {
        // todos : 現在のTODOリスト（配列）
        // updateItem : 編集されたTODO項目を含んだTODOリスト（新しい配列）
        // todo.idが関数に渡したidと一致するかをチェック
        // true（idが一致した場合）
            // ボタン「Edit」を押したTODO項目のidが編集したTODO項目のidと一致した場合...
            // updatedTodo（編集したTODO項目のtodoオブジェクト）を渡す
        // false
            // 編集操作前のtodoオブジェクトを渡す
        const updatedItem = todos.map((todo) => {
            return todo.id === id ? updatedTodo : todo;
        });

        // isEditingにfalseを渡してEditTodoモードを終了する
        setIsEditing(false);
        // 編集されたTODO項目を含めた新しい配列をset関数「setTodos」に渡す
        setTodos(updatedItem);
    };

    // AddTodoの状態で「Editボタン」が押されたときに処理する関数（？）
    const handleEditClick = (todo) => {
        // set関数「setIsEditing()」の初期値「false」をtrueにする
        setIsEditing(true);
        // Editボタンが押されたTODO項目（{id, text})をset関数「setCurrentTodo」に渡す（？）
        setCurrentTodo({ ...todo });
    };

    return (
        <div className='App'>
            {isEditing ? (
                <form onSubmit={handleEditFormSubmit}>
                    <h2>Edit Todo</h2>
                    <label htmlFor='editTodo'>Edit todo: </label>
                    {/* Editボタンを押したTODO項目=currentTodoオブジェクトの「text」をvalue（入力欄の値）に設定 */}
                    
                    <input 
                        name='todo'
                        type='text'
                        placeholder='Edit todo'
                        value={currentTodo.text}
                        onChange={handleEditInputChange}
                    />
                    {/* handleEditFormSubmit関数を使用してフォームを送信 */}
                    <button type='submit'>Update</button>
                    {/* isEditingの状態をfalseに戻して編集モードをキャンセルにする */}
                    <button onClick={() => setIsEditing(false)}>Cancel</button>
                </form>
            ) : (
                <form onSubmit={handleFormSubmit}>
                    <h2>Add Todo</h2>
                    <label htmlFor='todo'>Add todo: </label>
                    <input 
                        name='todo'
                        type='text'
                        placeholder='Create a new todo'
                        value={todo}
                        // handleInputChange関数（todoの値をsetTodoに渡す）
                        onChange={handleInputChange}
                    />
                    <button type='submit'>Add</button>
                </form>
            )}

            {/* 追加されたTodoを保持するリスト */}
            <ul className='todo-list'>
                {/* set関数「setTodos()」で更新された配列「todos」をmap関数に渡して1つずつ展開 */}
                {todos.map((todo) => (
                    <li key={todo.id}>
                        {/* todoオブジェクトのtextの値を表示 */}
                        {todo.id}：{todo.text}
                        {/* 現在のTODO項目を全て引数に渡す */}
                        <button onClick={()=> handleEditClick(todo)}>Edit</button>
                        {/* クリックしたtodoの「id」を引数に渡す */}
                        <button onClick={() => handleDeleteClick(todo.id)}>X</button>
                    </li>
                    // Each child in a list should have a unique "key" prop.
                    // map関数を使用する際にユニークなkey propを設定する
                ))}
            </ul>
        </div>
    );
};