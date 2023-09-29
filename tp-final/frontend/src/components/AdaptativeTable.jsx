// Recibe un json con las header(cabecera) y data (datos=filas) y transforma todo en una tabla
import './AdaptativeTable.css';

function AdaptativeTable({json, callbackSelectable, callbackEditable, callbackDeletable}){
    if (json && json['data'][0]){
        const TRs=Object.keys(json['data'][0]);
        const TDs=Object.values(json['data']);
        return(
            <table>
                <thead>
                    <tr>{
                            TRs.map((element, id) => {
                                return(<th key={id}>{element}</th>);
                            })
                        }
                        {callbackEditable||callbackSelectable?<th id='actions' colSpan={callbackEditable&&callbackDeletable?2:1}>ACTIONS</th>:<></>}
                    </tr>
                </thead>
                <tbody>{
                    TDs.map((element, id) => {
                        return(
                            <tr key={id} onClick={callbackSelectable?() => callbackSelectable(element):()=>{}}>{
                                Object.values(element).map((value, id) => {
                                    return(<td key={id}>{value}</td>);
                                })}
                                {callbackEditable? <td key={'EDT-'+id}><button className="tdEditButton" onClick={()=>callbackEditable(element)}></button></td>:<></>}
                                {callbackDeletable? <td key={'DLT-'+id}><button className="tdDeleteButton" onClick={()=>callbackDeletable(element)}></button></td>:<></>}
                            </tr>
                        )
                    })
                }</tbody>
            </table>
        );
    }else{
        return(<></>)
    }
}

export {
    AdaptativeTable,
}
    