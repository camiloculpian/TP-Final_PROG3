
import "./Notifications.css";

// const Seasons = {
// 	Summer: Symbol("summer"),
// 	Autumn: Symbol("autumn"),
// 	Winter: Symbol("winter"),
// 	Spring: Symbol("spring")
// }

// let season = Seasons.Spring

// switch (season) {
// 	case Seasons.Summer:
// 	console.log('the season is summer')
// 	break;
// 	case Seasons.Winter:
// 	console.log('the season is winter')
// 	break;
// 	case Seasons.Spring:
// 	console.log('the season is spring')
// 	break;
// 	case Seasons.Autumn:
// 	console.log('the season is autumn')
// 	break;
// 	default:
// 		console.log('season not defined')
// }

export default function Notification({children, notifType = 'WAIT', state, onChangeState}) {
    
        switch (notifType){
            case 'WAIT':
                return(
                    <>
                    {state &&
                    <div className='overlay'>
                        <div className='notificationWait'>
                            <div className='notificationContent'>
                                {children &&
                                    <>
                                        <svg className="iconWAIT" xmlns="http://www.w3.org/2000/svg" height="3em" viewBox="0 0 384 512">
                                            <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/>
                                        </svg>
                                        {children}
                                    </>
                                } 
                            </div>                
                        </div>
                    </div>
                    }
                    </>
                );
                case 'OK':
                    return(
                        <>
                        {state &&
                        <div className='overlay'>
                            <div className='notificationOK'>
                                <div className='notificationContent'>
                                    <button className={'buttonCloseNotification '} onClick={() => onChangeState(!state)}>
                                        <svg className="buttonCloseOK" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512">
                                            <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/>
                                        </svg>
                                    </button>
                                    {children &&
                                        <>
                                            <svg className="iconOK" xmlns="http://www.w3.org/2000/svg" height="3em" viewBox="0 0 384 512">
                                                <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"/>
                                            </svg>
                                            {children}
                                        </>
                                    } 
                                </div>                 
                            </div>
                        </div>
                        }
                        </>
                    );
                    case 'ERROR':
                        return(
                            <>
                            {state &&
                            <div className='overlay'>
                                <div className='notificationERROR'>
                                    <div className='notificationContent'>
                                        <button className={'buttonCloseNotification '} onClick={() => onChangeState(!state)}>
                                            <svg className="buttonCloseERROR" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512">
                                                <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/>
                                            </svg>
                                        </button>
                                        {children &&
                                            <>
                                                <svg className="iconERROR" xmlns="http://www.w3.org/2000/svg" height="3em" viewBox="0 0 384 512">
                                                    <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-384c13.3 0 24 10.7 24 24V264c0 13.3-10.7 24-24 24s-24-10.7-24-24V152c0-13.3 10.7-24 24-24zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"/>                                               </svg>
                                                {children}
                                            </>
                                        } 
                                    </div>                 
                                </div>
                            </div>
                            }
                            </>
                        );
            default:
                return(
                    <>
                    </>
                )
    };
};

// export default function NotificationOK() {
//     return(
//         <>
//         </>
//     )
// };

// export default function NotificationERROR() {
//     return(
//         <>
//         </>
//     )
// };

// export default function NotificationINFO() {
//     return(
//         <>
//         </>
//     )
// };

// export default function NotificationWAIT() {
//     return(
//         <div className='overlay'>
//             <div className='notificationWait'>
                                
//             </div>
//         </div>
//     )
// };