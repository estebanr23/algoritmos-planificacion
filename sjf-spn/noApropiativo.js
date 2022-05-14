var tiempoTotal = 0;
var cola = [];
var secuencia = [];

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
    {nombre: 'P5', ejecucion: 4, llegada: 7}
]

for(proc of procesos) {
    tiempoTotal = proc.ejecucion + tiempoTotal;
}

let t=0;
while(t < tiempoTotal) {

    // Primera iteracion 
    if(cola.length === 0) {
        controlarCola();
    }

    ordenarCola();
    if(cola.length >= 1) {
        ejecutar();
    } else {
        console.log('T=' + t);
        t++;
    }

}

function ejecutar() {
    while(cola[0].ejecucion > 0) {
        if(t <= cola[0].llegada) {
            console.log('T=' + t);
        } else if(t > 0) { // Cambiar aca.
            cola[0].ejecucion--;
            secuencia.push(cola[0].nombre + "(" + cola[0].ejecucion+ ")");
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
    }

    console.log(cola);  
    controlarCola();
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

function ordenarCola() {
    if(cola.length > 1) {
        cola.sort((a, b) => a.ejecucion - b.ejecucion);
    }
}