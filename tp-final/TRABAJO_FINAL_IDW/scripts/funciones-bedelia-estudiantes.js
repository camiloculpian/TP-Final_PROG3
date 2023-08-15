window.onload = function() {
}

function emailValido (email){
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function obtener_next_id(){
    var ListaDeEstudiantes = JSON.parse(localStorage.getItem('ListaDeEstudiantes'));
    let next_id = 0;
    if (ListaDeEstudiantes == null){
        ListaDeEstudiantes = [];
    }
    ListaDeEstudiantes?.forEach(element => {
        if(parseInt(element['id_estudiante'],10)>next_id){next_id=parseInt(element['id_estudiante'],10)}
    })
    next_id++;
    return next_id;
}

function agregar_estudiante(e){
    e.preventDefault();
    if(
        document.querySelector('#APELLIDO').value.trim() != '' &&
        document.querySelector('#NOMBRE').value.trim() != '' &&
        document.querySelector('#DNI').value.trim() != '' &&
        document.querySelector('#FECHA_NACIMIENTO').value.trim() != '' &&
        document.querySelector('#NACIONALIDAD').value.trim() != '' &&
        document.querySelector('#TELEFONO').value.trim() != '' &&
        emailValido(document.querySelector('#EMAIL').value.trim())
    ){
        const NuevoEstudiante = {
            id_estudiante: obtener_next_id(),
            apellido: document.querySelector('#APELLIDO').value.trim(),
            nombre: document.querySelector('#NOMBRE').value.trim(),
            dni: document.querySelector('#DNI').value.trim(),
            fech_nac: document.querySelector('#FECHA_NACIMIENTO').value.trim(),
            id_nacion: document.querySelector('#NACIONALIDAD').value.trim(),
            telefono: document.querySelector('#TELEFONO').value.trim(),
            email:document.querySelector('#EMAIL').value.trim()
        };

        let ListaDeEstudiantes = JSON.parse(localStorage.getItem('ListaDeEstudiantes'));
        if (ListaDeEstudiantes == null){
            ListaDeEstudiantes = [];
        }
        ListaDeEstudiantes.push(NuevoEstudiante);
        localStorage.setItem('ListaDeEstudiantes', JSON.stringify(ListaDeEstudiantes));
        document.querySelector('#APELLIDO').value = null;
        document.querySelector('#NOMBRE').value = null;
        document.querySelector('#DNI').value = null;
        document.querySelector('#FECHA_NACIMIENTO').value = null;
        document.querySelector('#NACIONALIDAD').value = 5;
        document.querySelector('#TELEFONO').value = null;
        document.querySelector('#EMAIL').value = null;
        var contenedor_modal = document.getElementById("contenedor-modal");
        // NO VA ASI YA SE...
        contenedor_modal.innerHTML = '<div class="modal"><div class="modal-content green"><h3 class="contenido-con-margen-chico">El Alumno se agrego correctamente<h3><button class="boton-modal" id="cerrar_modal">Aceptar</button></div></div>';
        document.getElementById("cerrar_modal").addEventListener("click", cerrar_modal);
    }
}

async function listar_estudiantes(){
    let ListaDeEstudiantes = JSON.parse(localStorage.getItem('ListaDeEstudiantes'));
    if (ListaDeEstudiantes == null){
        ListaDeEstudiantes = [];
    }
    const listadoEstudiantesDinamico = document.getElementById("LISTADO_ESTUDIANTES_DINAMICO");
    ListaDeEstudiantes.forEach(element => {
        let tr = document.createElement("tr");
        for (let campo in element){
            if (campo!="id_estudiante"){
                let td = document.createElement("td");
                if (campo=="id_nacion")
                {
                    td.textContent = obtener_nacionalidad(element[campo]);
                }else{
                    td.textContent = element[campo];
                }
                tr.appendChild(td);
            }else{
                tr.id = "id_estudiante : "+element[campo];
            }
        }
        listadoEstudiantesDinamico.appendChild(tr);
    });
}

function buscar_estudiantes(){
    const ListaDeEstudiantes = JSON.parse(localStorage.getItem('ListaDeEstudiantes'));
    if (ListaDeEstudiantes == null){
        ListaDeEstudiantes = [];
    }
    if (document.getElementById("VALOR_DE_BUSQUEDA")?.value.trim() !== '') {
        ListaDeEstudiantes.forEach(element => {
            if (element['dni'] == document.getElementById("VALOR_DE_BUSQUEDA")?.value.trim()){
                document.querySelector('#ID_ESTUDIANTE').value = element['id_estudiante'];
                document.querySelector('#APELLIDO').value = element['apellido'];
                document.querySelector('#APELLIDO').disabled = false;
                document.querySelector('#NOMBRE').value = element['nombre'];
                document.querySelector('#NOMBRE').disabled = false;
                document.querySelector('#DNI').value = element['dni'];
                document.querySelector('#DNI').disabled = false;
                document.querySelector('#FECHA_NACIMIENTO').value = element['fech_nac'];
                document.querySelector('#FECHA_NACIMIENTO').disabled = false;
                document.querySelector('#NACIONALIDAD').value = element['id_nacion'];
                document.querySelector('#NACIONALIDAD').disabled = false;
                document.querySelector('#TELEFONO').value = element['telefono'];
                document.querySelector('#TELEFONO').disabled = false;
                document.querySelector('#EMAIL').value = element['email'];
                document.querySelector('#EMAIL').disabled = false;
            }
        })
    }
    else {
        const contenedor_modal = document.getElementById("contenedor-modal");

        var node_1 = document.createElement('DIV');
        node_1.setAttribute('class', 'modal');

        var node_2 = document.createElement('DIV');
        node_2.setAttribute('class', 'modal-content grey');
        node_1.appendChild(node_2);

        var node_3 = document.createElement('DIV');
        node_3.setAttribute('class', 'data-line');
        node_2.appendChild(node_3);

        var node_4 = document.createElement('LABEL');
        node_4.setAttribute('class', 'data-title');
        node_4.setAttribute('for', 'APELLIDO_DE_BUSQUEDA');
        const node_4_1 = document.createTextNode('Apellido:');
        node_4.appendChild(node_4_1);
        node_3.appendChild(node_4);

        var node_5 = document.createElement('INPUT');
        node_5.setAttribute('name', 'APELLIDO_DE_BUSQUEDA');
        node_5.setAttribute('class', 'data-entry');
        node_5.setAttribute('id', 'APELLIDO_DE_BUSQUEDA');
        node_5.setAttribute('autofocus', '');
        node_5.setAttribute('placeholder', 'Ingrese Apellido');
        node_3.appendChild(node_5);

        var node_6 = document.createElement('LABEL');
        node_6.setAttribute('class', 'data-title');
        node_6.setAttribute('for', 'NOMBRE_DE_BUSQUEDA');
        const node_6_1 = document.createTextNode('Nombre:');
        node_6.appendChild(node_6_1);
        node_3.appendChild(node_6);

        var node_7 = document.createElement('INPUT');
        node_7.setAttribute('name', 'NOMBRE_DE_BUSQUEDA');
        node_7.setAttribute('class', 'data-entry');
        node_7.setAttribute('id', 'NOMBRE_DE_BUSQUEDA');
        node_7.setAttribute('autofocus', '');
        node_7.setAttribute('placeholder', 'Ingrese Nombre');
        node_3.appendChild(node_7);

        var node_8 = document.createElement('BUTTON');
        node_8.setAttribute('class', 'boton-buscar');
        node_8.setAttribute('id', 'buscar_estudiante_modal');
        node_3.appendChild(node_8);

        var node_9 = document.createElement('TABLE');
        node_9.setAttribute('id', 'TABLA_DE_BUSQUEDA');
        node_2.appendChild(node_9);

        var node_10 = document.createElement('THEAD');
        node_9.appendChild(node_10);

        var node_11 = document.createElement('TR');
        node_10.appendChild(node_11);

        //ESTA ES LA COLUMNA CON EL ID DE LOS ESTUDIANTES
        var node_12_0 = document.createElement('TH');
        node_12_0.style.visibility = "collapse";
        node_12_0.style.display = "none";
        const node_12_0_1 = document.createTextNode('id');
        node_12_0.appendChild(node_12_0_1);
        node_11.appendChild(node_12_0);

        var node_12 = document.createElement('TH');
        const node_12_1 = document.createTextNode('Apellido');
        node_12.appendChild(node_12_1);
        node_11.appendChild(node_12);

        var node_13 = document.createElement('TH');
        const node_13_1 = document.createTextNode('Nombre');
        node_13.appendChild(node_13_1);
        node_11.appendChild(node_13);

        var node_14 = document.createElement('TH');
        const node_14_1 = document.createTextNode('DNI');
        node_14.appendChild(node_14_1);
        node_11.appendChild(node_14);

        var node_15 = document.createElement('TH');
        const node_15_1 = document.createTextNode('Fecha Nacimiento');
        node_15.appendChild(node_15_1);
        node_11.appendChild(node_15);

        var node_16 = document.createElement('TBODY');
        node_16.setAttribute('id', 'LISTADO_ESTUDIANTES_DINAMICO_MODAL');
        node_9.appendChild(node_16);

        var node_17 = document.createElement('DIV');
        node_2.appendChild(node_17);

        var node_18 = document.createElement('BUTTON');
        node_18.setAttribute('class', 'boton-comun');
        node_18.setAttribute('id', 'cancelar_editar_alumno');
        const node_18_1 = document.createTextNode('Cancelar');
        node_18.appendChild(node_18_1);
        node_17.appendChild(node_18);

        contenedor_modal.appendChild(node_1);

        document.getElementById("buscar_estudiante_modal").addEventListener("click", buscar_estudiante_modal);
        document.getElementById("cancelar_editar_alumno")?.addEventListener("click", cerrar_modal);
    }
}

/*CREA LA TABLA DE ESTUDIANTES EN EL MODAL QUE COINCIDEN CON EL CRITERIO DE BUSQUEDA*/
function buscar_estudiante_modal(){
    const ListaDeEstudiantes = JSON.parse(localStorage.getItem('ListaDeEstudiantes'));
    if (ListaDeEstudiantes == null){
        ListaDeEstudiantes = [];
    }
    const listadoEstudiantesDinamico = document.getElementById("LISTADO_ESTUDIANTES_DINAMICO_MODAL");
    while (listadoEstudiantesDinamico.firstChild) {
        listadoEstudiantesDinamico.removeChild(listadoEstudiantesDinamico.firstChild);
    }
    ListaDeEstudiantes.forEach(element => {
        if(element['apellido'].toLowerCase().match(document.getElementById('APELLIDO_DE_BUSQUEDA')?.value.toLowerCase()) && element['nombre'].toLowerCase().match(document.getElementById('NOMBRE_DE_BUSQUEDA')?.value.toLowerCase())){
            var $tr = document.createElement("tr");

            var $td = document.createElement("td");
            $td.textContent = element["id_estudiante"];
            $td.style.visibility = "collapse";
            $td.style.display = "none";
            $tr.appendChild($td);

            $td = document.createElement("td");
            $td.textContent = element["apellido"];
            $tr.appendChild($td);
        
            $td = document.createElement("td");
            $td.textContent = element["nombre"];
            $tr.appendChild($td);
    
            $td = document.createElement("td");
            $td.textContent = element["dni"];
            $tr.appendChild($td);
    
            $td = document.createElement("td");
            $td.textContent = element["fech_nac"];
            $tr.appendChild($td);

            $tr.onclick = function(){
                rIndex = $tr.rowIndex;
                cargar_datos_estudiante_modal($tr.cells[0].textContent);
                cerrar_modal();
            }
            listadoEstudiantesDinamico.appendChild($tr);
        }
    });
}

function cargar_datos_estudiante_modal(id_estudiante){
    const ListaDeEstudiantes = JSON.parse(localStorage.getItem('ListaDeEstudiantes'));
    if (ListaDeEstudiantes == null){
        ListaDeEstudiantes = [];
    }
    ListaDeEstudiantes.forEach(element => {
        if (element['id_estudiante'] == id_estudiante){
            document.querySelector('#ID_ESTUDIANTE').value = element['id_estudiante'];
            document.querySelector('#APELLIDO').value = element['apellido'];
            document.querySelector('#APELLIDO').disabled = false;
            document.querySelector('#NOMBRE').value = element['nombre'];
            document.querySelector('#NOMBRE').disabled = false;
            document.querySelector('#DNI').value = element['dni'];
            document.querySelector('#DNI').disabled = false;
            document.querySelector('#FECHA_NACIMIENTO').value = element['fech_nac'];
            document.querySelector('#FECHA_NACIMIENTO').disabled = false;
            document.querySelector('#NACIONALIDAD').value = element['id_nacion'];
            document.querySelector('#NACIONALIDAD').disabled = false;
            document.querySelector('#TELEFONO').value = element['telefono'];
            document.querySelector('#TELEFONO').disabled = false;
            document.querySelector('#EMAIL').value = element['email'];
            document.querySelector('#EMAIL').disabled = false;
            //document.querySelector('#editar-estudiante').disabled = false;
        }
    })
}

function editar_estudiante(e){
    e.preventDefault();
    var ListaDeEstudiantes = JSON.parse(localStorage.getItem('ListaDeEstudiantes'));
    if (document.querySelector('#ID_ESTUDIANTE')?.value != null)
    {
        ListaDeEstudiantes.forEach(element =>
        {
            if(element['id_estudiante'] == document.getElementById("ID_ESTUDIANTE").value)
            {
                console.log(element);
                // //TENGO QUE CHEQUEAR VALORES!!!
                element['apellido'] = document.querySelector('#APELLIDO').value;
                element['nombre'] = document.querySelector('#NOMBRE').value;
                element['dni'] = document.querySelector('#DNI').value;
                element['fech_nac'] = document.querySelector('#FECHA_NACIMIENTO').value;
                element['id_nacion'] = document.querySelector('#NACIONALIDAD').value;
                element['telefono'] = document.querySelector('#TELEFONO').value;
                element['email'] = document.querySelector('#EMAIL').value;
                //document.getElementById("VALOR_DE_BUSQUEDA").value = '';
                localStorage.setItem('ListaDeEstudiantes', JSON.stringify(ListaDeEstudiantes));
                var contenedor_modal = document.getElementById('contenedor-modal');
                //NO VA ASI YA SE....
                contenedor_modal.innerHTML = '<div class="modal"><div class="modal-content green"><h3 class="contenido-con-margen-chico">El Alumno se edito correctamente<h3><button class="boton-modal" id="cerrar_modal">Aceptar</button></div></div>';
                document.getElementById("cerrar_modal").addEventListener("click", cerrar_modal);
                return true;
            }
        })
    }else{
        var contenedor_modal = document.getElementById('contenedor-modal');
        contenedor_modal.innerHTML = '<div class="modal"><div class="modal-content red"><h3 class="contenido-con-margen-chico">Seleccione un Alumno para editar!!!!<h3><button class="boton-modal" id="cerrar_modal">Aceptar</button></div></div>';
        document.getElementById("cerrar_modal").addEventListener("click", cerrar_modal);
        return false;
    }
}

function eliminar_estudiante(){
    let ListaDeEstudiantes = JSON.parse(localStorage.getItem('ListaDeEstudiantes'));
    if (document.querySelector('#ID_ESTUDIANTE')?.value != null)
    {

        ListaDeEstudiantes = ListaDeEstudiantes.filter(element => element['id_estudiante'] != document.getElementById("ID_ESTUDIANTE").value);
    
        document.getElementById("VALOR_DE_BUSQUEDA").value = '';
        localStorage.setItem('ListaDeEstudiantes', JSON.stringify(ListaDeEstudiantes));
        document.querySelector('#ID_ESTUDIANTE').value = null;
        document.querySelector('#APELLIDO').value = null;
        document.querySelector('#NOMBRE').value = null;
        document.querySelector('#DNI').value = null;
        document.querySelector('#FECHA_NACIMIENTO').value = null;
        document.querySelector('#NACIONALIDAD').value = 5;
        document.querySelector('#TELEFONO').value = null;
        document.querySelector('#EMAIL').value = null;
        var contenedor_modal = document.getElementById('contenedor-modal');
        //NO VA ASI YA SE....
        contenedor_modal.innerHTML = '<div class="modal"><div class="modal-content blue"><h3 class="contenido-con-margen-chico">El Alumno fue eliminado correctamente<h3><button class="boton-modal" id="cerrar_modal">Aceptar</button></div></div>';
        document.getElementById("cerrar_modal").addEventListener("click", cerrar_modal);
        return true;
    }else{
        var contenedor_modal = document.getElementById('contenedor-modal');
        contenedor_modal.innerHTML = '<div class="modal"><div class="modal-content red"><h3 class="contenido-con-margen-chico">Seleccione un Alumno para eliminar!!!!<h3><button class="boton-modal" id="cerrar_modal">Aceptar</button></div></div>';
        document.getElementById("cerrar_modal").addEventListener("click", cerrar_modal);
        return false;
    }
}

function obtener_nacionalidad(id_nacion){
    const ListaDePaises = paises;
    let pais = null;
    ListaDePaises.forEach(element => {
        if(element['id_nacion'] == parseInt(id_nacion,10)){
            pais = element['nombre'];
        }
    })
    return pais;
}

// async function obtener_nacionalidad(id_nacion){
//     const url='http://localhost:5500/scripts/backend/paises.json';
//     var pais;
//     pais = await fetch(url)
//         .then((response) => {
//             if(response.ok){
//                 return response.json();
//             }
//         })
//         .then((response) => {
//             return response.paises.filter(element => element['id_nacion'] == parseInt(id_nacion));
//         })
//         .catch((error) => {
//             console.log('error', error)
//     });
//     console.log(pais[0]['nombre']);
//     return pais[0]['nombre'];
// }

function llenar_selector_nacionalidad(){
    const url='http://localhost:5500/scripts/backend/paises.json';
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var ListaDePaises = JSON.parse(xhr.responseText)['paises'];
            const $selectorNacionalidadDinamico = document.querySelector("#NACIONALIDAD");
            ListaDePaises.forEach(element => {
                const $option = document.createElement("option");
                $option.setAttribute('value', element['id_nacion']);
                $option.textContent = element['nombre'];
                if(element['nombre'] == 'Argentina'){
                    $option.selected = true;
                }
                $selectorNacionalidadDinamico.appendChild($option);
            });
        } else {
            console.log(`Status: ${xhr.status}`);
        }
    };
    xhr.send();
}

