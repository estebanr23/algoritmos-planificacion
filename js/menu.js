(function() {
    'use strict';
    document.addEventListener('DOMContentLoaded', function(){ 
        // nav
        var enlacePrior = document.getElementById('enlace-prioridad');
        var subMenu = document.getElementById('submenu');
        enlacePrior.addEventListener('mouseenter', () => subMenu.style.display='block');
        enlacePrior.addEventListener('mouseleave', () => subMenu.style.display='none');

        // menu movil
        var menuMovil = document.getElementsByClassName('menu-movil')[0];
        var nav = document.getElementsByTagName('nav')[0];
        let estado=0;

        menuMovil.addEventListener('click', function() {
            if(estado === 0) {
                nav.style.display='block';
                estado = 1;
            } else if(estado === 1){
                nav.style.display='none';
                estado = 0;
            }
        });

        // Año footer
        var anio = document.getElementById('date');
        var tiempo = new Date();
        var year = tiempo.getFullYear();
        anio.innerHTML=year;

        // Media Query Navegacion
        var nav = document.getElementById('navegacion');
        var mql = window.matchMedia('(min-width: 670px)');
        mql.addListener(screenTest);
        
        function screenTest(e) {
            if (e.matches) {
              nav.style.display="block";
            } else {
                nav.style.display="none";
            }
        }

    });
})();
