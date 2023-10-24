import { createContext, useState } from 'react';

const UserContext = createContext({
    userData:false
});

const UserProvider = ({ children }) => {

    // datos del usuario logueado
    const [userData, setUserData] = useState(null);

    const isLoggedIn = () => {
        return (userData != null && userData.user != null);
    }
    
    const isBedel = () => {        
        return (userData != null && userData.user.tipoUsuario === 1);
    }

    const isDecano = () => {        
        return (userData != null && userData.user.tipoUsuario === 0);
    }

    return (
        <UserContext.Provider value={{ userData, setUserData, isLoggedIn, isBedel, isDecano }}>
            {children}
        </UserContext.Provider>
    );
};

export { UserContext, UserProvider };