var ccc = new Date(2015, 0, 1);
var dnes = new Date(2015, 0, 1);
console.log("dnes: ", dnes);
console.log("dnes: hodnota", dnes.valueOf());
console.log("dnes: hodnota", dnes.toLocaleString("sk"));
console.log("dnes: month", dnes.getMonth());
var copy = new Date(dnes.toString());
console.log("copy: ", copy.toLocaleString("sk"));


var array = [];
array.push(1, 3, 5);
console.log(array);
array.splice(1, 1);
console.log(array);

for(var i = 0; i < array.length; i++) {
    console.log(array[i]);
}

var i2 = 0;
while(i2 < array.length) {
    console.log(array[++i2]);
}

i2 = 0;
do {
    console.log(array[++i2]);
} while(i2 < array.length)

array.forEach(function(prvok, index) {
    console.log(prvok, index);
});

console.log("global", this);
var obj = {
    meno: "miso",
    pozdrav: function() {
        console.log("obj", this);
        console.log("Ahoj " + this.meno);
    }
}
obj.pozdrav();

if(null || undefined || "" || 0 || {}) {
    console.log("true");
} else {
    console.log("false");
}

function ff(param, cislo) {
    if(param != undefined && param != null) {
        
    }
    if(param) {
        if(param.method) {
            param.method();
        }
    }

    if(cislo != undefined && cislo != null) {
        
    }
}

var string = '1volam2 sa \'Jano\'';
var string2 = 'volam sa \'Jano\'';
console.log(string);
console.log(string.charAt(0));
console.log("index of:", string.indexOf("xx"));
console.log("replace:", string.replace(/\d/g, "hohoho"));
console.log("after replace:", string);
console.log("string.match:", string.match(/(\d).*/g));
console.log("string.substring:", string.substring(5, 7));
console.log("string.toUpperCase:", string.toUpperCase());
var toSplit = "1, 2, 3, 4";
var pole;
console.log("string.split:", pole = toSplit.split(", "));
console.log("string.join:", pole.join(" - "));
console.log("string.trim:", "   'text'  ".trim());

if(string.indexOf("sa") != -1) {
    console.log("obsahuje 'sa'");
}
console.log("porovnanie: ", string <  string2);


var number = -2;

if(!Math.moje) {
    Math.moje = function(c) {

    }
}

console.log(Math.abs(number), typeof number);
console.log(isNaN(number));

var nieco = "nieco";
var o = {
    meno: "Jano " + nieco,
    f: function() {
        var funcVar = true;
        console.log(nieco);

        return "uz to ide";
    }
}
console.log(o.meno);
console.log(o.f());
f();

var f2 = function() {
    console.log("b");
}
f2();

function f() {
    var prem = "text";
    console.log(nieco);

    function vnorena() {
        console.log(prem);
    }
    vnorena();

    if(true) {
        var test = "test";
    }
    console.log(test);
}

// console.log(prem);