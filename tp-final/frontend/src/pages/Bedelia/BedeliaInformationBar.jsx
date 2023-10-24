import { useNavigate } from 'react-router';
import { UserContext } from '../../components/UserContext';

import './BedeliaInformationBar.css';
import { useContext } from 'react';

function BedeliaInformationBar() {
    const {userData,setUserData } = useContext(UserContext);
    const navigate = useNavigate();
    const logout = () => {
        setUserData(false);
        navigate('/');
    }
    
    return(
        <section>
            <div className="bedeliaStatusBar">
                <div className='informationContent'>
                    <p>Bienvenido: {userData.user.correoElectronico}</p>
                </div>
                <div className="itemRight">
                    <button className="logOutButton" onClick={logout}>Salir</button>
                </div>
            </div>
        </section> 
    );

};
export default BedeliaInformationBar;