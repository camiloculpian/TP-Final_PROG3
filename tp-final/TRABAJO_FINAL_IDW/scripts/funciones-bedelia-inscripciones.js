function llenar_selector_carreras(){
    let ListaDeCarreras = JSON.parse(localStorage.getItem('ListaDeCarreras'));
    if (ListaDeCarreras == null){
        ListaDeCarreras = [];
    }
    const $selectorCarrerasDinamico = document.getElementById("SELECT-CARRERA");
    ListaDeCarreras.forEach(element => {
        const $option = document.createElement("option");
        $option.setAttribute('value', element['id_carrera']);
        $option.textContent = element['nombre'];
        $selectorCarrerasDinamico.appendChild($option);
    })
    $selectorCarrerasDinamico.addEventListener('change', listar_materias_de_carrera_seleccionada);
    $selectorCarrerasDinamico.setAttribute('selected', '')
}

function listar_materias_de_carrera_seleccionada(e){

    var node_3 = document.createElement('TABLE');
    node_3.setAttribute('id', 'tabla-listado-de-materias');

    var node_4 = document.createElement('THEAD');
    node_3.appendChild(node_4);

    var node_5 = document.createElement('TR');
    node_4.appendChild(node_5);

    var node_6 = document.createElement('TH');
    node_5.appendChild(node_6);
    var node_6_1 = document.createTextNode('Nombre de la Materia');
    node_6.appendChild(node_6_1);

    var node_7 = document.createElement('TH');
    node_5.appendChild(node_7);
    var node_7_1 = document.createTextNode('Tipo');
    node_7.appendChild(node_7_1);

    var node_8 = document.createElement('TH');
    node_5.appendChild(node_8);
    var node_8_1 = document.createTextNode('Hs. Semanales');
    node_8.appendChild(node_8_1);

    var node_9 = document.createElement('TH');
    node_5.appendChild(node_9);
    var node_9_1 = document.createTextNode('Cuatrimestre');
    node_9.appendChild(node_9_1);

    var node_10 = document.createElement('TH');
    node_5.appendChild(node_10);
    let checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox');
    var node_10_1 = document.createTextNode('');
    node_10.appendChild(checkbox);
    // var node_10_1 = document.createTextNode('');
    // node_10.appendChild(node_10_1);
    
    let ListaDeMaterias = JSON.parse(localStorage.getItem('ListaDeMaterias'));
    if (ListaDeMaterias == null){
        ListaDeMaterias = [];
    }
    ListaDeMaterias.forEach(element => {

        if(element['id_carrera'] == e.target.value){
            let tr = document.createElement("tr");
            for (let campo in element){
                if (campo!="id_materia"){
                    if (campo!="id_carrera"){
                        let td = document.createElement("td");
                        td.textContent = element[campo];
                        tr.appendChild(td);
                    }
                }else{
                    tr.id = "id_materia:"+element[campo];
                }
            }
            if(element['tipo'] == 'Anual')
            {
                let td = document.createElement("td");
                td.textContent ='1º Cuatrimestre';
                tr.appendChild(td);
            }else
            {
                if(inscripto(element['id_materia'],parseInt(document.getElementById('id_estudiante').innerText))){
                    let td = document.createElement("td");
                    td.textContent = obtener_cuatrimestre_inscripto(element['id_materia'],parseInt(document.getElementById('id_estudiante').innerText));
                    tr.appendChild(td);
                }else{
                    let td = document.createElement("td");
                    let selector = document.createElement('select');
                    let option = document.createElement("option");
                    option.setAttribute('value', '1º Cuatrimestre');
                    option.textContent = '1º Cuatrimestre';
                    selector.appendChild(option);
                    option = document.createElement("option");
                    option.setAttribute('value', '2º Cuatrimestre');
                    option.textContent = '2º Cuatrimestre';
                    selector.appendChild(option);
                    td.appendChild(selector);
                    tr.appendChild(td);
                }
            }
            td = document.createElement("td");
            //si no esta inscripto implementar chequear inscripto o algo
            if(inscripto(element['id_materia'],parseInt(document.getElementById('id_estudiante').innerText))){
                var node_10_1 = document.createTextNode('Inscripto');
                td.appendChild(node_10_1);
            }else{
                let checkbox = document.createElement('input');
                checkbox.setAttribute('type', 'checkbox');
                td.appendChild(checkbox);
            }
            //si no esta inscripto
            tr.appendChild(td);
            node_3.appendChild(tr);
        }
    });

    var contenedor = document.getElementById('listado-de-materias');
    while (contenedor.firstChild) {
        contenedor.removeChild(contenedor.firstChild);
    }
    contenedor.appendChild(node_3);
}

function realizar_inscripcion(e){
    e.preventDefault();
    //console.log(document.getElementById('tabla-listado-de-materias'));
    var grid = document.getElementById("tabla-listado-de-materias");
    var checkBoxes = grid.getElementsByTagName("input");
    for (var i = 0; i < checkBoxes.length; i++) {
        if (checkBoxes[i].checked) {
            var row = checkBoxes[i].parentNode.parentNode;
            if(row.children[3].children.length > 0){
                var cuatrimestre = row.children[3].childNodes[0].options[row.children[3].childNodes[0].selectedIndex].value;
            }else{
                var cuatrimestre = row.children[3].textContent;
            }
            if(row.id.split(':')[1]){
                console.log('Inscribiendo: ');
                console.log('id_materia : '+row.id.split(':')[1]);
                console.log('id_estudiante : '+parseInt(document.getElementById('id_estudiante').innerText));
                console.log('cuatrimestre : '+cuatrimestre);
                inscribir(parseInt(row.id.split(':')[1]), parseInt(document.getElementById('id_estudiante').innerText), cuatrimestre);
            }
        }
    }
    // Accedo a un elemento del DOM
    var elemento = document.getElementById('SELECT-CARRERA');
    // Disparo el evento personalizado
    elemento.dispatchEvent(new Event('change'));

}


