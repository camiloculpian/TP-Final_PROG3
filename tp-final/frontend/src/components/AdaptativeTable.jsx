// Recibe un json con las header(cabecera) y data (datos=filas) y transforma todo en una tabla

function AdaptativeTable(json){
    const TRs=Object.keys(json['data'][0]);
    const TDs=Object.values(json['data']);
    // TDs.forEach(element => {
    //     console.log(Object.values(element));
    // });
    return(
        <table>
            <thead>
                <tr>{
                    TRs.map((element) => {
                        return(<th key={element}>{element}</th>);
                    })
                }</tr>
            </thead>
            <tbody>{
 
                TDs.map((element, id) => {
                    return(
                        <tr key={id}>{
                            Object.values(element).map((value, id) => {
                                return(<td key={id}>{value}</td>);
                            })
                        }</tr>
                    )
                })
                
            }</tbody>
        </table>
    );
}

export {
    AdaptativeTable,
}
    