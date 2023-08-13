function agregar_materia(){
    let ListaDeMaterias = JSON.parse(localStorage.getItem('ListaDeMaterias'));
    if (ListaDeMaterias == null){
        ListaDeMaterias = [];
    }
    let NuevaMateria = {
        id_materia : obtener_next_id(),
        nombre: document.querySelector('#NOMBRE').value,
        tipo: document.querySelector('#TIPO_MATERIA').value,
        hs_semanales: document.querySelector('#HS_SEMANALES').value,
        id_carrera: document.querySelector('#CARRERA').value,
    };
    ListaDeMaterias.push(NuevaMateria);
    localStorage.setItem('ListaDeMaterias', JSON.stringify(ListaDeMaterias));

    document.querySelector('#NOMBRE').value = null;
    document.querySelector('#HS_SEMANALES').value = null;
    document.querySelector('#CARRERA').value = null;
    /*TENGO QUE MOSTRAR UN DIALOGO DE ok! */
}

function obtener_next_id(){
    let ListaDeMaterias = JSON.parse(localStorage.getItem('ListaDeMaterias'));
    let next_id = 0;
    if (ListaDeMaterias == null){
        ListaDeMaterias = [];
    }
    ListaDeMaterias.forEach(element => {
        if(parseInt(element['id_materia'],10)>next_id){next_id=parseInt(element['id_materia'],10)}
    })
    next_id++;
    return next_id;
}

function listar_materias(){
    let ListaDeMaterias = JSON.parse(localStorage.getItem('ListaDeMaterias'));
    if (ListaDeMaterias == null){
        ListaDeMaterias = [];
    }
    ListaDeMaterias.forEach(element => {
        let tr = document.createElement("tr");
        for (let campo in element){
            if (campo!="id_materia"){
                if (campo!="id_carrera"){
                    let td = document.createElement("td");
                    td.textContent = element[campo];
                    tr.appendChild(td);
                }
            }else{
                tr.id = "id_materia : "+element[campo];
            }
        }
        var btn = document.createElement("button");
        btn.addEventListener('click', editar_materia);
        btn.setAttribute('class', 'boton-editar');
        tr.appendChild(btn);
        var btn2 =  document.createElement("button");
        btn2.addEventListener('click', eliminar_materia);
        btn2.setAttribute('class', 'boton-eliminar');
        tr.appendChild(btn2);
        const listadoMateriasDinamico = document.getElementById("LISTADO_MATERIAS_ID_CARRERA:"+element['id_carrera']);
        listadoMateriasDinamico?.appendChild(tr);
    });
}

function buscar_materia(e){
    e.preventDefault();
    console.log('function buscar_materia()');
    let ListaDeMaterias = JSON.parse(localStorage.getItem('ListaDeMaterias'));
    if (ListaDeMaterias == null){
        ListaDeMaterias = [];
    }
    var id_materia = null;
    ListaDeMaterias.forEach(element => {
        if(element['id_carrera'] == parseInt(document.querySelector('#CARRERA').value) && element['nombre'] == document.querySelector('#NOMBRE-MATERIA').value){
            id_materia = element['id_materia'];
            shouldSkip = true;
            return;
        }
    });
    if (id_materia){
        let ListaDeEstudiantes = JSON.parse(localStorage.getItem('ListaDeEstudiantes'));
        if (ListaDeEstudiantes == null){
            ListaDeEstudiantes = [];
        } 
        // El Encabezado
        var node_8 = document.createElement('h3');
        node_8.innerText = 'Estudiantes Matriculados en la Materia';

        var node_9 = document.createElement('TABLE');
        node_9.setAttribute('id', 'TABLA_DE_ESTUDIANTES:'+id_materia);

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

        var node_16 = document.createElement('TH');
        node_11.appendChild(node_16);

        ListaDeEstudiantes.forEach(element => {
            // console.log('')
            if (inscripto(element['id_estudiante'], id_materia, document.querySelector('#CUATRIMESTRE-MATERIA').value)){
                // La Lista
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

                var btn2 =  document.createElement("button");
                btn2.addEventListener('click', eliminar_inscripcion);
                btn2.setAttribute('class', 'boton-eliminar');
                $tr.appendChild(btn2);

                node_9.appendChild($tr);
            }
        });
        let tabla_de_estudiantes = document.getElementById('TABLA-ESTUDIANTES-INSCRIPTOS');
        while (tabla_de_estudiantes.firstChild) {
            tabla_de_estudiantes.removeChild(tabla_de_estudiantes.firstChild);
        }
        tabla_de_estudiantes.appendChild(node_8);
        tabla_de_estudiantes.appendChild(node_9);
    }else{
        let tabla_de_estudiantes = document.getElementById('TABLA-ESTUDIANTES-INSCRIPTOS');
        while (tabla_de_estudiantes.firstChild) {
            tabla_de_estudiantes.removeChild(tabla_de_estudiantes.firstChild);
        }
        let h3 = document.createElement('h3');
        h3.innerText = 'No se encontro la materia solicitada...'
        tabla_de_estudiantes.appendChild(h3);

    }
}

function llenar_selector_carreras(){
    let ListaDeCarreras = JSON.parse(localStorage.getItem('ListaDeCarreras'));
    if (ListaDeCarreras == null){
        ListaDeCarreras = [];
    }
    const $selectorCarrerasDinamico = document.querySelector("#CARRERA");
    ListaDeCarreras.forEach(element => {
        const $option = document.createElement("option");
        $option.setAttribute('value', element['id_carrera']);
        $option.textContent = element['nombre'];
        $selectorCarrerasDinamico.appendChild($option);
    });
}

