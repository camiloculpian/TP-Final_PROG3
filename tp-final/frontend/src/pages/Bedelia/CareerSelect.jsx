import { useEffect, useState } from "react";

// DEJAR ELEGIRT EL NOMBRE DEL CAMPO

function CareerSelect({callbackSelected, name='careerSelect', selected}){
    const [datos, setDatos] = useState(null);
    // const [selected, setSelected] = useState(defaultSelected);

    useEffect(()=>{
        const consulta = `http://localhost:3005/api/v1/carrera/lookup`;
        fetch(consulta, {method: 'GET'})
        .then( resp => {
            resp.json().then(data => {
                console.log(data['data']);
                setDatos(data['data']);
            } )
        })
        .catch(error => {
            console.log('error -->', error);
        });
    }, []);

    const changeSelected = event => {
        callbackSelected(event);
        selected = event.target.value;
      };

    return (
        
        <select value={selected} onChange={changeSelected} name={name} className="dataEntry" >
            {datos?.map((carrera, index) => {
                return (
                    <option key={carrera.ID} value={carrera.ID} >{carrera.Nombre}</option>
                );
            })}
        </select>
    );
}

export default CareerSelect;