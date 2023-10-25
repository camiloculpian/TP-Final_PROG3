// Recibe un json con las header(cabecera) y data (datos=filas) y transforma todo en una tabla
import './AdaptativeTable.css';

function AdaptativeTable({tableData, callbackSelectable, callbackMultipleSelectable, callbackEditable, callbackDeletable, customCallback, style}){
    if (tableData && tableData['headers'] && tableData['data']){
        const TRs=tableData['headers'];
        const TDs=tableData['data'];
        return(
            <table style={style}>
                <thead>
                    <tr>{
                            TRs.map((element, id) => {
                                return(<th key={id}>{element.name}</th>);
                            })
                        }
                        {callbackEditable||callbackDeletable?<th id='actions' colSpan={callbackEditable&&callbackDeletable?2:1}>ACTIONS</th>:<></>}
                    </tr>
                </thead>
                <tbody>{
                    TDs.map((element, id) => {
                        return(
                            <tr key={id} onClick={callbackSelectable?() => callbackSelectable(element):()=>{}}>{
                                //ACA ESTA EL ERROR
                                Object.values(element).map((value, id) => {
                                    return(<td key={id} >{value}</td>);
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
    