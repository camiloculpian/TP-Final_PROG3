window.onload = function() {
    document.getElementById('registrar_estudiante').addEventListener("click", registrar_estudiante);
    document.getElementById('editar_estudiante').addEventListener("click", editar_estudiante);
    document.getElementById('eliminar_estudiante').addEventListener("click", eliminar_estudiante);
    document.getElementById('listar_estudiantes').addEventListener("click", listar_estudiantes);

    document.getElementById('registrar_materia').addEventListener("click", registrar_materia);
    document.getElementById('listar_materias').addEventListener("click", listar_materias);
    document.getElementById('buscar_materia').addEventListener("click", buscar_materia);

    document.getElementById('registrar_carrera').addEventListener("click", registrar_carrera);
    document.getElementById('listar_carreras').addEventListener("click", listar_carreras);

    document.getElementById('inscribir_a_materia').addEventListener("click", inscribir_a_materia);
}

// // FUNCIONES DE MANEJO DE ESTUDIANTES
function registrar_estudiante(e){
    e.preventDefault();

    let node_1 = document.createElement('DIV');
    node_1.setAttribute('class', 'module-content');
    node_1.setAttribute('id', 'modulo_registrar_estudiante');

    let node_1_1 = document.createElement('FIELDSET');
    node_1.appendChild(node_1_1);

    let node_1_2 = document.createElement('LEGEND');
    node_1_2.textContent = 'Estudiantes -> Registrar Estudiante'
    node_1_1.appendChild(node_1_2);

    var node_2 = document.createElement('FORM');
    node_1_1.appendChild(node_2);

    var node_3 = document.createElement('DIV');
    node_3.setAttribute('class', 'data-line');
    node_2.appendChild(node_3);

    var node_4 = document.createElement('LABEL');
    node_4.setAttribute('class', 'data-title');
    node_4.setAttribute('for', 'APELLIDO');
    node_4.textContent = "Apellido:";
    node_3.appendChild(node_4);

    var node_5 = document.createElement('INPUT');
    node_5.setAttribute('name', 'APELLIDO');
    node_5.setAttribute('autofocus', '');
    node_5.setAttribute('required', '');
    node_5.setAttribute('class', 'data-entry');
    node_5.setAttribute('id', 'APELLIDO');
    node_5.setAttribute('placeholder', 'Ingrese el Apellido');
    node_3.appendChild(node_5);

    var node_6 = document.createElement('DIV');
    node_6.setAttribute('class', 'data-line');
    node_2.appendChild(node_6);

    var node_7 = document.createElement('LABEL');
    node_7.setAttribute('class', 'data-title');
    node_7.setAttribute('for', 'NOMBRE');
    node_7.textContent = "Nombres:"
    node_6.appendChild(node_7);

    var node_8 = document.createElement('INPUT');
    node_8.setAttribute('name', 'NOMBRE');
    node_8.setAttribute('required', '');
    node_8.setAttribute('class', 'data-entry');
    node_8.setAttribute('id', 'NOMBRE');
    node_8.setAttribute('placeholder', 'Ingrese el Nombre');
    node_6.appendChild(node_8);

    var node_9 = document.createElement('DIV');
    node_9.setAttribute('class', 'data-line');
    node_2.appendChild(node_9);

    var node_10 = document.createElement('LABEL');
    node_10.setAttribute('class', 'data-title');
    node_10.setAttribute('for', 'DNI');
    node_10.textContent = "DNI:";
    node_9.appendChild(node_10);

    var node_11 = document.createElement('INPUT');
    node_11.setAttribute('name', 'DNI');
    node_11.setAttribute('required', '');
    node_11.setAttribute('maxlength', '9');
    node_11.setAttribute('minlength', '9');
    node_11.setAttribute('class', 'data-entry');
    node_11.setAttribute('id', 'DNI');
    node_11.setAttribute('placeholder', 'Ingrese el DNI');
    node_9.appendChild(node_11);

    var node_12 = document.createElement('DIV');
    node_12.setAttribute('class', 'data-line');
    node_2.appendChild(node_12);

    var node_13 = document.createElement('LABEL');
    node_13.setAttribute('class', 'data-title');
    node_13.setAttribute('for', 'FECHA_NACIMIENTO');
    node_13.textContent = "Fecha Nacimiento:";
    node_12.appendChild(node_13);

    var node_14 = document.createElement('INPUT');
    node_14.setAttribute('name', 'FECHA_NACIMIENTO');
    node_14.setAttribute('type', 'date');
    node_14.setAttribute('required', '');
    node_14.setAttribute('class', 'data-entry');
    node_14.setAttribute('id', 'FECHA_NACIMIENTO');
    node_14.setAttribute('placeholder', 'Ingrese la fecha de Nacimiento');
    node_12.appendChild(node_14);

    var node_15 = document.createElement('DIV');
    node_15.setAttribute('class', 'data-line');
    node_2.appendChild(node_15);

    var node_16 = document.createElement('LABEL');
    node_16.setAttribute('class', 'data-title');
    node_16.setAttribute('for', 'NACIONALIDAD');
    node_16.textContent = "Nacionalidad:";
    node_15.appendChild(node_16);

    var node_17 = document.createElement('SELECT');
    node_17.setAttribute('name', 'NACIONALIDAD');
    node_17.setAttribute('required', '');
    node_17.setAttribute('class', 'data-entry');
    node_17.setAttribute('id', 'NACIONALIDAD');
    node_15.appendChild(node_17);

    var node_18 = document.createElement('DIV');
    node_18.setAttribute('class', 'data-line');
    node_2.appendChild(node_18);

    var node_19 = document.createElement('LABEL');
    node_19.setAttribute('class', 'data-title');
    node_19.setAttribute('for', 'TELEFONO');
    node_19.textContent = 'Telefono:';
    node_18.appendChild(node_19);

    var node_20 = document.createElement('INPUT');
    node_20.setAttribute('name', 'TELEFONO');
    node_20.setAttribute('type', 'tel');
    node_20.setAttribute('required', '');
    node_20.setAttribute('class', 'data-entry');
    node_20.setAttribute('id', 'TELEFONO');
    node_20.setAttribute('placeholder', 'Ingrese el Telefono');
    node_18.appendChild(node_20);

    var node_21 = document.createElement('DIV');
    node_21.setAttribute('class', 'data-line');
    node_2.appendChild(node_21);

    var node_22 = document.createElement('LABEL');
    node_22.setAttribute('class', 'data-title');
    node_22.setAttribute('for', 'EMAIL');
    node_22.textContent = "e-m@il:";
    node_21.appendChild(node_22);

    var node_23 = document.createElement('INPUT');
    node_23.setAttribute('name', 'EMAIL');
    node_23.setAttribute('type', 'email');
    node_23.setAttribute('required', '');
    node_23.setAttribute('class', 'data-entry');
    node_23.setAttribute('id', 'EMAIL');
    node_23.setAttribute('placeholder', 'Ingrese el e-m@il');
    node_21.appendChild(node_23);

    var node_24 = document.createElement('DIV');
    node_2.appendChild(node_24);

    var node_25 = document.createElement('BUTTON');
    node_25.setAttribute('class', 'boton-comun');
    node_25.setAttribute('id', 'agregar-estudiante');
    node_25.setAttribute('type', 'button');
    node_25.textContent = "Aceptar";
    node_24.appendChild(node_25);

    var node_26 = document.createElement('SCRIPT');
    node_26.setAttribute('src', '/scripts/funciones-bedelia-estudiantes.js');
    node_26.setAttribute('onload', 'llenar_selector_nacionalidad(); document.getElementById("APELLIDO").focus(); document.getElementById("agregar-estudiante")?.addEventListener("click", agregar_estudiante);');
    node_1.appendChild(node_26);

    //var node_27 = document.createElement('DIV');
    //node_27.setAttribute('id', 'contenedor-modal-modulo');
    //document.getElementById('contenido_dinamico').appendChild(node_27);

    var contenedor = document.getElementById('contenido_dinamico');
    while (contenedor.firstChild) {
        contenedor.removeChild(contenedor.firstChild);
    }
    document.getElementById('contenido_dinamico').appendChild(node_1);
}

