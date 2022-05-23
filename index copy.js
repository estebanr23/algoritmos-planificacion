//var procesos = [];

var procesos = [
    {nombre: 'P1', ejecucion: 4, llegada: 0, prioridad: 1},
    {nombre: 'P2', ejecucion: 2, llegada: 3, prioridad: 3},
    {nombre: 'P3', ejecucion: 7, llegada: 1, prioridad: 0},
    {nombre: 'P4', ejecucion: 5, llegada: 2, prioridad: 4},
    {nombre: 'P5', ejecucion: 1, llegada: 4, prioridad: 2}
];

var btnAgregar = document.getElementById('agregar');
var btnListar = document.getElementById('listar');
var listaProcesos = document.getElementById('lista-procesos');

btnAgregar.addEventListener('click', agregarProceso);
btnListar.addEventListener('click', crearNodo);

function agregarProceso() {
    let nombre = document.getElementById('proceso').value;
    let llegada = document.getElementById('llegada').value;
    let ejecucion = document.getElementById('ejecucion').value;
    let prioridad = document.getElementById('prioridad').value;

    let nuevoProceso = {
        'proceso': nombre,
        'llegada': llegada,
        'ejecucion': ejecucion,
        'prioridad': prioridad
    }
    procesos.push(nuevoProceso);  
    console.log(procesos); 
}

function crearNodo() {
    for(p of procesos) {
        let nodo = document.createElement('li');
        let contenido = document.createTextNode('Proceso: ' + p.proceso + '  -  T. Llegada: ' + p.llegada + '  -  T.Ejecucion: ' + p.ejecucion + '  -  Priorodad' + p.prioridad);
        nodo.appendChild(contenido);
        listaProcesos.appendChild(nodo);
    }
}

// Prueba de Grilla
var t;
var diagrama = document.getElementById('diagrama');
var table = document.createElement('table');
diagrama.appendChild(table);


var thead = document.createElement('thead');
var tbody = document.createElement('tbody');

table.appendChild(thead);
table.appendChild(tbody);

// Contenido 
var secuencia = [
    'P1', 'P1', 'P1',
    'P1', 'P3', 'P3',
    'P3', 'P3', 'P3',
    'P3', 'P3', 'P5',
    'P2', 'P2', 'P4',
    'P4', 'P4', 'P4',
    'P4'
];

t = secuencia.length;

//function crearCabecera() {
    let row_1 = document.createElement('tr');
    for(let i = 0; i <= t; i++) {
        if(i === 0) {
            let heading_1 = document.createElement('th');
            row_1.appendChild(heading_1);
        } else {
            let heading_1 = document.createElement('th');
            heading_1.innerHTML = i;
            row_1.appendChild(heading_1);
        }
    }
    thead.appendChild(row_1);
//}

var filas = procesos.length;
console.log(filas);

/*
let row_2 = document.createElement('tr');

for(let i = 1; i <= t; i++) {
    let row_2_data_1 = document.createElement('td');
    row_2_data_1.innerHTML = 'P1';
    row_2.appendChild(row_2_data_1);
}
tbody.appendChild(row_2);
*/
/*
for(let i = 1; i <= filas; i++) {
    let row = document.createElement('tr');
    for(let j = 0; j <= t; j++) {
        let column = document.createElement('td');
        column.innerHTML = 'P1';
        //column.style.backgroundColor = "yellow";
        row.appendChild(column);
    }
    tbody.appendChild(row);
}
*/

for(let i = 1; i <= procesos.length; i++) {
    let row = document.createElement('tr');
    let columnIni = document.createElement('td');
    columnIni.innerHTML = procesos[i-1].nombre;
    row.appendChild(columnIni);

    for(let j = 0; j < t; j++) {
        //column.style.backgroundColor = "yellow";
        if(secuencia[j] === procesos[i-1].nombre) {
            let column = document.createElement('td');
            column.innerHTML = secuencia[j];
            column.style.backgroundColor="rgb(57, 173, 240)";
            row.appendChild(column);
        } else {
            let column = document.createElement('td');
            //column.innerHTML = secuencia[j];
            row.appendChild(column);
        }
    }
    tbody.appendChild(row);
}