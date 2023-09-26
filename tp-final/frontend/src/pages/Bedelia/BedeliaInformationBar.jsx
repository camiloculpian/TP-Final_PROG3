import { useNavigate } from 'react-router';
import './BedeliaInformationBar.css';

function BedeliaInformationBar({loginState, setLoginState}) {
    const navigate = useNavigate();
    const logout = () => {
        setLoginState({
            logged: false,
            loginUser: '',
            loginGroup: '',
            loginTimeOut: (5000)
        })
        navigate('/');
    }
    
    return(
        <section>
            <div className="bedeliaStatusBar">
                <div className='informationContent'>
                    <p>Bienvenido: {loginState.loginUser}</p>
                </div>
                <div className="itemRight">
                    <button className="logOutButton" onClick={logout}>Salir</button>
                </div>
            </div>
        </section> 
    );

};
export default BedeliaInformationBar;