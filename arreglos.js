// Evitando errores para navegadores viejos
var log = function(params) {
    console && console.log(params);
};

// Removiendo paywalls
var checkAndRemoveElem = function(id, interval) {
    var modal = document.getElementById(id);

    if (modal) {
        modal.parentElement.parentElement.remove();
        clearInterval(interval);
    }
};

var unPayWall = setInterval(checkAndRemoveElem, 5, 'LNA_paywall_modal', unPayWall),
    dosPayWall = setInterval(checkAndRemoveElem, 5, 'paywall-cookie', dosPayWall),
    tresPayWall = setInterval(checkAndRemoveElem, 5, 'conteo_notas_paywall', tresPayWall);

// Cookies
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
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function eraseCookie(name) {
    createCookie(name, "", - 1);
    log('mejorandolanacion: erasedCookie %s', name);
}

// El nombre del cookie es un hash, entonces en vez de adivinarlo,
// recorremos los cookies hasta encontrar el correcto.
var allCookies = document.cookie.split(';');
for (var j = 0; j < allCookies.length; j++) {
    var name = allCookies[j].split('=')[0].trim(),
        value = readCookie(name);

    try {
        value = decodeURIComponent(value.replace(/\+/g, " "));
        value = JSON.parse(value);
        value['lw-allowed'] && eraseCookie(name);
        value['gnpw-allowed'] && eraseCookie(name);
    } catch (e) {}
}

eraseCookie('lanacion_session_id');