function editar_estudiante(e){
    e.preventDefault();

    var node_1 = document.createElement('DIV');
    node_1.setAttribute('class', 'module-content');
    node_1.setAttribute('id', 'modulo_editar_estudiante');

    var node_2 = document.createElement('FORM');
    node_1.appendChild(node_2);

    var node_3 = document.createElement('FIELDSET');
    node_2.appendChild(node_3);

    var node_4 = document.createElement('LEGEND');
    const node_4_1 = document.createTextNode('Estudiantes -> Editar Estudiante');
    node_4.appendChild(node_4_1);
    node_3.appendChild(node_4);

    var node_5 = document.createElement('DIV');
    node_5.setAttribute('class', 'data-line');
    node_3.appendChild(node_5);

    var node_6 = document.createElement('LABEL');
    node_6.setAttribute('class', 'data-title');
    node_6.setAttribute('for', 'VALOR_DE_BUSQUEDA');
    const node_6_1 = document.createTextNode('Buscar por DNI:');
    node_6.appendChild(node_6_1);
    node_5.appendChild(node_6);

    var node_7 = document.createElement('INPUT');
    node_7.setAttribute('name', 'VALOR_DE_BUSQUEDA');
    node_7.setAttribute('class', 'data-entry');
    node_7.setAttribute('id', 'VALOR_DE_BUSQUEDA');
    node_7.setAttribute('autofocus', '');
    node_7.setAttribute('maxlength', '9');
    node_7.setAttribute('placeholder', 'Ingrese DNI');
    node_5.appendChild(node_7);

    var node_8 = document.createElement('BUTTON');
    node_8.setAttribute('class', 'boton-buscar');
    node_8.setAttribute('id', 'buscar-estudiante');
    node_8.setAttribute('type', 'button');
    node_5.appendChild(node_8);

    var node_9 = document.createElement('VAR');
    node_9.setAttribute('id', 'ID_ESTUDIANTE');
    node_3.appendChild(node_9);

    var node_10 = document.createElement('DIV');
    node_10.setAttribute('class', 'data-line');
    node_3.appendChild(node_10);

    var node_11 = document.createElement('LABEL');
    node_11.setAttribute('class', 'data-title');
    node_11.setAttribute('for', 'APELLIDO');
    const node_11_1 = document.createTextNode('Apellido:');
    node_11.appendChild(node_11_1);
    node_10.appendChild(node_11);

    var node_12 = document.createElement('INPUT');
    node_12.setAttribute('name', 'APELLIDO');
    node_12.setAttribute('disabled', '');
    node_12.setAttribute('class', 'data-entry');
    node_12.setAttribute('id', 'APELLIDO');
    node_10.appendChild(node_12);

    var node_13 = document.createElement('DIV');
    node_13.setAttribute('class', 'data-line');
    node_3.appendChild(node_13);

    var node_14 = document.createElement('LABEL');
    node_14.setAttribute('class', 'data-title');
    node_14.setAttribute('for', 'NOMBRE');
    const node_14_1 = document.createTextNode('Nombre:');
    node_14.appendChild(node_14_1);
    node_13.appendChild(node_14);

    var node_15 = document.createElement('INPUT');
    node_15.setAttribute('name', 'NOMBRE');
    node_15.setAttribute('disabled', '');
    node_15.setAttribute('class', 'data-entry');
    node_15.setAttribute('id', 'NOMBRE');
    node_13.appendChild(node_15);

    var node_16 = document.createElement('DIV');
    node_16.setAttribute('class', 'data-line');
    node_3.appendChild(node_16);

    var node_17 = document.createElement('LABEL');
    node_17.setAttribute('class', 'data-title');
    node_17.setAttribute('for', 'DNI');
    const node_17_1 = document.createTextNode('DNI:');
    node_17.appendChild(node_17_1);
    node_16.appendChild(node_17);

    var node_18 = document.createElement('INPUT');
    node_18.setAttribute('name', 'DNI');
    node_18.setAttribute('disabled', '');
    node_18.setAttribute('class', 'data-entry');
    node_18.setAttribute('id', 'DNI');
    node_16.appendChild(node_18);

    var node_19 = document.createElement('DIV');
    node_19.setAttribute('class', 'data-line');
    node_3.appendChild(node_19);

    var node_20 = document.createElement('LABEL');
    node_20.setAttribute('class', 'data-title');
    node_20.setAttribute('for', 'FECHA_NACIMIENTO');
    const node_20_1 = document.createTextNode('Fecha de Nacimiento:');
    node_20.appendChild(node_20_1);
    node_19.appendChild(node_20);

    var node_21 = document.createElement('INPUT');
    node_21.setAttribute('name', 'FECHA_NACIMIENTO');
    node_21.setAttribute('disabled', '');
    node_21.setAttribute('type', 'date');
    node_21.setAttribute('class', 'data-entry');
    node_21.setAttribute('id', 'FECHA_NACIMIENTO');
    node_21.setAttribute('required', '');
    node_19.appendChild(node_21);

    var node_22 = document.createElement('DIV');
    node_22.setAttribute('class', 'data-line');
    node_3.appendChild(node_22);

    var node_23 = document.createElement('LABEL');
    node_23.setAttribute('class', 'data-title');
    node_23.setAttribute('for', 'NACIONALIDAD');
    const node_23_1 = document.createTextNode('Nacionalidad:');
    node_23.appendChild(node_23_1);
    node_22.appendChild(node_23);

    var node_24 = document.createElement('SELECT');
    node_24.setAttribute('name', 'NACIONALIDAD');
    node_24.setAttribute('disabled', '');
    node_24.setAttribute('class', 'data-entry');
    node_24.setAttribute('id', 'NACIONALIDAD');
    node_22.appendChild(node_24);

    var node_25 = document.createElement('DIV');
    node_25.setAttribute('class', 'data-line');
    node_3.appendChild(node_25);

    var node_26 = document.createElement('LABEL');
    node_26.setAttribute('class', 'data-title');
    node_26.setAttribute('for', 'TELEFONO');
    const node_26_1 = document.createTextNode('Telefono:');
    node_26.appendChild(node_26_1);
    node_25.appendChild(node_26);

    var node_27 = document.createElement('INPUT');
    node_27.setAttribute('name', 'TELEFONO');
    node_27.setAttribute('disabled', '');
    node_27.setAttribute('type', 'tel');
    node_27.setAttribute('class', 'data-entry');
    node_27.setAttribute('id', 'TELEFONO');
    node_25.appendChild(node_27);

    var node_28 = document.createElement('DIV');
    node_28.setAttribute('class', 'data-line');
    node_3.appendChild(node_28);

    var node_29 = document.createElement('LABEL');
    node_29.setAttribute('class', 'data-title');
    node_29.setAttribute('for', 'EMAIL');
    const node_29_1 = document.createTextNode('e-m@il:');
    node_29.appendChild(node_29_1);
    node_28.appendChild(node_29);

    var node_30 = document.createElement('INPUT');
    node_30.setAttribute('name', 'EMAIL');
    node_30.setAttribute('disabled', '');
    node_30.setAttribute('type', 'email');
    node_30.setAttribute('class', 'data-entry');
    node_30.setAttribute('id', 'EMAIL');
    node_28.appendChild(node_30);

    var node_31 = document.createElement('DIV');
    node_3.appendChild(node_31);

    var node_32 = document.createElement('BUTTON');
    node_32.setAttribute('class', 'boton-comun');
    node_32.setAttribute('id', 'editar-estudiante');
    node_32.setAttribute('type', 'button');
    const node_32_1 = document.createTextNode('Guardar');
    node_32.appendChild(node_32_1);
    node_31.appendChild(node_32);

    var node_33 = document.createElement('BUTTON');
    node_33.setAttribute('class', 'boton-comun');
    node_33.setAttribute('id', 'cancelar-editar-estudiante');
    //node_33.setAttribute('type', 'button');
    const node_33_1 = document.createTextNode('Cancelar:');
    node_33.appendChild(node_33_1);
    node_31.appendChild(node_33);

    var node_34 = document.createElement('SCRIPT');
    node_34.setAttribute('src', '/scripts/funciones-bedelia-estudiantes.js');
    node_34.setAttribute('onload', 'llenar_selector_nacionalidad(); document.getElementById("VALOR_DE_BUSQUEDA").focus(); document.getElementById("buscar-estudiante")?.addEventListener("click", buscar_estudiantes); document.getElementById("editar-estudiante")?.addEventListener("click", editar_estudiante);');
    node_1.appendChild(node_34);

    //var node_35 = document.createElement('DIV');
    //node_35.setAttribute('id', 'contenedor-modal-modulo');
    //document.getElementById('contenido_dinamico').appendChild(node_35);

    var contenedor = document.getElementById('contenido_dinamico');
    while (contenedor.firstChild) {
        contenedor.removeChild(contenedor.firstChild);
    }
    document.getElementById('contenido_dinamico').appendChild(node_1);
}

