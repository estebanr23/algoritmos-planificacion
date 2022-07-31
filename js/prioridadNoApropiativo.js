var procesos = [];
var cola = [];
var secuencia = [];
var ordenar;

var cantidad=1;
var t=0;

function prioridadNoApropiativo(p, orden) {
    procesos = p;
    ordenar = Number(orden);

    while(cantidad <= procesos.length) {
        // Primera iteracion 
        if(cola.length === 0) {
            controlarCola();
        }
    
        if(cola.length >= 1) {
            ejecutar();
        } else {
            secuencia.push(''); // Nuevo --- Tiempos Muertos
            t++;
        }
    }

    return secuencia;
}


function ejecutar() {
    while(cola[0].ejecucion > 0) { 
        if(t < cola[0].llegada) {
            secuencia.push(''); // Nuevo --- Tiempos Muertos
        } else if(t >= cola[0].llegada) { 
            cola[0].ejecucion--;
            secuencia.push(cola[0].nombre);
        }
        
        t++; 
        controlarCola();
    }

    if(cola[0].ejecucion === 0) {
        cola.splice(0, 1);
        controlarCola();
        cantidad++;
    } else if(cola[0].ejecucion > 0) {
        controlarCola();
        cola.push(cola[0]);
        cola.splice(0, 1);
    }

    ordenarCola();
}

function controlarCola() {
    for(proc of procesos) {
        if(proc.llegada === t) {
            if(!cola.some((element) => element.nombre === proc.nombre)) { // Verifica que no exista ya el proceso en la cola.
                cola.push(proc);
            }
        }
    }
    if(ordenar === 1) {
        ordenarColaMenor();
    } else {
        ordenarColaMayor();
    }
}

// Menor valor, mayor prioridad
function ordenarColaMenor() {
    if(cola.length > 1) {
        cola.sort((a, b) => a.prioridad - b.prioridad);
    }
}

// Mayor valor, mayor prioridad
function ordenarColaMayor() {
    if(cola.length > 1) {
        cola.sort((a, b) => b.prioridad - a.prioridad);
    }
}