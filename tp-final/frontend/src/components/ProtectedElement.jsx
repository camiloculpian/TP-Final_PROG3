import { useContext } from 'react';
import { UserContext } from './UserContext';

const ProtectedElement = ({mustBeBedel,mustBeDecano, children }) => {

    const { isLoggedIn, isDecano, isBedel } = useContext(UserContext);

    if (!isLoggedIn() || (mustBeBedel && !isBedel())) {
        return <></>;
    }

    if (!isLoggedIn() || (mustBeDecano && !isDecano())) {
        return <></>;
    }
    return children;
};
export { ProtectedElement };