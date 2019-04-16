var p1= new Promise(function (resolve, reject) {
    resolve(1)
})

var p2= new Promise(function (resolve, reject) {
   setTimeout(function () {
       resolve(2)
   },50)
})

var p3= new Promise(function (resolve, reject) {
    setTimeout(function () {
        resolve(3)
    },50)
})

console.log(p1)
console.log(p2)
console.log(p3)

setTimeout(function () {
   console.log(p2);
},100)

setTimeout(function () {
    console.log(p3);
},100)

p1.then(function (val) {
    console.log(val);
})

p2.then(function (val) {
    console.log(val);
})

p3.catch(function (err) {
    console.log(err);
})

// Promise { 1 }
// Promise { <pending> }
// Promise { <pending> }
// 1
// 2
// Promise { 2 }
// Promise { 3 }
