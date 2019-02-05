import React, {useContext} from 'react';

import AuthContext from '../auth-context';


const authen = props => {

    const authContext = useContext(AuthContext);

    return (<button onClick={authContext.login}>Log in!</button>)
};

export default authen;