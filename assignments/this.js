/* The for principles of "this";
* in your own words. explain the four principle for the "this" keyword below.
*
* 1. Window Binding
    - the 'this' keyword always points to the window if no context is given. 
* 2. Implicit Binding
    - (automatic) binding - Object Literals. Doesn't work without using the this.key in order to invoke them. Arrow functions ignor the implicit binding and references the window.

* 3. Explicit Binding
    - used only with functions. gives you a variety of methods to use for binding
        - The apply method tells you where to point the 'this' keyword. Was made obsolete by the spread op(see below)
        - The call method uses object as and argument and can accept a list of arguments.
        - The spread op (...) made apply obsolete and allows for array s or strings to be used without having to type everyone of them.
        - The bind method acts like call but save for later use, and is used for controlling when you want something to run

* 4. New Binding
    - used to build object literals to be reused over and over again. Constructor functions are capitalized and make it much easier to create reusable code.

*
* write out a code example of each explanation above
*/

// Principle 1

// code example for Window Binding

    
    function window1(bind) {
    //"use strict"; //used to stop window binding
    console.log(this);
    return `use strict stops  window ${bind}`;
    }

    console.log(window1("binding"));
   

// Principle 2

// code example for Implicit Binding

   
    const obj = {
    key1: "value1",
    key2: "value2",
    method: function() {
        return `${this.key1} uses ${this.key2}`;
    }
    }
    console.log(obj.method());
    

// Principle 3

// code example for New Binding

    
    function ConstructorFunc(param1) {
        this.key3 = param1;
        this.keyFunc = function() {
                return `this is a method that uses ${this.key3}`
            };
    }

    const newObj = new ConstructorFunc("key3");

    console.log( newObj.keyFunc());
    

// Principle 4

// code example for Explicit Binding

  
const obj1 = {
  key: "value"
}

const array = ["0","1","2"];


function introduce(params) {
  debugger;
  return `this is my ${this.key} and these are from an array: ${params}`;
}

console.log(introduce.call(obj1, array));

    