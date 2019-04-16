# ERR

```javascript
var p1 = Promise.resolve(1);
var p2 = Promise.resolve(p1);
var p3 = new Promise(function (resolve,reject) {
    resolve(1);
})
var p4 = new Promise(function (resolve, reject) {
    resolve(p1);
})

console.log(p1===p2);
console.log(p1===p3);
console.log(p2===p3);
console.log(p3===p4);

p4.then(function (val) {
    console.log('p4='+ val);
})

p2.then(function (val) {
    console.log('p2='+ val);
})

p1.then(function (val) {
    console.log('p1='+ val);
})
// true
// false
// false
// false
// p4=1
// p2=1
// p1=1

//promise.solve()
// 可接受一个值 || 一个promise obj
//返回值         返回这个promise obj

//new Promise 创建一个新的obj
//所以即使两个 new Promise里面一样 但是保存的内存地址却不同
```