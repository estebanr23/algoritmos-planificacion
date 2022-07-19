// Calculo Algoritmos No Apropiativos
function tiempoNoApropiativo(secuencia) {
    let resultado = [];
    let tiempo;

    let lista = new Set(secuencia);
    let procesos = Array.from(lista);

    for(const p of procesos) {
        let inicio = secuencia.findIndex((element) => element === p);
        let fin = secuencia.findLastIndex((element) => element === p);

        tiempo = {proceso: p, respuesta: (fin + 1), espera: (inicio + 1)};
        resultado.push(tiempo);
    }
    
    let respuestaTotal=0, esperaTotal=0;
    for(const r of resultado) {
        respuestaTotal = respuestaTotal + r.respuesta;
        esperaTotal = esperaTotal + r.espera;
    }

    console.log(resultado);
    console.log(respuestaTotal);
    console.log(esperaTotal);

    // Mostrar resultados en vista 
    var ejecucionUl = document.getElementById('tiempo-ejecucion');
    var esperaUl = document.getElementById('tiempo-espera');

    for(const r of resultado) {
        let node = document.createElement('li');
        let text = document.createTextNode(`${r.proceso}: ${r.respuesta}`);
        node.appendChild(text);
        ejecucionUl.appendChild(node);
    }
    // Total Respuesta
    let node1 = document.createElement('li');
    let text1 = document.createTextNode(`Total: ${respuestaTotal}/${procesos.length} = ${(respuestaTotal/procesos.length).toFixed(1)}`);
    node1.appendChild(text1);
    ejecucionUl.appendChild(node1);

    for(const r of resultado) {
        let node = document.createElement('li');
        let text = document.createTextNode(`${r.proceso}: ${r.espera}`);
        node.appendChild(text);
        esperaUl.appendChild(node);
    }
    // Total Espera
    let node2 = document.createElement('li');
    let text2 = document.createTextNode(`Total: ${esperaTotal}/${procesos.length} = ${(esperaTotal/procesos.length).toFixed(1)}`);
    node2.appendChild(text2);
    esperaUl.appendChild(node2);

    calculos.style.display='flex';    
}


// Calculo Algoritmos Apropiativos

var procesos = [
    {nombre: 'P1', ejecucion: 7, llegada: 0},
    {nombre: 'P2', ejecucion: 4, llegada: 2},
    {nombre: 'P3', ejecucion: 1, llegada: 4},
    {nombre: 'P4', ejecucion: 4, llegada: 5},
];

var secuencia = ['P1', 'P1', 'P2', 'P2', 'P3', 'P2', 'P2', 'P4', 'P4', 'P4', 'P4', 'P1', 'P1', 'P1', 'P1', 'P1'];
console.log(secuencia);



function tiempoApropiativo(procesos, secuencia) {
    let resultado = [];
    let tiempo;
    let l = 0;
    let respuestaTotal=0, esperaTotal=0;

    for(const p of procesos) {
        let inicio = secuencia.findIndex((element) => element === p.nombre);
        let fin = secuencia.findLastIndex((element) => element === p.nombre);

        tiempoEspera = calcularEspera();
        tiempoRespuesta = {proceso: p, respuesta: ((fin + 1) - p.llegada), espera: tiempoEspera[l]};
        resultado.push(tiempoRespuesta);
        l++;
    }

    for(const r of resultado) {
        respuestaTotal = respuestaTotal + r.respuesta;
        esperaTotal = esperaTotal + r.espera;
    }

    console.log(resultado);
    console.log(respuestaTotal);
    console.log(esperaTotal);


    function calcularEspera() {
        // 1° Obtener arrays parciales - Sin *
        let array;
        let dividido = [];
        for(const p of procesos) {
            array = [];
            for (let index = 0; index < secuencia.length; index++) {
                if(p.nombre === secuencia[index]) {                     
                    array.push(index);
                }
            }
            dividido.push(array);
        }
        console.log(dividido); 


        // 2° Modificar arrays parciales - Con *
        let aux;
        let aux1 = [];
        dividido.forEach(element => {
            aux = [];
            for (let i = 0; i < element.length; i++) {
                if(i === 0) {
                    aux.push(element[i]);
                } else if(element[i] === (element[i-1] + 1)) {
                    aux.push(element[i]);
                } else {
                    aux.push('*');
                    aux.push(element[i]);
                }
            }
            aux1.push(aux);
        });
        console.log(aux1); 


        // 3° Reaizar calculos
        let inicio, fin, finAnt, suma, j=0, espera=[]; 
        for(const p of procesos) {
            suma = 0;
            element = aux1[j]; // j permite elegir el array parcial sobre el cual recorrer.

            if(element.length > 1) {
                for (let i = 0; i < element.length; i++) {
                    if(i === 0) {
                        inicio = element[i];
                        fin = p.llegada;
                        suma = suma + (inicio - fin);
                        console.log(`suma = ${inicio} - ${fin}`);

                    } 
                    if(element[i] === '*') {
                        inicio = element[i+1];
                        finAnt = element[i-1] + 1; 
                        suma = suma + (inicio - finAnt);
                        console.log(`suma = ${inicio} - ${finAnt}`);
                    }
                }
            } else {
                inicio = element[0];
                fin = p.llegada;
                suma = suma + (inicio - fin);
                console.log(`suma = ${inicio} - ${fin}`);
            }  

            espera.push(suma);
            console.log(suma);
            j++;
        }
        console.log(espera);
        return espera;
    } // Cierre de funcion calcularEspera()

} // Cierre de funcion tiempoApropiativo()


tiempoApropiativo(procesos, secuencia);