//FALTAN CAMBIAR innerHTML POR COMO VA....

function eliminar_estudiante(e){
    e.preventDefault();

    var node_1 = document.createElement('DIV');
    node_1.setAttribute('class', 'module-content');
    node_1.setAttribute('id', 'modulo_editar_estudiante');

    var node_2 = document.createElement('FORM');
    node_1.appendChild(node_2);

    var node_3 = document.createElement('FIELDSET');
    node_2.appendChild(node_3);

    var node_4 = document.createElement('LEGEND');
    const node_4_1 = document.createTextNode('Estudiantes -> Eliminar Estudiante');
    node_4.appendChild(node_4_1);
    node_3.appendChild(node_4);

    var node_5 = document.createElement('DIV');
    node_5.setAttribute('class', 'data-line');
    node_3.appendChild(node_5);

    var node_6 = document.createElement('LABEL');
    node_6.setAttribute('class', 'data-title');
    node_6.setAttribute('for', 'VALOR_DE_BUSQUEDA');
    const node_6_1 = document.createTextNode('Buscar por DNI:');
    node_6.appendChild(node_6_1);
    node_5.appendChild(node_6);

    var node_7 = document.createElement('INPUT');
    node_7.setAttribute('name', 'VALOR_DE_BUSQUEDA');
    node_7.setAttribute('class', 'data-entry');
    node_7.setAttribute('id', 'VALOR_DE_BUSQUEDA');
    node_7.setAttribute('autofocus', '');
    node_7.setAttribute('maxlength', '9');
    node_7.setAttribute('placeholder', 'Ingrese DNI');
    node_5.appendChild(node_7);

    var node_8 = document.createElement('BUTTON');
    node_8.setAttribute('class', 'boton-buscar');
    node_8.setAttribute('id', 'buscar-estudiante');
    node_8.setAttribute('type', 'button');
    node_5.appendChild(node_8);

    var node_9 = document.createElement('VAR');
    node_9.setAttribute('id', 'ID_ESTUDIANTE');
    node_3.appendChild(node_9);

    var node_10 = document.createElement('DIV');
    node_10.setAttribute('class', 'data-line');
    node_3.appendChild(node_10);

    var node_11 = document.createElement('LABEL');
    node_11.setAttribute('class', 'data-title');
    node_11.setAttribute('for', 'APELLIDO');
    const node_11_1 = document.createTextNode('Apellido:');
    node_11.appendChild(node_11_1);
    node_10.appendChild(node_11);

    var node_12 = document.createElement('INPUT');
    node_12.setAttribute('name', 'APELLIDO');
    node_12.setAttribute('disabled', '');
    node_12.setAttribute('class', 'data-entry');
    node_12.setAttribute('id', 'APELLIDO');
    node_10.appendChild(node_12);

    var node_13 = document.createElement('DIV');
    node_13.setAttribute('class', 'data-line');
    node_3.appendChild(node_13);

    var node_14 = document.createElement('LABEL');
    node_14.setAttribute('class', 'data-title');
    node_14.setAttribute('for', 'NOMBRE');
    const node_14_1 = document.createTextNode('Nombre:');
    node_14.appendChild(node_14_1);
    node_13.appendChild(node_14);

    var node_15 = document.createElement('INPUT');
    node_15.setAttribute('name', 'NOMBRE');
    node_15.setAttribute('disabled', '');
    node_15.setAttribute('class', 'data-entry');
    node_15.setAttribute('id', 'NOMBRE');
    node_13.appendChild(node_15);

    var node_16 = document.createElement('DIV');
    node_16.setAttribute('class', 'data-line');
    node_3.appendChild(node_16);

    var node_17 = document.createElement('LABEL');
    node_17.setAttribute('class', 'data-title');
    node_17.setAttribute('for', 'DNI');
    const node_17_1 = document.createTextNode('DNI:');
    node_17.appendChild(node_17_1);
    node_16.appendChild(node_17);

    var node_18 = document.createElement('INPUT');
    node_18.setAttribute('name', 'DNI');
    node_18.setAttribute('disabled', '');
    node_18.setAttribute('class', 'data-entry');
    node_18.setAttribute('id', 'DNI');
    node_16.appendChild(node_18);

    var node_19 = document.createElement('DIV');
    node_19.setAttribute('class', 'data-line');
    node_3.appendChild(node_19);

    var node_20 = document.createElement('LABEL');
    node_20.setAttribute('class', 'data-title');
    node_20.setAttribute('for', 'FECHA_NACIMIENTO');
    const node_20_1 = document.createTextNode('Fecha de Nacimiento:');
    node_20.appendChild(node_20_1);
    node_19.appendChild(node_20);

    var node_21 = document.createElement('INPUT');
    node_21.setAttribute('name', 'FECHA_NACIMIENTO');
    node_21.setAttribute('disabled', '');
    node_21.setAttribute('type', 'date');
    node_21.setAttribute('class', 'data-entry');
    node_21.setAttribute('id', 'FECHA_NACIMIENTO');
    node_21.setAttribute('required', '');
    node_19.appendChild(node_21);

    var node_22 = document.createElement('DIV');
    node_22.setAttribute('class', 'data-line');
    node_3.appendChild(node_22);

    var node_23 = document.createElement('LABEL');
    node_23.setAttribute('class', 'data-title');
    node_23.setAttribute('for', 'NACIONALIDAD');
    const node_23_1 = document.createTextNode('Nacionalidad:');
    node_23.appendChild(node_23_1);
    node_22.appendChild(node_23);

    var node_24 = document.createElement('SELECT');
    node_24.setAttribute('name', 'NACIONALIDAD');
    node_24.setAttribute('disabled', '');
    node_24.setAttribute('class', 'data-entry');
    node_24.setAttribute('id', 'NACIONALIDAD');
    node_22.appendChild(node_24);

    var node_25 = document.createElement('DIV');
    node_25.setAttribute('class', 'data-line');
    node_3.appendChild(node_25);

    var node_26 = document.createElement('LABEL');
    node_26.setAttribute('class', 'data-title');
    node_26.setAttribute('for', 'TELEFONO');
    const node_26_1 = document.createTextNode('Telefono:');
    node_26.appendChild(node_26_1);
    node_25.appendChild(node_26);

    var node_27 = document.createElement('INPUT');
    node_27.setAttribute('name', 'TELEFONO');
    node_27.setAttribute('disabled', '');
    node_27.setAttribute('type', 'tel');
    node_27.setAttribute('class', 'data-entry');
    node_27.setAttribute('id', 'TELEFONO');
    node_25.appendChild(node_27);

    var node_28 = document.createElement('DIV');
    node_28.setAttribute('class', 'data-line');
    node_3.appendChild(node_28);

    var node_29 = document.createElement('LABEL');
    node_29.setAttribute('class', 'data-title');
    node_29.setAttribute('for', 'EMAIL');
    const node_29_1 = document.createTextNode('e-m@il:');
    node_29.appendChild(node_29_1);
    node_28.appendChild(node_29);

    var node_30 = document.createElement('INPUT');
    node_30.setAttribute('name', 'EMAIL');
    node_30.setAttribute('disabled', '');
    node_30.setAttribute('type', 'email');
    node_30.setAttribute('class', 'data-entry');
    node_30.setAttribute('id', 'EMAIL');
    node_28.appendChild(node_30);

    var node_31 = document.createElement('DIV');
    node_3.appendChild(node_31);

    var node_32 = document.createElement('BUTTON');
    node_32.setAttribute('class', 'boton-comun');
    node_32.setAttribute('id', 'eliminar-estudiante');
    //node_32.setAttribute('type', 'button');
    const node_32_1 = document.createTextNode('Eliminar');
    node_32.appendChild(node_32_1);
    node_31.appendChild(node_32);

    var node_33 = document.createElement('BUTTON');
    node_33.setAttribute('class', 'boton-comun');
    node_33.setAttribute('id', 'cancelar-editar-estudiante');
    //node_33.setAttribute('type', 'button');
    const node_33_1 = document.createTextNode('Cancelar:');
    node_33.appendChild(node_33_1);
    node_31.appendChild(node_33);

    var node_34 = document.createElement('SCRIPT');
    node_34.setAttribute('src', '/scripts/funciones-bedelia-estudiantes.js');
    node_34.setAttribute('onload', 'llenar_selector_nacionalidad(); document.getElementById("VALOR_DE_BUSQUEDA").focus(); document.getElementById("buscar-estudiante")?.addEventListener("click", buscar_estudiantes); document.getElementById("eliminar-estudiante")?.addEventListener("click", eliminar_estudiante);');
    node_1.appendChild(node_34);

    //var node_35 = document.createElement('DIV');
    //node_35.setAttribute('id', 'contenedor-modal-modulo');
    //document.getElementById('contenido_dinamico').appendChild(node_35);

    var contenedor = document.getElementById('contenido_dinamico');
    while (contenedor.firstChild) {
        contenedor.removeChild(contenedor.firstChild);
    }
    document.getElementById('contenido_dinamico').appendChild(node_1);
}

