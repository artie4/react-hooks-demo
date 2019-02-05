import React, {useState} from 'react';

import Todo from './components/Todo';
import Header from './components/Header';
import Authen from './components/Authen';
import AuthContext from './auth-context';

const app = props => {

    const [page, setPage] = useState('authen');
    const [authStatus, setAuthStatus] = useState(false);

    const switchPage = (pageName) => {
        setPage(pageName);
    };

    const login = () => {
        setAuthStatus(true);
    };


    return (
        <div className="App">
            <AuthContext.Provider value={{status: authStatus, login: login}}>
                <Header
                    onLoadTodos={switchPage.bind(this, 'todos')}
                    onLoadAuthen={switchPage.bind(this, 'authen')}
                />
                <hr/>
                {page === 'authen' ? <Authen/> : <Todo/>}
            </AuthContext.Provider>
        </div>
    )
};


export default app;
