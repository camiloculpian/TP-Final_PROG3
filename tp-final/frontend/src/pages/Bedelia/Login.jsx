import './Login.css';
import './Bedelia.css';
import { useContext, useState } from 'react';
import { Notification } from '../../components/Notifications';
import { UserContext } from '../../components/UserContext';

function Login() {
  const {setUserData } = useContext(UserContext);

  const [notificationState, launchNotificacion] = useState({
    notifMessage: '',
    notifType: '',
    state: false
  })
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const handleChange = (e) => {
    const { target } = e;
    const { name, value } = target;
    const newValues = {
      ...formData,
      [name]: value,
    };
    setFormData(newValues);
}
  const handleSubmit = async (e) => {
    e.preventDefault();
    const requestOptions = {
      method: 'POST',
      headers:{
          'Content-Type':'application/json'
          },
          credentials: 'include',
          body: JSON.stringify(formData)
    };
    fetch(`http://localhost:3005/api/v1/auth/login`,requestOptions)
      .then(async response => {
          const isJson = response.headers.get('content-type')?.includes('application/json');
          const data = isJson && await response.json();
          if (!response.ok) {
              // const error = (data && data.message) || response.status;
              const error = data;
              return Promise.reject(error);
          }
          return data;
      }).then(data =>{
          launchNotificacion({
              notifMessage: data['message'],
              notifType: data['status'],
              state: true
          })
          if(data){
            setUserData({ user: data.usuario, token: data.token });
          }
      }).catch(error => { 
          launchNotificacion({
              notifMessage: <>
                              <p>No se pudo</p>
                              <h4>{error.message}</h4>
                            </>,
              notifType: 'ERROR',
              state: true
          })
      });;
  }
  return (
    <>
      <div className="moduleContent">
        <div className='loginLine'>
          <div className='authLoginImg'/>
          <div className='authLoginContent'>
            <form className='loginForm' onSubmit={handleSubmit}> 
              <div className="dataLine justifyMiddle">
                <label className="dataLoginUsername" htmlFor="username"/>
                <input name="username" autoFocus required className="dataEntry" value={formData.username} onChange={handleChange}></input>
              </div>
              <div className='loginMarginBottom'></div>
              <div className="dataLine justifyMiddle">
                <label className="dataLoginPassword" htmlFor="password"/>
                <input type='password' name="password" required className="dataEntry" value={formData.password} onChange={handleChange}></input>
              </div>
              <div className='justifyRight'>
                <button type="submit" className="botonComun">Iniciar Sesion</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Notification state={notificationState} onCloseNotificacion={launchNotificacion}/>
    </>
  );
}
export default Login;