function listar_estudiantes(e){
    e.preventDefault();

    var node_1 = document.createElement('DIV');
    node_1.setAttribute('class', 'module-content');
    node_1.setAttribute('id', 'modulo_registrar_estudiante');

    var form = document.createElement('FORM');
    node_1.appendChild(form);

    var fieldset = document.createElement('FIELDSET');
    form.appendChild(fieldset);

    var legend = document.createElement('LEGEND');
    legend.innerText = 'Carreras -> Listar Estudiantes'
    fieldset.appendChild(legend);

    var node_2 = document.createElement('DIV');
    fieldset.appendChild(node_2);

    var node_3 = document.createElement('TABLE');
    node_2.appendChild(node_3);

    var node_4 = document.createElement('THEAD');
    node_3.appendChild(node_4);

    var node_5 = document.createElement('TR');
    node_4.appendChild(node_5);

    var node_6 = document.createElement('TH');
    node_5.appendChild(node_6);
    var node_6_1 = document.createTextNode('Apellido');
    node_6.appendChild(node_6_1);

    var node_7 = document.createElement('TH');
    node_5.appendChild(node_7);
    var node_7_1 = document.createTextNode('Nombres');
    node_7.appendChild(node_7_1);

    var node_8 = document.createElement('TH');
    node_5.appendChild(node_8);
    var node_8_1 = document.createTextNode('DNI');
    node_8.appendChild(node_8_1);

    var node_9 = document.createElement('TH');
    node_5.appendChild(node_9);
    var node_9_1 = document.createTextNode('Fecha Nac.');
    node_9.appendChild(node_9_1);

    var node_10 = document.createElement('TH');
    node_5.appendChild(node_10);
    var node_10_1 = document.createTextNode('Nacionalidad');
    node_10.appendChild(node_10_1);

    var node_11 = document.createElement('TH');
    node_5.appendChild(node_11);
    var node_11_1 = document.createTextNode('Teléfono');
    node_11.appendChild(node_11_1);

    var node_12 = document.createElement('TH');
    node_5.appendChild(node_12);
    var node_12_1 = document.createTextNode('e-m@il');
    node_12.appendChild(node_12_1);

    var node_13 = document.createElement('TBODY');
    node_13.setAttribute('id', 'LISTADO_ESTUDIANTES_DINAMICO');
    node_3.appendChild(node_13);

    var node_14 = document.createElement('SCRIPT');
    node_14.setAttribute('src', '/scripts/funciones-bedelia-estudiantes.js');
    node_14.setAttribute('onload', 'listar_estudiantes()');
    node_1.appendChild(node_14);

    var contenedor = document.getElementById('contenido_dinamico');
    while (contenedor.firstChild) {
        contenedor.removeChild(contenedor.firstChild);
    }
    document.getElementById('contenido_dinamico').appendChild(node_1);
}

