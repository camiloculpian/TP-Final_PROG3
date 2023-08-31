import './Login.css';
import './Bedelia.css';

function Login() {
  return (
    <>
    <div className="moduleContent">
      <form className='loginForm'> 
        <div className="dataLine justifyRight">
          <label className="dataTitle" for="APELLIDO">Usuario:</label>
          <input name="USERNAME" autofocus required className="dataEntry"id="USERNAME"></input>
        </div>
        <div className="dataLine justifyRight">
          <label className="dataTitle" for="PASSWORD">Contraseña:</label>
          <input name="PASSWORD" required className="dataEntry"id="PASSWORD"></input>
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