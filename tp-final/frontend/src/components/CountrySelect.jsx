import { useEffect, useState } from "react";

// DEJAR ELEGIRT EL NOMBRE DEL CAMPO

function CountrySelect({callbackSelected, name='countrySelect', selected}){
    const [datos, setDatos] = useState(null);
    // const [selected, setSelected] = useState(defaultSelected);

    useEffect(()=>{
        const consulta = `https://restcountries.com/v3.1/all`;

        fetch(consulta)
        .then( resp => {
            resp.json().then(data => {
                setDatos(data);
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
            {datos?.map((country, index) => {
                return (
                    <option key={index} value={index} >{country.name.common}</option>
                );
            })}
        </select>
    );
}

export default CountrySelect;