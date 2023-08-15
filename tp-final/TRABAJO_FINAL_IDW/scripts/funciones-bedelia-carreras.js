function agregar_carrera(){
    let ListaDeCarreras = JSON.parse(localStorage.getItem('ListaDeCarreras'));
    if (ListaDeCarreras == null){
        ListaDeCarreras = [];
    }
    let NuevaCarrera = {
        id_carrera : obtener_next_id(),
        nombre: document.querySelector('#NOMBRE').value,
        resolucion: document.querySelector('#RESOLUCION').value,
        orientacion: document.querySelector('#ORIENTACION').value,
    };
    ListaDeCarreras.push(NuevaCarrera);
    localStorage.setItem('ListaDeCarreras', JSON.stringify(ListaDeCarreras));

    document.querySelector('#NOMBRE').value = null;
    document.querySelector('#RESOLUCION').value = null;
    document.querySelector('#ORIENTACION').value = null;
    /*TENGO QUE MOSTRAR UN DIALOGO DE ok! */
}

function listar_carreras(){
    let ListaDeCarreras = JSON.parse(localStorage.getItem('ListaDeCarreras'));
    if (ListaDeCarreras == null){
        ListaDeCarreras = [];
    }
    const $listadoCarrerasDinamico = document.querySelector("#LISTADO_CARRERAS_DINAMICO");
    ListaDeCarreras.forEach(element => {
        const $tr = document.createElement("tr");
        for (let campo in element){
            if (campo=="id_carrera")
            {
                $tr.id = "id_carrera : "+element[campo];
            }else{
                let $td = document.createElement("td");
                $td.textContent = element[campo];
                $tr.appendChild($td);
            }
        }
        var btn = document.createElement("button");
        btn.setAttribute('class', 'boton-editar');
        btn.addEventListener('click', editar_carrera);
        $tr.appendChild(btn);
        var btn2 =  document.createElement("button");
        btn2.setAttribute('class', 'boton-eliminar');
        btn2.addEventListener('click', eliminar_carrera);
        $tr.appendChild(btn2);
        $listadoCarrerasDinamico.appendChild($tr);
    });
}

function obtener_next_id(){
    let ListaDeCarreras = JSON.parse(localStorage.getItem('ListaDeCarreras'));
    let next_id = 0;
    if (ListaDeCarreras == null){
        ListaDeCarreras = [];
    }
    ListaDeCarreras.forEach(element => {
        if(parseInt(element['id_carrera'],10)>next_id){next_id=parseInt(element['id_carrera'],10)}
    })
    next_id++;
    return next_id;
}

function editar_carrera(e){
    console.log('function editar_carrera()');
    //console.log(e.target.parentElement.id.split(':')[1]);
    e.target.parentElement.setAttribute('class', 'celda-editable');
    e.target.parentElement.children[0].setAttribute('contenteditable', 'true');
    e.target.parentElement.children[0].focus();
    e.target.parentElement.children[1].setAttribute('contenteditable', 'true');
    e.target.parentElement.children[2].setAttribute('contenteditable', 'true');
    e.target.parentElement.removeChild(e.target.parentElement.children[4]);
    let button = document.createElement('button');
    button.setAttribute('class', 'boton-guardar');
    button.addEventListener('click', guardar_editar_carrera);
    e.target.parentElement.appendChild(button);
    e.target.parentElement.removeChild(e.target.parentElement.children[3]);
}

function guardar_editar_carrera(e){
    e.preventDefault();
    let ListaDeCarreras = JSON.parse(localStorage.getItem('ListaDeCarreras'));
    if (ListaDeCarreras == null){
        ListaDeCarreras = [];
    }
    ListaDeCarreras.forEach(element => {
        if(element['id_carrera'] == parseInt(e.target.parentElement.id.split(':')[1]))
        {
            element['nombre'] = e.target.parentElement.children[0].innerText;
            element['resolucion'] = e.target.parentElement.children[1].innerText;
            element['orientacion'] = e.target.parentElement.children[2].innerText;
        }
    });
    localStorage.setItem('ListaDeCarreras', JSON.stringify(ListaDeCarreras));
    e.target.parentElement.removeAttribute('class', 'celda-editable');
    e.target.parentElement.children[0].setAttribute('contenteditable', 'false');
    e.target.parentElement.children[1].setAttribute('contenteditable', 'false');
    e.target.parentElement.children[2].setAttribute('contenteditable', 'false');
    var btn = document.createElement("button");
    btn.setAttribute('class', 'boton-editar');
    btn.addEventListener('click', editar_carrera);
    var btn2 =  document.createElement("button");
    btn2.setAttribute('class', 'boton-eliminar');
    btn2.addEventListener('click', eliminar_carrera);
    e.target.parentElement.appendChild(btn);
    e.target.parentElement.appendChild(btn2);
    e.target.parentElement.removeChild(e.target.parentElement.children[3]);
}

function eliminar_carrera(e){
    console.log('function eliminar_carrera()');
    console.log(e.target.parentElement.id.split(':')[1]);
}