import './Modal.css';

function Modal({children, state, changeState, title, modalColor = 'modalDefault', showBorderOnHeader=true, }) {
  return (
    <>
        {state &&
            <div className='overlay' >
                <div className={(modalColor)}>
                    <div className={'contenedorModal '+(modalColor)}>
                        <div className={showBorderOnHeader ? 'encabezadoModal showBorderOnHeader':'encabezadoModal'}>
                            {title &&
                                <h3>{title}</h3>
                            }
                        </div>
                        <button className={'buttonCloseModal '+(modalColor)} onClick={() => changeState(!state)} >
                            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512">
                                <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/>
                            </svg>
                        </button>
                        {children &&
                            <div className='contenidoModal'>
                                {children}
                            </div>
                        }
                    </div>
                </div>
            </div>
        }
    </>
  );
}

export default Modal;