function cerrar_modal(){
    var contenedor_modal = document.getElementById("contenedor-modal");
    while (contenedor_modal.firstChild) {
        contenedor_modal.removeChild(contenedor_modal.firstChild);
    }
}

//LA LISTA SE LA DEVERIA PEDIR AL SERVIDOR
var paises = [
    {
        "id_nacion" : 144,
        "nombre" : "Afganistán"
    },
    {
        "id_nacion" : 114,
        "nombre" : "Albania"
    },
    {
        "id_nacion" : 18,
        "nombre" : "Alemania"
    },
    {
        "id_nacion" : 98,
        "nombre" : "Algeria"
    },
    {
        "id_nacion" : 145,
        "nombre" : "Andorra"
    },
    {
        "id_nacion" : 119,
        "nombre" : "Angola"
    },
    {
        "id_nacion" : 4,
        "nombre" : "Anguilla"
    },
    {
        "id_nacion" : 147,
        "nombre" : "Antigua y Barbuda"
    },
    {
        "id_nacion" : 207,
        "nombre" : "Antillas Holandesas"
    },
    {
        "id_nacion" : 91,
        "nombre" : "Arabia Saudita"
    },
    {
        "id_nacion" : 5,
        "nombre" : "Argentina"
    },
    {
        "id_nacion" : 6,
        "nombre" : "Armenia"
    },
    {
        "id_nacion" : 142,
        "nombre" : "Aruba"
    },
    {
        "id_nacion" : 1,
        "nombre" : "Australia"
    },
    {
        "id_nacion" : 2,
        "nombre" : "Austria"
    },
    {
        "id_nacion" : 3,
        "nombre" : "Azerbaiyán"
    },
    {
        "id_nacion" : 80,
        "nombre" : "Bahamas"
    },
    {
        "id_nacion" : 127,
        "nombre" : "Bahrein"
    },
    {
        "id_nacion" : 149,
        "nombre" : "Bangladesh"
    },
    {
        "id_nacion" : 128,
        "nombre" : "Barbados"
    },
    {
        "id_nacion" : 9,
        "nombre" : "Bélgica"
    },
    {
        "id_nacion" : 8,
        "nombre" : "Belice"
    },
    {
        "id_nacion" : 151,
        "nombre" : "Benín"
    },
    {
        "id_nacion" : 10,
        "nombre" : "Bermudas"
    },
    {
        "id_nacion" : 7,
        "nombre" : "Bielorrusia"
    },
    {
        "id_nacion" : 123,
        "nombre" : "Bolivia"
    },
    {
        "id_nacion" : 79,
        "nombre" : "Bosnia y Herzegovina"
    },
    {
        "id_nacion" : 100,
        "nombre" : "Botsuana"
    },
    {
        "id_nacion" : 12,
        "nombre" : "Brasil"
    },
    {
        "id_nacion" : 155,
        "nombre" : "Brunéi"
    },
    {
        "id_nacion" : 11,
        "nombre" : "Bulgaria"
    },
    {
        "id_nacion" : 156,
        "nombre" : "Burkina Faso"
    },
    {
        "id_nacion" : 157,
        "nombre" : "Burundi"
    },
    {
        "id_nacion" : 152,
        "nombre" : "Bután"
    },
    {
        "id_nacion" : 159,
        "nombre" : "Cabo Verde"
    },
    {
        "id_nacion" : 158,
        "nombre" : "Camboya"
    },
    {
        "id_nacion" : 31,
        "nombre" : "Camerún"
    },
    {
        "id_nacion" : 32,
        "nombre" : "Canadá"
    },
    {
        "id_nacion" : 130,
        "nombre" : "Chad"
    },
    {
        "id_nacion" : 81,
        "nombre" : "Chile"
    },
    {
        "id_nacion" : 35,
        "nombre" : "China"
    },
    {
        "id_nacion" : 33,
        "nombre" : "Chipre"
    },
    {
        "id_nacion" : 82,
        "nombre" : "Colombia"
    },
    {
        "id_nacion" : 164,
        "nombre" : "Comores"
    },
    {
        "id_nacion" : 112,
        "nombre" : "Congo (Brazzaville)"
    },
    {
        "id_nacion" : 165,
        "nombre" : "Congo (Kinshasa)"
    },
    {
        "id_nacion" : 166,
        "nombre" : "Cook, Islas"
    },
    {
        "id_nacion" : 84,
        "nombre" : "Corea del Norte"
    },
    {
        "id_nacion" : 69,
        "nombre" : "Corea del Sur"
    },
    {
        "id_nacion" : 168,
        "nombre" : "Costa de Marfil"
    },
    {
        "id_nacion" : 36,
        "nombre" : "Costa Rica"
    },
    {
        "id_nacion" : 71,
        "nombre" : "Croacia"
    },
    {
        "id_nacion" : 113,
        "nombre" : "Cuba"
    },
    {
        "id_nacion" : 22,
        "nombre" : "Dinamarca"
    },
    {
        "id_nacion" : 169,
        "nombre" : "Djibouti, Yibuti"
    },
    {
        "id_nacion" : 103,
        "nombre" : "Ecuador"
    },
    {
        "id_nacion" : 23,
        "nombre" : "Egipto"
    },
    {
        "id_nacion" : 51,
        "nombre" : "El Salvador"
    },
    {
        "id_nacion" : 93,
        "nombre" : "Emiratos Árabes Unidos"
    },
    {
        "id_nacion" : 173,
        "nombre" : "Eritrea"
    },
    {
        "id_nacion" : 52,
        "nombre" : "Eslovaquia"
    },
    {
        "id_nacion" : 53,
        "nombre" : "Eslovenia"
    },
    {
        "id_nacion" : 28,
        "nombre" : "España"
    },
    {
        "id_nacion" : 55,
        "nombre" : "Estados Unidos"
    },
    {
        "id_nacion" : 68,
        "nombre" : "Estonia"
    },
    {
        "id_nacion" : 121,
        "nombre" : "Etiopía"
    },
    {
        "id_nacion" : 175,
        "nombre" : "Feroe, Islas"
    },
    {
        "id_nacion" : 90,
        "nombre" : "Filipinas"
    },
    {
        "id_nacion" : 63,
        "nombre" : "Finlandia"
    },
    {
        "id_nacion" : 176,
        "nombre" : "Fiyi"
    },
    {
        "id_nacion" : 64,
        "nombre" : "Francia"
    },
    {
        "id_nacion" : 180,
        "nombre" : "Gabón"
    },
    {
        "id_nacion" : 181,
        "nombre" : "Gambia"
    },
    {
        "id_nacion" : 21,
        "nombre" : "Georgia"
    },
    {
        "id_nacion" : 105,
        "nombre" : "Ghana"
    },
    {
        "id_nacion" : 143,
        "nombre" : "Gibraltar"
    },
    {
        "id_nacion" : 184,
        "nombre" : "Granada"
    },
    {
        "id_nacion" : 20,
        "nombre" : "Grecia"
    },
    {
        "id_nacion" : 94,
        "nombre" : "Groenlandia"
    },
    {
        "id_nacion" : 17,
        "nombre" : "Guadalupe"
    },
    {
        "id_nacion" : 185,
        "nombre" : "Guatemala"
    },
    {
        "id_nacion" : 186,
        "nombre" : "Guernsey"
    },
    {
        "id_nacion" : 187,
        "nombre" : "Guinea"
    },
    {
        "id_nacion" : 172,
        "nombre" : "Guinea Ecuatorial"
    },
    {
        "id_nacion" : 188,
        "nombre" : "Guinea-Bissau"
    },
    {
        "id_nacion" : 189,
        "nombre" : "Guyana"
    },
    {
        "id_nacion" : 16,
        "nombre" : "Haiti"
    },
    {
        "id_nacion" : 137,
        "nombre" : "Honduras"
    },
    {
        "id_nacion" : 73,
        "nombre" : "Hong Kong"
    },
    {
        "id_nacion" : 14,
        "nombre" : "Hungría"
    },
    {
        "id_nacion" : 25,
        "nombre" : "India"
    },
    {
        "id_nacion" : 74,
        "nombre" : "Indonesia"
    },
    {
        "id_nacion" : 140,
        "nombre" : "Irak"
    },
    {
        "id_nacion" : 26,
        "nombre" : "Irán"
    },
    {
        "id_nacion" : 27,
        "nombre" : "Irlanda"
    },
    {
        "id_nacion" : 215,
        "nombre" : "Isla Pitcairn"
    },
    {
        "id_nacion" : 83,
        "nombre" : "Islandia"
    },
    {
        "id_nacion" : 228,
        "nombre" : "Islas Salomón"
    },
    {
        "id_nacion" : 58,
        "nombre" : "Islas Turcas y Caicos"
    },
    {
        "id_nacion" : 154,
        "nombre" : "Islas Virgenes Británicas"
    },
    {
        "id_nacion" : 24,
        "nombre" : "Israel"
    },
    {
        "id_nacion" : 29,
        "nombre" : "Italia"
    },
    {
        "id_nacion" : 132,
        "nombre" : "Jamaica"
    },
    {
        "id_nacion" : 70,
        "nombre" : "Japón"
    },
    {
        "id_nacion" : 193,
        "nombre" : "Jersey"
    },
    {
        "id_nacion" : 75,
        "nombre" : "Jordania"
    },
    {
        "id_nacion" : 30,
        "nombre" : "Kazajstán"
    },
    {
        "id_nacion" : 97,
        "nombre" : "Kenia"
    },
    {
        "id_nacion" : 34,
        "nombre" : "Kirguistán"
    },
    {
        "id_nacion" : 195,
        "nombre" : "Kiribati"
    },
    {
        "id_nacion" : 37,
        "nombre" : "Kuwait"
    },
    {
        "id_nacion" : 196,
        "nombre" : "Laos"
    },
    {
        "id_nacion" : 197,
        "nombre" : "Lesotho"
    },
    {
        "id_nacion" : 38,
        "nombre" : "Letonia"
    },
    {
        "id_nacion" : 99,
        "nombre" : "Líbano"
    },
    {
        "id_nacion" : 198,
        "nombre" : "Liberia"
    },
    {
        "id_nacion" : 39,
        "nombre" : "Libia"
    },
    {
        "id_nacion" : 126,
        "nombre" : "Liechtenstein"
    },
    {
        "id_nacion" : 40,
        "nombre" : "Lituania"
    },
    {
        "id_nacion" : 41,
        "nombre" : "Luxemburgo"
    },
    {
        "id_nacion" : 85,
        "nombre" : "Macedonia"
    },
    {
        "id_nacion" : 134,
        "nombre" : "Madagascar"
    },
    {
        "id_nacion" : 76,
        "nombre" : "Malasia"
    },
    {
        "id_nacion" : 125,
        "nombre" : "Malawi"
    },
    {
        "id_nacion" : 200,
        "nombre" : "Maldivas"
    },
    {
        "id_nacion" : 133,
        "nombre" : "Malí"
    },
    {
        "id_nacion" : 86,
        "nombre" : "Malta"
    },
    {
        "id_nacion" : 131,
        "nombre" : "Man, Isla de"
    },
    {
        "id_nacion" : 104,
        "nombre" : "Marruecos"
    },
    {
        "id_nacion" : 201,
        "nombre" : "Martinica"
    },
    {
        "id_nacion" : 202,
        "nombre" : "Mauricio"
    },
    {
        "id_nacion" : 108,
        "nombre" : "Mauritania"
    },
    {
        "id_nacion" : 42,
        "nombre" : "México"
    },
    {
        "id_nacion" : 43,
        "nombre" : "Moldavia"
    },
    {
        "id_nacion" : 44,
        "nombre" : "Mónaco"
    },
    {
        "id_nacion" : 139,
        "nombre" : "Mongolia"
    },
    {
        "id_nacion" : 117,
        "nombre" : "Mozambique"
    },
    {
        "id_nacion" : 205,
        "nombre" : "Myanmar"
    },
    {
        "id_nacion" : 102,
        "nombre" : "Namibia"
    },
    {
        "id_nacion" : 206,
        "nombre" : "Nauru"
    },
    {
        "id_nacion" : 107,
        "nombre" : "Nepal"
    },
    {
        "id_nacion" : 209,
        "nombre" : "Nicaragua"
    },
    {
        "id_nacion" : 210,
        "nombre" : "Níger"
    },
    {
        "id_nacion" : 115,
        "nombre" : "Nigeria"
    },
    {
        "id_nacion" : 212,
        "nombre" : "Norfolk Island"
    },
    {
        "id_nacion" : 46,
        "nombre" : "Noruega"
    },
    {
        "id_nacion" : 208,
        "nombre" : "Nueva Caledonia"
    },
    {
        "id_nacion" : 45,
        "nombre" : "Nueva Zelanda"
    },
    {
        "id_nacion" : 213,
        "nombre" : "Omán"
    },
    {
        "id_nacion" : 19,
        "nombre" : "Países Bajos, Holanda"
    },
    {
        "id_nacion" : 87,
        "nombre" : "Pakistán"
    },
    {
        "id_nacion" : 124,
        "nombre" : "Panamá"
    },
    {
        "id_nacion" : 88,
        "nombre" : "Papúa-Nueva Guinea"
    },
    {
        "id_nacion" : 110,
        "nombre" : "Paraguay"
    },
    {
        "id_nacion" : 89,
        "nombre" : "Perú"
    },
    {
        "id_nacion" : 178,
        "nombre" : "Polinesia Francesa"
    },
    {
        "id_nacion" : 47,
        "nombre" : "Polonia"
    },
    {
        "id_nacion" : 48,
        "nombre" : "Portugal"
    },
    {
        "id_nacion" : 246,
        "nombre" : "Puerto Rico"
    },
    {
        "id_nacion" : 216,
        "nombre" : "Qatar"
    },
    {
        "id_nacion" : 13,
        "nombre" : "Reino Unido"
    },
    {
        "id_nacion" : 65,
        "nombre" : "República Checa"
    },
    {
        "id_nacion" : 138,
        "nombre" : "República Dominicana"
    },
    {
        "id_nacion" : 49,
        "nombre" : "Reunión"
    },
    {
        "id_nacion" : 217,
        "nombre" : "Ruanda"
    },
    {
        "id_nacion" : 72,
        "nombre" : "Rumanía"
    },
    {
        "id_nacion" : 50,
        "nombre" : "Rusia"
    },
    {
        "id_nacion" : 242,
        "nombre" : "Sáhara Occidental"
    },
    {
        "id_nacion" : 223,
        "nombre" : "Samoa"
    },
    {
        "id_nacion" : 219,
        "nombre" : "San Cristobal y Nevis"
    },
    {
        "id_nacion" : 224,
        "nombre" : "San Marino"
    },
    {
        "id_nacion" : 221,
        "nombre" : "San Pedro y Miquelón"
    },
    {
        "id_nacion" : 225,
        "nombre" : "San Tomé y Príncipe"
    },
    {
        "id_nacion" : 222,
        "nombre" : "San Vincente y Granadinas"
    },
    {
        "id_nacion" : 218,
        "nombre" : "Santa Elena"
    },
    {
        "id_nacion" : 220,
        "nombre" : "Santa Lucía"
    },
    {
        "id_nacion" : 135,
        "nombre" : "Senegal"
    },
    {
        "id_nacion" : 226,
        "nombre" : "Serbia y Montenegro"
    },
    {
        "id_nacion" : 109,
        "nombre" : "Seychelles"
    },
    {
        "id_nacion" : 227,
        "nombre" : "Sierra Leona"
    },
    {
        "id_nacion" : 77,
        "nombre" : "Singapur"
    },
    {
        "id_nacion" : 106,
        "nombre" : "Siria"
    },
    {
        "id_nacion" : 229,
        "nombre" : "Somalia"
    },
    {
        "id_nacion" : 120,
        "nombre" : "Sri Lanka"
    },
    {
        "id_nacion" : 141,
        "nombre" : "Sudáfrica"
    },
    {
        "id_nacion" : 232,
        "nombre" : "Sudán"
    },
    {
        "id_nacion" : 67,
        "nombre" : "Suecia"
    },
    {
        "id_nacion" : 66,
        "nombre" : "Suiza"
    },
    {
        "id_nacion" : 54,
        "nombre" : "Surinam"
    },
    {
        "id_nacion" : 234,
        "nombre" : "Swazilandia"
    },
    {
        "id_nacion" : 56,
        "nombre" : "Tadjikistan"
    },
    {
        "id_nacion" : 92,
        "nombre" : "Tailandia"
    },
    {
        "id_nacion" : 78,
        "nombre" : "Taiwan"
    },
    {
        "id_nacion" : 101,
        "nombre" : "Tanzania"
    },
    {
        "id_nacion" : 171,
        "nombre" : "Timor Oriental"
    },
    {
        "id_nacion" : 136,
        "nombre" : "Togo"
    },
    {
        "id_nacion" : 235,
        "nombre" : "Tokelau"
    },
    {
        "id_nacion" : 236,
        "nombre" : "Tonga"
    },
    {
        "id_nacion" : 237,
        "nombre" : "Trinidad y Tobago"
    },
    {
        "id_nacion" : 122,
        "nombre" : "Túnez"
    },
    {
        "id_nacion" : 57,
        "nombre" : "Turkmenistan"
    },
    {
        "id_nacion" : 59,
        "nombre" : "Turquía"
    },
    {
        "id_nacion" : 239,
        "nombre" : "Tuvalu"
    },
    {
        "id_nacion" : 62,
        "nombre" : "Ucrania"
    },
    {
        "id_nacion" : 60,
        "nombre" : "Uganda"
    },
    {
        "id_nacion" : 111,
        "nombre" : "Uruguay"
    },
    {
        "id_nacion" : 61,
        "nombre" : "Uzbekistán"
    },
    {
        "id_nacion" : 240,
        "nombre" : "Vanuatu"
    },
    {
        "id_nacion" : 95,
        "nombre" : "Venezuela"
    },
    {
        "id_nacion" : 15,
        "nombre" : "Vietnam"
    },
    {
        "id_nacion" : 241,
        "nombre" : "Wallis y Futuna"
    },
    {
        "id_nacion" : 243,
        "nombre" : "Yemen"
    },
    {
        "id_nacion" : 116,
        "nombre" : "Zambia"
    },
    {
        "id_nacion" : 96,
        "nombre" : "Zimbabwe"
    }
]