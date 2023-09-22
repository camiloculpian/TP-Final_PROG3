import { useEffect, useState } from "react";

function CountrySelect(){
    const [datos, setDatos] = useState(null);
    const [selected, setSelected] = useState('240');

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
        setSelected(event.target.value);
      };

    return (
        <select value={selected} onChange={changeSelected} name="countrySelect" className="dataEntry" id="NACIONALIDAD">
            {datos?.map((country, index) => {
                return (
                    <option key={index} value={index}>{country.name.common}</option>
                );
            })}
        </select>
    );
}

export default CountrySelect;