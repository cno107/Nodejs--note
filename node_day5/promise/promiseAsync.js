
var p1 = new Promise(function (resolve, reject) {
    resolve('success');
});

p1.then(function (val) {
    console.log(val)
})

console.log("AAA");

// AAA
// success

//
