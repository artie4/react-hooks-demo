import React, {useContext} from 'react';

import AuthContext from '../auth-context';

const header = props => {
    const authContext = useContext(AuthContext);
    return (
        <header>
            {authContext.status ? <button onClick={props.onLoadTodos}>Todo list</button> : null }
            <button onClick={props.onLoadAuthen}>Authen</button>
        </header>
    )
};

export default header;
