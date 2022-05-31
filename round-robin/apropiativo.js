var cola = [];
var secuencia = [];
var q = 2;

/*
var procesos = [
    {nombre: 'P1', ejecucion: 4, llegada: 0, prioridad: 1},
    {nombre: 'P2', ejecucion: 2, llegada: 3, prioridad: 3},
    {nombre: 'P3', ejecucion: 7, llegada: 1, prioridad: 0},
    {nombre: 'P4', ejecucion: 5, llegada: 2, prioridad: 4},
    {nombre: 'P5', ejecucion: 1, llegada: 4, prioridad: 2}
]
*/

var procesos = [
    {nombre: 'P1', ejecucion: 5, llegada: 2},
    {nombre: 'P2', ejecucion: 7, llegada: 1},
    {nombre: 'P3', ejecucion: 9, llegada: 5},
    {nombre: 'P4', ejecucion: 3, llegada: 8},
    {nombre: 'P5', ejecucion: 4, llegada: 7},
    //{nombre: 'P6', ejecucion: 3, llegada: 31}
]

var cantidad=1;

var tiempoEjecucion = procesos.reduce((acumulador, proceso) => acumulador + proceso.ejecucion, 0);
var tiempoLlegada = procesos.map((element) => element.llegada).sort((a, b) => a - b)[0];

var tiempoTotal = tiempoEjecucion + tiempoLlegada;

let t=0;
var i;
//while(t <= tiempoTotal) { 
while(cantidad <= procesos.length) {    
    i=1; // Para controlar quantum
    // Primera iteracion 
    if(cola.length === 0) {
        controlarCola();
    }

    //ordenarCola();
    if(cola.length >= 1) {
        ejecutar();
    } else {
        console.log('T=' + t);
        t++;
    }

}

function ejecutar() {
    while(cola[0].ejecucion > 0 && i <= q) { // && i < q
        if(t <= cola[0].llegada) {
            console.log('T=' + t);
        } else if(t > cola[0].llegada) { 
            cola[0].ejecucion--;
            secuencia.push(cola[0].nombre + "(" + cola[0].ejecucion+ ")");
            console.log('T=' + t);
            console.log(secuencia);
            i++;
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
                //ordenarCola();
            }
        }
    }
}
