import React, {useState, useEffect} from 'react';
import axios from 'axios';

const todo = props => {

    // const [todoName, setTodoName] = useState('');
    // const [todoList, setTodoList] = useState([]);
    const [todoState, setTodoState] = useState({userInput: '', todoList: []});

    useEffect(() => {
        axios
            .get('https://hooks-test-724af.firebaseio.com/todos.json')
            .then(result => {
                console.log(result);
                const todoData = result.data;
                const todos = [];
                for (const key in todoData) {
                    // if (todoData.hasOwnProperty(key)) {
                        todos.push({id: key, name: todoData[key].name})
                    // }
                }
                setTodoState({...todoState, todoList: todos});
            });
    }, []);

    const inputChangeHandler = event => {
        setTodoState({
            ...todoState,
            userInput: event.target.value,

        });
    };

    const todoAddHandler = () => {
        axios.post('https://hooks-test-724af.firebaseio.com/todos.json', {name: todoState.userInput})
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            });
        setTodoState({
            userInput: "",
            todoList: todoState.todoList.concat(todoState.userInput)
        });
    };

    return <React.Fragment>
        <input
            type={"text"}
            placeholder={"Todo"}
            onChange={inputChangeHandler}
            value={todoState.userInput}
        />
        <button type={"button"} onClick={todoAddHandler}>Add</button>
        <ul>
            {todoState.todoList.map(todo => <li key={todo + Math.random() * 10}>{todo}</li>)}
        </ul>
    </React.Fragment>
};

export default todo;