// FUNCIONES DE MANEJO DE MATERIAS
function registrar_materia(e){
    e.preventDefault();
    
    var node_1 = document.createElement('DIV');
    node_1.setAttribute('class', 'module-content');
    node_1.setAttribute('id', 'modulo_registrar_materia');

    var node_2 = document.createElement('FORM');
    node_1.appendChild(node_2);

    var node_3 = document.createElement('FIELDSET');
    node_2.appendChild(node_3);

    var node_4 = document.createElement('LEGEND');
    node_4.innerText = 'Materias -> Agregar Materia';
    node_3.appendChild(node_4);

    var node_5 = document.createElement('DIV');
    node_5.setAttribute('class', 'data-line');
    node_3.appendChild(node_5);

    var node_6 = document.createElement('LABEL');
    node_6.innerText = 'Nombre:';
    node_6.setAttribute('class', 'data-title');
    node_6.setAttribute('for', 'NOMBRE');
    node_5.appendChild(node_6);

    var node_7 = document.createElement('INPUT');
    node_7.setAttribute('name', 'NOMBRE_MATERIA');
    node_7.setAttribute('autofocus', '');
    node_7.setAttribute('required', '');
    node_7.setAttribute('class', 'data-entry');
    node_7.setAttribute('id', 'NOMBRE');
    node_5.appendChild(node_7);

    var node_8 = document.createElement('DIV');
    node_8.setAttribute('class', 'data-line');
    node_3.appendChild(node_8);

    var node_9 = document.createElement('LABEL');
    node_9.innerText = 'Tipo:';
    node_9.setAttribute('class', 'data-title');
    node_9.setAttribute('for', 'TIPO_MATERIA');
    node_8.appendChild(node_9);

    var node_10 = document.createElement('SELECT');
    node_10.setAttribute('name', 'TIPO_MATERIA');
    node_10.setAttribute('required', '');
    node_10.setAttribute('class', 'data-entry');
    node_10.setAttribute('id', 'TIPO_MATERIA');
    node_8.appendChild(node_10);

    var node_11 = document.createElement('OPTION');
    node_11.innerText = 'Cuatrimestral';
    node_10.appendChild(node_11);

    var node_12 = document.createElement('OPTION');
    node_12.innerText = 'Anual';
    node_10.appendChild(node_12);

    var node_13 = document.createElement('DIV');
    node_13.setAttribute('class', 'data-line');
    node_3.appendChild(node_13);

    var node_14 = document.createElement('LABEL');
    node_14.innerText = 'Hs. Semanales:';
    node_14.setAttribute('class', 'data-title');
    node_14.setAttribute('for', 'HS_SEMANALES');
    node_13.appendChild(node_14);

    var node_15 = document.createElement('INPUT');
    node_15.setAttribute('name', 'HS_SEMANALES');
    node_15.setAttribute('required', '');
    node_15.setAttribute('class', 'data-entry');
    node_15.setAttribute('id', 'HS_SEMANALES');
    node_13.appendChild(node_15);

    var node_16 = document.createElement('DIV');
    node_16.setAttribute('class', 'data-line');
    node_3.appendChild(node_16);

    var node_17 = document.createElement('LABEL');
    node_17.innerText = 'Carrera:';
    node_17.setAttribute('class', 'data-title');
    node_17.setAttribute('for', 'CARRERA');
    node_16.appendChild(node_17);

    var node_18 = document.createElement('SELECT');
    node_18.setAttribute('name', 'CARRERA');
    node_18.setAttribute('required', '');
    node_18.setAttribute('class', 'data-entry');
    node_18.setAttribute('id', 'CARRERA');
    node_16.appendChild(node_18);

    var node_19 = document.createElement('DIV');
    node_3.appendChild(node_19);

    var node_20 = document.createElement('BUTTON');
    node_20.innerText = 'Agregar';
    node_20.setAttribute('class', 'boton-comun');
    node_20.setAttribute('id', 'agregar-materia');
    node_19.appendChild(node_20);

    var node_21 = document.createElement('BUTTON');
    node_21.innerText = 'Cancelar';
    node_21.setAttribute('class', 'boton-comun');
    node_21.setAttribute('id', 'cancelar-agregar-materia');
    node_19.appendChild(node_21);

    var node_22 = document.createElement('SCRIPT');
    node_22.setAttribute('src', '/scripts/funciones-bedelia-materias.js');
    node_22.setAttribute('onload', 'llenar_selector_carreras(); document.getElementById(\'NOMBRE\').focus(); document.getElementById(\'agregar-materia\')?.addEventListener(\'click\', agregar_materia);');
    node_1.appendChild(node_22);

    var contenedor = document.getElementById('contenido_dinamico');
    while (contenedor.firstChild) {
        contenedor.removeChild(contenedor.firstChild);
    }
    document.getElementById('contenido_dinamico').appendChild(node_1);
}

