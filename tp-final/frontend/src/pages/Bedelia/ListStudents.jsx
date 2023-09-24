import { AdaptativeTable } from "../../components/AdaptativeTable";

const response = {
    "status": "OK",
    "data": [
        {
            "idEstudiante": 1,
            "dni": 31685001,
            "nombre": "Lionel",
            "apellido": "Messi",
            "fechaNacimiento": null,
            "nacionalidad": 0,
            "correoElectronico": "messi@correo.com",
            "celular": null,
            "foto": null,
            "activo": 1
        },
        {
            "idEstudiante": 2,
            "dni": 43325068,
            "nombre": "Tomas",
            "apellido": "Villafañe",
            "fechaNacimiento": null,
            "nacionalidad": 0,
            "correoElectronico": "tomasv@correo.com",
            "celular": null,
            "foto": null,
            "activo": 1
        },
        {
            "idEstudiante": 3,
            "dni": 39029137,
            "nombre": "Camila",
            "apellido": "Suarez",
            "fechaNacimiento": null,
            "nacionalidad": 0,
            "correoElectronico": "camilas@correo.com",
            "celular": null,
            "foto": null,
            "activo": 1
        },
        {
            "idEstudiante": 4,
            "dni": 43264515,
            "nombre": "Mateo",
            "apellido": "Barainca",
            "fechaNacimiento": null,
            "nacionalidad": 0,
            "correoElectronico": "mateob@correo.com",
            "celular": null,
            "foto": null,
            "activo": 1
        },
        {
            "idEstudiante": 5,
            "dni": 29935506,
            "nombre": "Camilo Martin",
            "apellido": "Culpian",
            "fechaNacimiento": "1983-01-08T03:00:00.000Z",
            "nacionalidad": 0,
            "correoElectronico": "camiloculpian@gmail.com",
            "celular": "3456251274",
            "foto": "null",
            "activo": 1
        },
        {
            "idEstudiante": 19,
            "dni": 55120117,
            "nombre": "Luisana Melina",
            "apellido": "Culpian",
            "fechaNacimiento": "1991-06-01T03:00:00.000Z",
            "nacionalidad": 0,
            "correoElectronico": "luisanaculpian@gmail.com",
            "celular": "3456251274",
            "foto": null,
            "activo": 1
        }
    ]
}

export default function EditStudent(){
    console.log('export default function EditStudent()');
    return(
        <AdaptativeTable data={response['data']}/>
    )
}