function buscar_estudiante(){
    const ListaDeEstudiantes = JSON.parse(localStorage.getItem('ListaDeEstudiantes'));
    if (ListaDeEstudiantes == null){
        ListaDeEstudiantes = [];
    }
    if (document.getElementById("VALOR_DE_BUSQUEDA")?.value.trim() !== '') {
        ListaDeEstudiantes.forEach(element => {
            if (element['dni'] == document.getElementById("VALOR_DE_BUSQUEDA")?.value.trim()){
                console.log(element['id_estudiante']);
                
                var node_9 = document.createElement('TABLE');
                node_9.setAttribute('id', 'TABLA_DE_ESTUDIANTE');

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
                node_16.setAttribute('id', 'DATOS DEL ESTUDIANTE');
                node_9.appendChild(node_16);

                var $tr = document.createElement("tr");

                var $td = document.createElement("td");
                $td.setAttribute('id', 'id_estudiante')
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

                node_16.appendChild($tr);

                var div_estudiante = document.getElementById("estudiante");
                while (div_estudiante.firstChild) {
                    div_estudiante.removeChild(div_estudiante.firstChild);
                }

                div_estudiante.appendChild(node_9);
                document.getElementById('SELECT-CARRERA').removeAttribute('disabled','');

                // Accedo a un elemento del DOM
                var elemento = document.getElementById('SELECT-CARRERA');
                // Disparo el evento personalizado
                elemento.dispatchEvent(new Event('change'));

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
                cargar_datos_estudiante($tr.cells[0].textContent);
                cerrar_modal();
            }
            listadoEstudiantesDinamico.appendChild($tr);
        }
    });
}

function cargar_datos_estudiante(id_estudiante){
    const ListaDeEstudiantes = JSON.parse(localStorage.getItem('ListaDeEstudiantes'));
    if (ListaDeEstudiantes == null){
        ListaDeEstudiantes = [];
    }
    ListaDeEstudiantes.forEach(element => {
        if (element['id_estudiante'] == id_estudiante){
            var node_9 = document.createElement('TABLE');
            node_9.setAttribute('id', 'TABLA_DE_ESTUDIANTE');

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
            node_16.setAttribute('id', 'DATOS DEL ESTUDIANTE');
            node_9.appendChild(node_16);

            var $tr = document.createElement("tr");

            var $td = document.createElement("td");
            $td.setAttribute('id', 'id_estudiante')
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

            node_16.appendChild($tr);

            var div_estudiante = document.getElementById("estudiante");
            while (div_estudiante.firstChild) {
                div_estudiante.removeChild(div_estudiante.firstChild);
            }

            div_estudiante.appendChild(node_9);
            document.getElementById('SELECT-CARRERA').removeAttribute('disabled','');
            // Accedo a un elemento del DOM
            var elemento = document.getElementById('SELECT-CARRERA');
            // Disparo el evento personalizado
            elemento.dispatchEvent(new Event('change'));

        }
    })
}

function inscripto(id_materia, id_estudiante){
    console.log('function inscripto(id_materia, id_estudiante)');
    var i = false;
    var ListaDeInscripciones = JSON.parse(localStorage.getItem('ListaDeInscripciones'));
    if (ListaDeInscripciones == null){
        ListaDeInscripciones = [];
    }
    ListaDeInscripciones.forEach(element => {
        if(parseInt(element['id_materia']) == parseInt(id_materia) && parseInt(element['id_estudiante']) == parseInt(id_estudiante)){
            i = true;
        }
    })
    return i;
}

function obtener_cuatrimestre_inscripto(id_materia, id_estudiante){
    var c = '';
    var ListaDeInscripciones = JSON.parse(localStorage.getItem('ListaDeInscripciones'));
    if (ListaDeInscripciones == null){
        ListaDeInscripciones = [];
    }
    ListaDeInscripciones.forEach(element => {
        if(parseInt(element['id_materia']) == parseInt(id_materia) && parseInt(element['id_estudiante']) == parseInt(id_estudiante)){
            c = element['cuatrimestre'];
        }
    })
    return c;
}

function inscribir(id_materia, id_estudiante, cuatrimestre){
    let ListaDeInscripciones = JSON.parse(localStorage.getItem('ListaDeInscripciones'));
    if (ListaDeInscripciones == null){
        ListaDeInscripciones = [];
    }
    let NuevaInscripcion = {
        id_inscripcion : obtener_next_id(),
        id_materia: id_materia,
        id_estudiante : id_estudiante,
        cuatrimestre: cuatrimestre
    };
    ListaDeInscripciones.push(NuevaInscripcion);
    localStorage.setItem('ListaDeInscripciones', JSON.stringify(ListaDeInscripciones));
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

function cerrar_modal(){
    var contenedor_modal = document.getElementById("contenedor-modal");
    while (contenedor_modal.firstChild) {
        contenedor_modal.removeChild(contenedor_modal.firstChild);
    }
}