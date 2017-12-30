// Evitando errores para navegadores sin consola
var log = function() {
    console && console.log.apply(console, arguments);
};
