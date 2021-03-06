import React, {useState, useEffect, useReducer, useRef, useMemo} from 'react';
import axios from 'axios';
import List from './List';
import { useFormInput } from '../hooks/forms';

const todo = props => {

    const [inputIsValid, setInputIsValid] = useState(false);
    // const [todoName, setTodoName] = useState('');
    // const [submittedTodo, setSubmittedTodo] = useState(null);
    // const [todoList, setTodoList] = useState([]);
    // const [todoState, setTodoState] = useState({userInput: '', todoList: []});

    const todoInputRef = useRef();
    const todoInput = useFormInput();

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
                    // console.log(`key:${key} name:${todoData[key].name}`)
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

    const inputValidationHandler = event => {
        if(event.target.value.trim() === '') {
            setInputIsValid(false);
        } else {
            setInputIsValid(true);
        }
    };


    // useEffect(() => {
    //     document.addEventListener('mousemove', mouseMoveHandler);
    //     return () => {
    //         document.removeEventListener('mousemove', mouseMoveHandler);
    //     }
    // }, []);


    // useEffect(() => {
    //     if (submittedTodo) {
    //         dispatch({type: 'ADD', payload: submittedTodo});
    //     }
    // }, [submittedTodo]);
    //
    // const inputChangeHandler = event => {
    //     setTodoName(event.target.value)
    // };

    const todoAddHandler = () => {

        const todoName = todoInput.value;

        axios.post('https://hooks-test-724af.firebaseio.com/todos.json', {name: todoName})
            .then(res => {
                const todoItem = {id: res.data.name, name: todoName};
                // setSubmittedTodo(todoItem);
                dispatch({type: 'ADD', payload: todoItem});
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
            onChange={todoInput.onChange}
            value={todoInput.value}
            style={{backgroundColod: todoInput.validity === true ? 'transparent' : 'red'}}
        />
        <button type={"button"} onClick={todoAddHandler}>Add</button>
        {useMemo(() => <List items={todoList} onClick={todoRemoveHandler}/>,
            [todoList])}
    </React.Fragment>
};

export default todo;