import { useEffect, useState } from "react";

function CountrySelect(){
    const [datos, setDatos] = useState(null);

    useEffect(()=>{
        const consulta = `https://restcountries.com/v3.1/all`;

        fetch(consulta/*, { 'mode': 'cors', 'headers': { 'Access-Control-Allow-Origin': '*'}}*/)
        .then( resp => {
            resp.json().then(data => {
                console.log(data);
                setDatos(data);
            } )
        })
        .catch(error => {
            console.log('error -->', error);
        });
    }, []);

    return (
        <select name="countrySelect" className="dataEntry" id="NACIONALIDAD">
            {datos?.map((country, index) => {
                return (
                    <option value={index}>{country.name.common}</option>
                );
            })}
        </select>
    );
}

export default CountrySelect;