function listar_materias(e){
    e.preventDefault();

    let ListaDeCarreras = JSON.parse(localStorage.getItem('ListaDeCarreras'));
    if (ListaDeCarreras == null){
        ListaDeCarreras = [];
    }
    var node_1 = document.createElement('DIV');
    node_1.setAttribute('class', 'module-content');
    node_1.setAttribute('id', 'modulo_listar_materias');

    var form = document.createElement('FORM');
    node_1.appendChild(form);

    var fieldset = document.createElement('FIELDSET');
    form.appendChild(fieldset);

    var legend = document.createElement('LEGEND');
    legend.innerText = 'Carreras -> Listar Materias'
    fieldset.appendChild(legend);

    const $listadoCarrerasDinamico = document.querySelector("#LISTADO_CARRERAS_DINAMICO");
    ListaDeCarreras.forEach(element => {
        
        var node_2_1 = document.createElement('H3');
        node_2_1.textContent = 'Listado de Materias de la Carrera '+element['nombre'];
        node_2_1.style.marginBottom ='5px';
        fieldset.appendChild(node_2_1);

        var node_2 = document.createElement('DIV');
        node_2.style.marginBottom ='10px';
        fieldset.appendChild(node_2);

        var node_3 = document.createElement('TABLE');
        node_3.setAttribute('id', 'LISTADO_MATERIAS_ID_CARRERA:'+element['id_carrera']);
        node_2.appendChild(node_3);

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
        node_9.setAttribute('colspan',2);
        node_5.appendChild(node_9);
        var node_9_1 = document.createTextNode('Acciones');
        node_9.appendChild(node_9_1);
    })
    var node_14 = document.createElement('SCRIPT');
    node_14.setAttribute('src', '/scripts/funciones-bedelia-materias.js');
    node_14.setAttribute('onload', 'listar_materias()');
    node_1.appendChild(node_14);
    
    var contenedor = document.getElementById('contenido_dinamico');
    while (contenedor.firstChild) {
        contenedor.removeChild(contenedor.firstChild);
    }
    document.getElementById('contenido_dinamico').appendChild(node_1);
}

