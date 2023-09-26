import './Login.css';
import './Bedelia.css';
import { useState } from 'react';

function Login({setLoginState}) {
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
    if(formData.username === 'test' && formData.password === 'test'){
      setLoginState({
        logged: true,
        loginUser: 'test',
        loginGroup: 'test',
        loginTimeOut: 5000
      });
    }
  }
  return (
    <>
    <div className="moduleContent">
      <form className='loginForm' onSubmit={handleSubmit}> 
        <div className="dataLine justifyRight">
          <label className="dataTitle" htmlFor="username">Usuario:</label>
          <input name="username" autoFocus required className="dataEntry" value={formData.username} onChange={handleChange}></input>
        </div>
        <div className="dataLine justifyRight">
          <label className="dataTitle" htmlFor="password">Contraseña:</label>
          <input type='password' name="password" required className="dataEntry" value={formData.password} onChange={handleChange}></input>
        </div>
        <div>
          <button type="submit" className="botonComun">Iniciar Sesion</button>
        </div>
      </form>
      </div>
    </>
  );
}
export default Login;