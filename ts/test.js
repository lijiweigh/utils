"use strict";
exports.__esModule = true;
exports.m = void 0;
exports["default"] = 333;
exports.m = "abc";
var num = 333;
var bol = true;
var str = "abc";
var n = null;
var u = undefined;
var v = u;
var list = [1, 2, 3];
var list2 = [5, 6, 7];
var x = ["abc", 123];
var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Green"] = 1] = "Green";
    Color[Color["Blue"] = 2] = "Blue";
})(Color || (Color = {}));
var c = Color.Red;
function getSome(some) {
    return some.toString();
}
var tom = {
    name: "tom",
    age: 22
};
var tom2 = {
    name: "tom2"
};
var tom3 = {
    name: "tom3",
    age: 25,
    gender: "male"
};
var tom5 = {
    id: "aabccc",
    name: "tom5",
    age: 26,
    gender: "male"
};
tom5.id = "aaaa";
