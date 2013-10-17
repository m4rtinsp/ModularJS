/**
* Arquivo principal do modular.js
* Define o metodo global de namespace
* author: Felipe Correia Brito
*/
(function (global) {
    "use strict";

    var modular = function (){ 
        var namespace = arguments[0],
            commonjs_module = (typeof arguments[1] === "string") ? arguments[1] : null,
            parent_object = (commonjs_module) ? arguments[2] || global : arguments[1] || global,
            module = namespace.split("."),
            mlength = module.length, 
            parent = parent_object || global;
            

        for(var i = 0; i < mlength; i++){
            if(typeof parent[module[i]] === "undefined"){
                if(typeof commonjs_module === "string" && typeof require !== "undefined" && i === (mlength - 1)){
                    parent[module[i]] = require(commonjs_module);
                } else {
                    parent[module[i]] = {};
                }
            }
            parent = parent[module[i]];
        }
        return parent;
    };

    if (typeof global.module !== "undefined" && typeof global.module.exports !== "undefined") {
        module.exports = modular;
    } else{
        global.modular = modular;
    }
}((typeof window !== "undefined") ? window : global));