function buscar_materia(e){
    e.preventDefault();

    var node_1 = document.createElement('DIV');
    node_1.setAttribute('class', 'module-content');
    node_1.setAttribute('id', 'modulo_buscar_materia');

    var node_2 = document.createElement('FORM');
    node_1.appendChild(node_2);

    var node_3 = document.createElement('FIELDSET');
    node_2.appendChild(node_3);

    var node_4 = document.createElement('LEGEND');
    node_4.innerText = "Materias -> Buscar Materia"
    node_3.appendChild(node_4);

    var node_5 = document.createElement('DIV');
    node_5.setAttribute('class', 'data-line');
    node_3.appendChild(node_5);

    var node_6 = document.createElement('LABEL');
    node_6.innerText = 'Seleccione laCarrera';
    node_6.setAttribute('class', 'data-title');
    node_6.setAttribute('for', 'CARRERA');
    node_5.appendChild(node_6);

    var node_7 = document.createElement('SELECT');
    node_7.setAttribute('name', 'CARRERA');
    node_7.setAttribute('required', '');
    node_7.setAttribute('class', 'data-entry');
    node_7.setAttribute('id', 'CARRERA');
    node_5.appendChild(node_7);

    var node_8 = document.createElement('LABEL');
    node_8.innerText = 'Nombre de Materia';
    node_8.setAttribute('class', 'data-title');
    node_8.setAttribute('for', 'NOMBRE-MATERIA');
    node_5.appendChild(node_8);

    var node_9 = document.createElement('INPUT');
    node_9.setAttribute('name', 'NOMBRE-MATERIA');
    node_9.setAttribute('autofocus', '');
    node_9.setAttribute('required', '');
    node_9.setAttribute('class', 'data-entry');
    node_9.setAttribute('id', 'NOMBRE-MATERIA');
    node_5.appendChild(node_9);

    var node_10 = document.createElement('BUTTON');
    node_10.setAttribute('class', 'boton-buscar');
    node_10.setAttribute('id', 'buscar-materia');
    node_10.setAttribute('type', 'button');
    node_5.appendChild(node_10);

    var node_11 = document.createElement('DIV');
    node_11.setAttribute('class', 'data-line');
    node_3.appendChild(node_11);

    var node_12 = document.createElement('LABEL');
    node_12.innerText = 'Seleccionar Cuatrimestre';
    node_12.setAttribute('class', 'data-title');
    node_12.setAttribute('for', 'CUATRIMESTRE-MATERIA');
    node_11.appendChild(node_12);

    var node_13 = document.createElement('SELECT');
    node_13.setAttribute('name', 'CUATRIMESTRE-MATERIA');
    node_13.setAttribute('required', '');
    node_13.setAttribute('class', 'data-entry');
    node_13.setAttribute('id', 'CUATRIMESTRE-MATERIA');
    node_11.appendChild(node_13);

    var node_14 = document.createElement('OPTION');
    node_14.innerText = '1º Cuatrimestre';
    node_13.appendChild(node_14);

    var node_15 = document.createElement('OPTION');
    node_15.innerText = '2º Cuatrimestre';
    node_13.appendChild(node_15);

    var node_16 = document.createElement('DIV');
    node_16.setAttribute('id', 'TABLA-ESTUDIANTES-INSCRIPTOS');
    node_3.appendChild(node_16);

    var node_17 = document.createElement('SCRIPT');
    node_17.setAttribute('src', '/scripts/funciones-bedelia-materias.js');
    node_17.setAttribute('onload', 'llenar_selector_carreras(); document.getElementById(\'NOMBRE-MATERIA\').focus(); document.getElementById(\'buscar-materia\').addEventListener(\'click\', buscar_materia);');
    node_1.appendChild(node_17);

    var contenedor = document.getElementById('contenido_dinamico');
    while (contenedor.firstChild) {
        contenedor.removeChild(contenedor.firstChild);
    }
    document.getElementById('contenido_dinamico').appendChild(node_1);

}

// FUNCIONES DE MANEJO DE CARRERAS
function registrar_carrera(e){
    e.preventDefault();
    
    var node_1 = document.createElement('DIV');
    node_1.setAttribute('class', 'module-content');
    node_1.setAttribute('id', 'modulo-registrar-carerra');

    var node_2 = document.createElement('FORM');
    node_1.appendChild(node_2);

    var node_3 = document.createElement('FIELDSET');
    node_2.appendChild(node_3);

    var node_4 = document.createElement('LEGEND');
    node_4.innerText = 'Carreras -> Registrar Carrera';
    node_3.appendChild(node_4);

    var node_5 = document.createElement('DIV');
    node_5.setAttribute('class', 'data-line');
    node_3.appendChild(node_5);

    var node_6 = document.createElement('LABEL');
    node_6.innerText = 'Nombre Carrera:';
    node_6.setAttribute('class', 'data-title');
    node_6.setAttribute('for', 'NOMBRE');
    node_5.appendChild(node_6);

    var node_7 = document.createElement('INPUT');
    node_7.setAttribute('name', 'NOMBRE-CARRECA');
    node_7.setAttribute('required', '');
    node_7.setAttribute('class', 'data-entry');
    node_7.setAttribute('id', 'NOMBRE');
    node_5.appendChild(node_7);

    var node_8 = document.createElement('DIV');
    node_8.setAttribute('class', 'data-line');
    node_3.appendChild(node_8);

    var node_9 = document.createElement('LABEL');
    node_9.innerText = 'Resolucion';
    node_9.setAttribute('class', 'data-title');
    node_9.setAttribute('for', 'RESOLUCION');
    node_8.appendChild(node_9);

    var node_10 = document.createElement('INPUT');
    node_10.setAttribute('name', 'RESOLUCION');
    node_10.setAttribute('required', '');
    node_10.setAttribute('class', 'data-entry');
    node_10.setAttribute('id', 'RESOLUCION');
    node_8.appendChild(node_10);

    var node_11 = document.createElement('DIV');
    node_11.setAttribute('class', 'data-line');
    node_3.appendChild(node_11);

    var node_12 = document.createElement('LABEL');
    node_12.innerText = 'Orientacion';
    node_12.setAttribute('class', 'data-title');
    node_12.setAttribute('for', 'ORIENTACION');
    node_11.appendChild(node_12);

    var node_13 = document.createElement('INPUT');
    node_13.setAttribute('name', 'ORIENTACION');
    node_13.setAttribute('required', '');
    node_13.setAttribute('class', 'data-entry');
    node_13.setAttribute('id', 'ORIENTACION');
    node_11.appendChild(node_13);

    var node_14 = document.createElement('DIV');
    node_3.appendChild(node_14);

    var node_15 = document.createElement('BUTTON');
    node_15.innerText = 'Agregar';
    node_15.setAttribute('class', 'boton-comun');
    node_15.setAttribute('id', 'agregar-carrera');
    node_14.appendChild(node_15);

    var node_16 = document.createElement('SCRIPT');
    node_16.setAttribute('src', '/scripts/funciones-bedelia-carreras.js');
    node_16.setAttribute('onload', ' document.getElementById("NOMBRE").focus(); document.getElementById("agregar-carrera")?.addEventListener("click", agregar_carrera);');
    node_1.appendChild(node_16);

    var contenedor = document.getElementById('contenido_dinamico');
    while (contenedor.firstChild) {
        contenedor.removeChild(contenedor.firstChild);
    }
    document.getElementById('contenido_dinamico').appendChild(node_1);
}