function editar_materia(e){
    e.preventDefault()
    console.log(e.target.parentElement.id.split(':')[1]);
    e.target.parentElement.setAttribute('class', 'celda-editable');
    e.target.parentElement.children[0].setAttribute('contenteditable', 'true');
    e.target.parentElement.children[0].focus();
    //e.target.parentElement.children[1].setAttribute('contenteditable', 'true');
    e.target.parentElement.children[2].setAttribute('contenteditable', 'true');
    e.target.parentElement.removeChild(e.target.parentElement.children[4]);
    let button = document.createElement('button');
    button.setAttribute('class', 'boton-guardar');
    button.addEventListener('click', guardar_editar_materia);
    e.target.parentElement.appendChild(button);
    e.target.parentElement.removeChild(e.target.parentElement.children[3]);

}

function eliminar_materia(e){
    e.preventDefault();
    let quiero_borrar = confirm("Seguro que queres borrar esta la materia?");
    if (quiero_borrar)
    {
        // borrar todas las inscripciones a la materia
        let ListaDeInscripciones = JSON.parse(localStorage.getItem('ListaDeInscripciones'));
        if (ListaDeInscripciones == null){
            ListaDeInscripciones = [];
        }
        ListaDeInscripciones = ListaDeInscripciones.filter(element => element['id_materia'] != parseInt(e.target.parentElement.id.split(':')[1]));

        localStorage.setItem('ListaDeInscripciones', JSON.stringify(ListaDeInscripciones));
        // borrar la materia
        let ListaDeMaterias = JSON.parse(localStorage.getItem('ListaDeMaterias'));
        if (ListaDeMaterias == null){
            ListaDeMaterias = [];
        }
        ListaDeMaterias = ListaDeMaterias.filter(element => element['id_materia'] != parseInt(e.target.parentElement.id.split(':')[1]));
        localStorage.setItem('ListaDeMaterias', JSON.stringify(ListaDeMaterias));
        e.target.parentElement.parentElement.removeChild(e.target.parentElement);
        console.log(e.target.parentElement);
        // /refrescar la lista de materias o sacar la fila de la tabla
    }
}

function eliminar_inscripcion(e){
    e.preventDefault();
    let quiero_borrar = confirm("Seguro que queres borrar la matriculación de este estudiante a la Materia?");
    if (quiero_borrar)
    {
        let ListaDeInscripciones = JSON.parse(localStorage.getItem('ListaDeInscripciones'));
        if (ListaDeInscripciones == null){
            ListaDeInscripciones = [];
        }
        ListaDeInscripciones = ListaDeInscripciones.filter(element => !(element['id_materia'] == parseInt(e.target.parentElement.parentElement.id.split(':')[1]) && element['id_estudiante'] == parseInt(e.target.parentElement.cells[0].textContent)));
        localStorage.setItem('ListaDeInscripciones', JSON.stringify(ListaDeInscripciones));
        e.target.parentElement.parentElement.removeChild(e.target.parentElement);
    }
}

function inscripto(id_estudiante, id_materia, cuatrimestre){
    console.log('function inscripto(id_materia, id_estudiante)');
    var i = false;
    var ListaDeInscripciones = JSON.parse(localStorage.getItem('ListaDeInscripciones'));
    if (ListaDeInscripciones == null){
        ListaDeInscripciones = [];
    }
    ListaDeInscripciones.forEach(element => {
        if(parseInt(element['id_materia']) == parseInt(id_materia) && parseInt(element['id_estudiante']) == parseInt(id_estudiante) && element['cuatrimestre'] == cuatrimestre){
            i = true;
        }
    })
    return i;
}

function guardar_editar_materia(e){
    e.preventDefault();
    let ListaDeMaterias = JSON.parse(localStorage.getItem('ListaDeMaterias'));
    if (ListaDeMaterias == null){
        ListaDeMaterias = [];
    }
    ListaDeMaterias.forEach(element => {
        if(element['id_materia'] == parseInt(e.target.parentElement.id.split(':')[1]))
        {
            element['nombre'] = e.target.parentElement.children[0].innerText;
            //element['tipo'] = e.target.parentElement.children[1].innerText;
            element['hs_semanales'] = e.target.parentElement.children[2].innerText;
        }
    });
    localStorage.setItem('ListaDeMaterias', JSON.stringify(ListaDeMaterias));
    e.target.parentElement.removeAttribute('class', 'celda-editable');
    e.target.parentElement.children[0].setAttribute('contenteditable', 'false');
    //e.target.parentElement.children[1].setAttribute('contenteditable', 'false');
    e.target.parentElement.children[2].setAttribute('contenteditable', 'false');
    var btn = document.createElement("button");
    btn.setAttribute('class', 'boton-editar');
    btn.addEventListener('click', editar_materia);
    var btn2 =  document.createElement("button");
    btn2.setAttribute('class', 'boton-eliminar');
    btn2.addEventListener('click', eliminar_materia);
    e.target.parentElement.appendChild(btn);
    e.target.parentElement.appendChild(btn2);
    e.target.parentElement.removeChild(e.target.parentElement.children[3]);
}