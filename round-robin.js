var procesos = [];
var cola = [];
var secuencia = [];
var q = 2;

var cantidad=1;
var t=0;
var i;

function roundRobin(p) {
    procesos = p;

    while(cantidad <= procesos.length) {
        i=1; // Para controlar quantum    
        // Primera iteracion 
        if(cola.length === 0) {
            controlarCola();
        }
    
        if(cola.length >= 1) {
            ejecutar();
        } else {
            console.log('T=' + t);
            secuencia.push(''); // Nuevo --- Tiempos Muertos
            t++;
        }
    }

    return secuencia;
}


function ejecutar() {
    while(cola[0].ejecucion > 0 && i <= q) { 
        if(t < cola[0].llegada) {
            console.log('T=' + t);
            secuencia.push(''); // Nuevo --- Tiempos Muertos
        } else if(t >= cola[0].llegada) { 
            cola[0].ejecucion--;
            //secuencia.push(cola[0].nombre + "(" + cola[0].ejecucion+ ")");
            secuencia.push(cola[0].nombre);
            console.log('T=' + t);
            console.log(secuencia);
            i++;
        }
        
        //console.log(cola);  
        controlarCola(); // En apropiativos se invierte el orden
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
