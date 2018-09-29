var removerCookies = function () {
    var conteoDeCookies = 0;

    // Remueve los cookies que llevan un registro de la cantidad de historias leidas
    // http://stackoverflow.com/questions/2144386/javascript-delete-cookie
    function createCookie(name, value, days) {
        var expires = '';
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toGMTString();
        }

        document.cookie = name + "=" + value + expires + "; path=/";
    }

    function readCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }

        return null;
    }

    function eraseCookie(name) {
        createCookie(name, "", -1);
        conteoDeCookies++;
    }

    // El nombre del cookie es un hash, entonces en vez de adivinarlo,
    // recorremos los cookies y los borramos todos 🎉️
    var allCookies = document.cookie.split(';');
    for (var j = 0; j < allCookies.length; j++) {
        var name = allCookies[j].split('=')[0].trim(),
            value = readCookie(name);

        try {
            value = decodeURIComponent(value.replace(/\+/g, " "));
            eraseCookie(name);
        } catch (e) {
        }
    }

    if (conteoDeCookies) {
        console.log('aln: removimos %i cookies', conteoDeCookies);
    }
};

var permitirSeleccionarTexto = function () {
    window.setTimeout(function () {
        try {
            if (jQuery !== undefined) {
                jQuery(document).off('mousedown');
            }
        } catch (e) {
        }
    }, 5000);
};

var removerArticulosRepetidos = function () {
    var titular = document.querySelectorAll('.headline-hed-last')[0];
    var masLeidos = document.querySelectorAll('.most-read h4 a');
    var numeros = document.querySelectorAll('.most-read h1');

    for (var j = 0; j < numeros.length; j++) {
        numeros[j].classList = 'hidden';
    }

    if (titular) {
        for (var i = 0; i < masLeidos.length; i++) {
            var esteTitular = masLeidos[i];

            if (esteTitular.innerText.trim() === titular.innerText.trim()) {
                esteTitular.parentNode.parentNode.parentNode.classList = 'hidden';
            }
        }
    }
};

$(window).on('load', function() {
    removerCookies();
    permitirSeleccionarTexto();
    removerArticulosRepetidos();

    if ($('html').hasClass('story')) {
        $.get(location.href, function(data) {
            var el = $(data).find('#article-body');
            $('#article-body').replaceWith(el.html());
            $("img.image-lazy").lazyload();
        });
    }
});