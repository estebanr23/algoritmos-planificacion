/*
var procesos = [
    {nombre: 'P1', ejecucion: 5, llegada: 2},
    {nombre: 'P2', ejecucion: 7, llegada: 1},
    {nombre: 'P3', ejecucion: 9, llegada: 5},
    {nombre: 'P4', ejecucion: 3, llegada: 8},
    {nombre: 'P5', ejecucion: 4, llegada: 7},
    {nombre: 'P6', ejecucion: 3, llegada: 31}
]
*/

var procesos = [];
var cola = [];
var secuencia = [];

var cantidad=1;
var t=0;

function fcfs(p) {
    procesos = p;

    while(cantidad <= procesos.length) {    
        // Primera iteracion 
        if(cola.length === 0) {
            controlarCola();
        }
    
        if(cola.length >= 1) {
            ejecutar();
        } else {
            console.log('T=' + t);
            t++;
        }
    }

    return secuencia;
}


function ejecutar() {
    while(cola[0].ejecucion > 0) { 
        if(t < cola[0].llegada) {
            console.log('T=' + t);
            secuencia.push(''); // Nuevo --- Tiempos Muertos
        } else if(t >= cola[0].llegada) { 
            cola[0].ejecucion--;
            //secuencia.push(cola[0].nombre + "(" + cola[0].ejecucion+ ")");
            secuencia.push(cola[0].nombre);
            console.log('T=' + t);
            console.log(secuencia);
        }
        
        //console.log(cola);   
        controlarCola();
        t++;
    }

    if(cola[0].ejecucion === 0) {
        console.log('Final de ' + cola[0].nombre + '   T=' + (t-1));
        cola.splice(0, 1);
        controlarCola();
        cantidad++;
    } else if(cola[0].ejecucion > 0) {
        controlarCola();
        cola.push(cola[0]);
        cola.splice(0, 1);
    }

    console.log(cola);  
    //controlarCola();
}

function controlarCola() {
    for(proc of procesos) {
        if(proc.llegada === t) {
            if(!cola.some((element) => element.nombre === proc.nombre)) { // Verifica que no exista ya el proceso en la cola.
                cola.push(proc);
            }
        }
    }
}