function listar_carreras(e){
    e.preventDefault();
    
    var node_1 = document.createElement('DIV');
    node_1.setAttribute('class', 'module-content');
    node_1.setAttribute('id', 'modulo_listar_carreras');

    var node_2 = document.createElement('FORM');
    node_1.appendChild(node_2);

    var node_3 = document.createElement('FIELDSET');
    node_2.appendChild(node_3);

    var node_4 = document.createElement('LEGEND');
    node_4.innerText = 'Carreras -> Listar Carreras'
    node_3.appendChild(node_4);

    var node_5 = document.createElement('TABLE');
    node_3.appendChild(node_5);

    var node_6 = document.createElement('THEAD');
    node_5.appendChild(node_6);

    var node_7 = document.createElement('TR');
    node_6.appendChild(node_7);

    var node_8 = document.createElement('TH');
    node_8.innerText = 'Nombre de Carrera';
    node_7.appendChild(node_8);

    var node_9 = document.createElement('TH');
    node_9.innerText = 'Resolucion';
    node_7.appendChild(node_9);

    var node_10 = document.createElement('TH');
    node_10.innerText = 'Orientacion';
    node_7.appendChild(node_10);

    var node_11 = document.createElement('TH');
    node_11.innerText = 'Acciones';
    node_11.setAttribute('colspan', '2');
    node_7.appendChild(node_11);

    var node_12 = document.createElement('TBODY');
    node_12.setAttribute('id', 'LISTADO_CARRERAS_DINAMICO');
    node_5.appendChild(node_12);

    var node_13 = document.createElement('SCRIPT');
    node_13.setAttribute('src', '/scripts/funciones-bedelia-carreras.js');
    node_13.setAttribute('onload', 'listar_carreras()');
    node_2.appendChild(node_13);


    var contenedor = document.getElementById('contenido_dinamico');
    while (contenedor.firstChild) {
        contenedor.removeChild(contenedor.firstChild);
    }
    document.getElementById('contenido_dinamico').appendChild(node_1);
}

// FUNCIONES DE MANEJO DE INSCRIPCIONES A MATERIAS
function inscribir_a_materia(e){
    e.preventDefault();
    
    var node_1 = document.createElement('DIV');
    node_1.setAttribute('class', 'module-content');
    node_1.setAttribute('id', 'modulo_registrar_inscripcion');

    var node_2 = document.createElement('FORM');
    node_1.appendChild(node_2);

    var node_3 = document.createElement('FIELDSET');
    node_2.appendChild(node_3);

    var node_4 = document.createElement('LEGEND');
    node_4.innerText = "Materias -> Inscribir a Materias";
    node_3.appendChild(node_4);

    var node_5 = document.createElement('DIV');
    node_5.setAttribute('class', 'data-line');
    node_3.appendChild(node_5);

    var node_6 = document.createElement('LABEL');
    node_6.setAttribute('class', 'data-title');
    node_6.setAttribute('for', 'VALOR_DE_BUSQUEDA');
    node_6.innerText = 'Buscar Estudiante';
    node_5.appendChild(node_6);

    var node_7 = document.createElement('INPUT');
    node_7.setAttribute('name', 'VALOR_DE_BUSQUEDA');
    node_7.setAttribute('class', 'data-entry');
    node_7.setAttribute('id', 'VALOR_DE_BUSQUEDA');
    node_7.setAttribute('autofocus', '');
    node_7.setAttribute('maxlength', '9');
    node_7.setAttribute('placeholder', 'Ingrese DNI');
    node_5.appendChild(node_7);

    var node_8 = document.createElement('BUTTON');
    node_8.setAttribute('class', 'boton-buscar');
    node_8.setAttribute('id', 'buscar-estudiante');
    node_8.setAttribute('type', 'button');
    node_5.appendChild(node_8);

    var node_9 = document.createElement('VAR');
    node_9.setAttribute('id', 'ID_ESTUDIANTE');
    node_3.appendChild(node_9);

    var node_10 = document.createElement('DIV');
    node_10.setAttribute('id', 'estudiante');
    node_3.appendChild(node_10);

    var node_11 = document.createElement('DIV');
    node_11.setAttribute('class', 'data-line');
    node_3.appendChild(node_11);

    var node_12 = document.createElement('LABEL');
    node_12.setAttribute('class', 'data-title');
    node_12.setAttribute('for', 'SELECT-CARRERA');
    node_12.innerText = 'Seleccionar Carrera';
    node_11.appendChild(node_12);

    var node_13 = document.createElement('SELECT');
    node_13.setAttribute('name', 'SELECT-CARRERA');
    node_13.setAttribute('required', '');
    node_13.setAttribute('class', 'data-entry');
    node_13.setAttribute('id', 'SELECT-CARRERA');
    node_13.setAttribute('disabled','');
    node_11.appendChild(node_13);

    var node_14 = document.createElement('OPTION');
    node_14.setAttribute('value', '');
    node_13.appendChild(node_14);

    var node_15 = document.createElement('DIV');
    node_15.setAttribute('id', 'listado-de-materias');
    node_3.appendChild(node_15);

    var node_16 = document.createElement('DIV');
    node_3.appendChild(node_16);

    var node_17 = document.createElement('BUTTON');
    node_17.setAttribute('class', 'boton-comun');
    node_17.setAttribute('id', 'inscribir');
    node_17.innerText = 'Inscribir';
    node_16.appendChild(node_17);

    var node_18 = document.createElement('SCRIPT');
    node_18.setAttribute('src', '/scripts/funciones-bedelia-inscripciones.js');
    node_18.setAttribute('onload', ' document.getElementById("VALOR_DE_BUSQUEDA").focus(); llenar_selector_carreras(); document.getElementById("inscribir")?.addEventListener("click", realizar_inscripcion); document.getElementById("buscar-estudiante")?.addEventListener("click", buscar_estudiante);');
    node_1.appendChild(node_18);

    var contenedor = document.getElementById('contenido_dinamico');
    while (contenedor.firstChild) {
        contenedor.removeChild(contenedor.firstChild);
    }
    document.getElementById('contenido_dinamico').appendChild(node_1);

}
