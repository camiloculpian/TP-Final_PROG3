import { useContext, useEffect, useState } from "react";
import { AdaptativeTable } from "../../components/AdaptativeTable";
import { Notification } from "../../components/Notifications";
import { ProtectedElement } from "../../components/ProtectedElement";
import { UserContext } from "../../components/UserContext";

export default function ListStudent(){
    const {userData } = useContext(UserContext);
    const [data, setData] = useState();
    const [notificationState, launchNotificacion] = useState({
        notifMessage: '',
        notifType: '',
        state: false
    })
    useEffect(() => {
        launchNotificacion({
            notifMessage: <p>Obteniendo lista de estudiantes</p>,
            notifType: 'WAIT',
            state: true
        })
        const requestOptions = {
            method: 'GET',
            headers: {'Authorization': `Bearer ${userData?.token}`}
        };
        fetch('http://localhost:3005/api/v1/estudiante/lookup', requestOptions)
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
                setData(data);
                launchNotificacion({
                    notifMessage: '',
                    notifType: '',
                    state: false
                })
            }).catch(error => { 
                launchNotificacion({
                    notifMessage: <>
                                    <p>No se pudo obtener la lista debido al siguiente error</p>
                                    <h4>{error.message}</h4>
                                  </>,
                    notifType: 'ERROR',
                    state: false
                })
            });;
    }, [userData?.token])

    return(
        <ProtectedElement mustBeBedel={true}>
            <div className="moduleContent">
                <fieldset>
                    <legend>Estudiantes -&gt; Listar Estudiantes</legend>
                    <AdaptativeTable tableData={data?data:{data: []}} />
                </fieldset>
            </div>
            <Notification state={notificationState} onCloseNotificacion={launchNotificacion}/>
        </ProtectedElement>
    )
}