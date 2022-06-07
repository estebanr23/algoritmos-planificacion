(function() {
    'use strict';
    document.addEventListener('DOMContentLoaded', function(){ 
        // nav
        var enlacePrior = document.getElementById('enlace-prioridad');
        var subMenu = document.getElementById('submenu');
        enlacePrior.addEventListener('mouseenter', () => subMenu.style.display='block');
        enlacePrior.addEventListener('mouseleave', () => subMenu.style.display='none');
    });
})();
