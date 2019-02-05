import React, {useState, useEffect} from 'react';
import axios from 'axios';

const todo = props => {

    const [todoName, setTodoName] = useState('');
    const [todoList, setTodoList] = useState([]);
    // const [todoState, setTodoState] = useState({userInput: '', todoList: []});

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
                setTodoList(todos);
            });
        return () => { console.log('Clean up') };
    }, []);

    const mouseMoveHandler = event => {
        console.log(event.clientX, event.clientY)
    };

    useEffect(() => {
        document.addEventListener('mousemove', mouseMoveHandler);
        return () => {
            document.removeEventListener('mousemove', mouseMoveHandler);
        }
    }, [todoName]);

    const inputChangeHandler = event => {
        setTodoName(event.target.value)
    };

    const todoAddHandler = () => {
        axios.post('https://hooks-test-724af.firebaseio.com/todos.json', {name: todoName})
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            });
        setTodoList(
            todoList.concat(todoName)
        );
    };

    return <React.Fragment>
        <input
            type={"text"}
            placeholder={"Todo"}
            onChange={inputChangeHandler}
            value={todoName}
        />
        <button type={"button"} onClick={todoAddHandler}>Add</button>
        <ul>
            {todoList.map(todo => <li key={todo + Math.random() * 10}>{todo.name}</li>)}
        </ul>
    </React.Fragment>
};

export default todo;