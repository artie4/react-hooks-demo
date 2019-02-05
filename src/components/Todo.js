import React, {useState, useEffect, useReducer, useRef} from 'react';
import axios from 'axios';

const todo = props => {

    const [todoName, setTodoName] = useState('');
    const [submittedTodo, setSubmittedTodo] = useState(null);
    // const [todoList, setTodoList] = useState([]);
    // const [todoState, setTodoState] = useState({userInput: '', todoList: []});
    const todoInputRef = useRef(null);

    const todoListReducer = (state, action) => {
        switch(action.type) {
            case 'ADD': return state.concat(action.payload);
            case 'SET': return action.payload;
            case 'REMOVE': return state.filter((todo) => todo.id !== action.payload.id);
            default: return state;
        }
    };

    const [todoList, dispatch] = useReducer(todoListReducer, [] );

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
                dispatch({type: 'SET', payload: todos});
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
    }, []);


    useEffect(() => {
        if (submittedTodo) {
            dispatch({type: 'ADD', payload: submittedTodo});
        }
    }, [submittedTodo]);

    const inputChangeHandler = event => {
        setTodoName(event.target.value)
    };

    const todoAddHandler = () => {
        axios.post('https://hooks-test-724af.firebaseio.com/todos.json', {name: todoName})
            .then(res => {
                const todoItem = {id: res.data.name, name: todoName};
                setSubmittedTodo(todoItem);
            })
            .catch(err => {
                console.log(err);
            });
    };

    const todoRemoveHandler = todoId => {
        axios.delete(`https://hooks-test-724af.firebaseio.com/${todoId}/todos.json`)
            .then(res => {
                dispatch({type: 'REMOVE', payload: {id: todoId}});
            })
            .catch(error => console.log(error));
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
            {todoList.map(todo => <li key={todo.id} onClick={todoRemoveHandler.bind(this, todo.id)}>{todo.name}</li>)}
        </ul>
    </React.Fragment>
};

export default todo;