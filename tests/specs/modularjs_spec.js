/**
* Test specs for ModularJS
* author: Felipe Correia Brito
*/

(function (){
    "use strict";

    describe('Jasmine can be used', function () {
        it('always true', function () {
            expect(true).toBe(true);
        });
    });

    describe('modular.js is acessible', function (){
        it('can get window object', function (){
            expect(window).toBeDefined(); // This test will pass because it uses an phantomjs to ensure the navigator behavior
        });

        it('can get modular.js globally', function (){
            expect(window.modular).toBeDefined();
        });

        it('can set the namespace tree if undefined', function (){
            var modular = window.modular('tests.are.cool');

            expect(typeof modular).toBe("object");
            expect(window.tests).toBeDefined();
            expect(window.tests.are).toBeDefined();
            expect(window.tests.are.cool).toBeDefined();
        });
    });

    describe('modular.js can get an object previously setted', function (){
        var namespace;
        beforeEach(function (){
            namespace = window.modular('myapp.models.data');
            namespace.Person = function (name, age) {
                var _name = name, _age = age;
                this.getName = function (){
                    return _name;
                };
                this.getAge = function (){
                    return _age;
                };
            };
        });

        it('can get the objects setted in global scope and namespace', function (){
            expect(namespace).toBeDefined();
            expect(namespace.Person).toBeDefined();

            var person = new namespace.Person("Felipe", "21");
            expect(person.getName()).toBe("Felipe");
            expect(person.getAge()).toBe("21");
        });
    });

    describe('modular.js can use an existing object as an global object', function (){
        it('can use a local var as modular.js namespace', function (){
            var module_local = {}; 
            var models = window.modular('myapp.models', module_local);
            
            models.Test = function (){
                return "can use a function inside my objects";
            };
            
            expect(module_local.myapp).toBeDefined();
            expect(module_local.myapp.models).toBeDefined();
            expect(module_local.myapp.models.Test()).toBe("can use a function inside my objects");
        });
    });
}());