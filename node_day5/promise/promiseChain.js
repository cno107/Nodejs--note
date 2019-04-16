
var p = new Promise(function (resolve, reject) {
    resolve(1);
})

p.then(function (val) {     // 1.then
    console.log('?:'+val);
    return val*2;
}).then(function (val) {   // 2.then
    console.log('??:'+val);
}).then(function (val) {   // 3.then
    console.log('???:'+val);
    return Promise.resolve('resolve');
}).then(function (val) {   // 4.then
    return Promise.reject('reject');
}).then(function (val) {    // 5.then
    console.log('resolve='+val);
},function (err) {
    console.log('reject='+err);
})

// ?:1
// ??:2
// ???:undefined
// reject=reject

//解析:
// (1)输出后 返回2
// (2)输出得到的2  不return  所以(3)得不到val undefined
// 虽然(3)啥也没有 但还是retun一个 promise的resolve状态
// (4)第一个参数专门接收resolve状态 所以成功 并return一个reject状态
// (5)第二个参数专门接收reject状态  所以进入第二个函数
