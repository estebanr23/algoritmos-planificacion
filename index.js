(function(){
    'use strict';
    document.addEventListener('DOMContentLoaded', function(){
        var procesos = []; // Comentado
        var secuencia = [];
        var btnAgregar = document.getElementById('agregar');
        var btnFin = document.getElementById('finalizar');
        var tablaProcesos = document.getElementById('tabla-procesos');

        btnAgregar.addEventListener('click', agregarProceso);
        btnFin.addEventListener('click', crearDiagrama);

        function agregarProceso() {
            let nombre = document.getElementById('nombre').value;
            let llegada = document.getElementById('llegada').value;
            let ejecucion = document.getElementById('ejecucion').value;
            let msjError = document.getElementById('mensaje-error');
            msjError.style.display='none';
            let repetido=false;

            let nuevoProceso = {
                'nombre': nombre,
                'llegada': Number(llegada),
                'ejecucion': Number(ejecucion)
            }

            // Verificar que el proceso no exista
            for(let proc of procesos) {
                if(proc.nombre === nuevoProceso.nombre) {
                   repetido = true; 
                }
            }
            if(!repetido) {
                procesos.push(nuevoProceso); 
                crearTabla(nuevoProceso); 
            } else {
                msjError.style.display='block';
            }
            
        }

        function crearTabla(nuevoProceso) {
            let row = document.createElement('tr');
            for(const proc in nuevoProceso) {
                let column = document.createElement('td');
                column.innerHTML = `${nuevoProceso[proc]}`;
                row.appendChild(column);
            }
            tablaProcesos.appendChild(row);
        }

        /*
        var procesos = [
            {nombre: 'P1', ejecucion: 4, llegada: 0, prioridad: 1},
            {nombre: 'P2', ejecucion: 2, llegada: 3, prioridad: 3},
            {nombre: 'P3', ejecucion: 7, llegada: 1, prioridad: 0},
            {nombre: 'P4', ejecucion: 5, llegada: 2, prioridad: 4},
            {nombre: 'P5', ejecucion: 1, llegada: 4, prioridad: 2}
        ];
        */
        
        // Crear Diagrama
        var t;
        var diagrama = document.getElementById('diagrama');
        var table = document.createElement('table');
        diagrama.appendChild(table);
        
        var thead = document.createElement('thead');
        var tbody = document.createElement('tbody');
        
        table.appendChild(thead);
        table.appendChild(tbody);
        
        // Contenido 
        /*
        var secuencia = [
            'P1', 'P1', 'P1',
            'P1', 'P3', 'P3',
            'P3', 'P3', 'P3',
            'P3', 'P3', 'P5',
            'P2', 'P2', 'P4',
            'P4', 'P4', 'P4',
            'P4'
        ];
        */
        
        function crearDiagrama() {
            secuencia = fcfs(procesos);

            t = secuencia.length;
        
            crearCabecera();
        
            crearCuerpo();
        }
        
        // Cabecera de la tabla
        function crearCabecera() {
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
        }
        
        // Cuerpo de la tabla
        function crearCuerpo() {
            let filas = procesos.length;
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
                        column.style.backgroundColor="#01a8d1";
                        row.appendChild(column);
                    } else {
                        let column = document.createElement('td');
                        //column.innerHTML = secuencia[j];
                        row.appendChild(column);
                    }
                }
                tbody.appendChild(row);
            }
        }
        

    });
})();








