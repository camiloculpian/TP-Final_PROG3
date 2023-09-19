
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
                            {children &&
                                <div className='notificationContent'>
                                    <svg className="iconWAIT" xmlns="http://www.w3.org/2000/svg" height="3em" viewBox="0 0 384 512">
                                        <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-384c13.3 0 24 10.7 24 24V264c0 13.3-10.7 24-24 24s-24-10.7-24-24V152c0-13.3 10.7-24 24-24zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"/>
                                    </svg>
                                    {children}
                                </div>
                            }                   
                        </div>
                    </div>
                    }
                    </>
                )
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