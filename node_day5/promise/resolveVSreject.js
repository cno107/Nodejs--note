
var p1 = new Promise(function (resolve, reject) {
    resolve(Promise.resolve('resolve'));
})

var p2 = new Promise(function (resolve, reject) {
    resolve(Promise.reject('reject'));
})

var p3 = new Promise(function (resolve, reject) {
    reject(Promise.resolve('resolve'));
})

p1.then(function (val) {
    console.log('p1[val] = '+ val)
},function (err) {
    console.log('p1[err] = '+ err)
})

p2.then(function (val) {
    console.log('p2[val] = '+ val)
},function (err) {
    console.log('p2[err] = '+ err)
})

p3.then(function (val) {
    console.log('p3[val] = '+ val)
},function (err) {
    console.log('p3[err] = '+ err)
})

// p1[val] = resolve
// p2[err] = reject
// p3[err] = [object Promise]

//resolve()可以打开内部Promise obj
//rejec() 不行  所以返回[object Promise]
