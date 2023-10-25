import { useContext } from 'react';
import { Navigate } from "react-router-dom";
import { UserContext } from './UserContext';


const ProtectedRoute = ({mustBeBedel, children }) => {

    const { isLoggedIn, isBedel } = useContext(UserContext);

    if (!isLoggedIn() || (mustBeBedel && !isBedel())) {
        return <Navigate to="/" replace />;
    }

    return children;
};
export { ProtectedRoute };