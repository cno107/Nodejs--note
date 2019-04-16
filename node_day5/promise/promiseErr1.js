
var p1= new Promise(function (resolve, reject) {
    foo.bar(); //error
    resolve(1);
})
var p2= new Promise(function (resolve, reject) {
    resolve(2);
})

p1.then(function (val) {
    console.log('?p1 then val:'+ val);
},function (err) {
    console.log('?p1 then err:'+ err);
}).then(function (val) {
    console.log('??p1 then val:'+ val);
    return 1;
},function (err) {
    console.log('??p1 then err:'+ err);
}).then(function (val) {
    console.log('???p1 then val:'+ val);
},function (err) {
    console.log('???p1 then err:'+ err);
})

p2.then(function (val) {
    console.log('?p2 then val:'+ val)
    foo.bar()
},function (err) {
    console.log('?p2 then err:'+ err);
}).then(function (val) {
    console.log('??p2 then val:'+ val)
},function (err) {
    console.log('??p2 then err:'+ err);
    return 2;
}).then(function (val) {
    console.log('???p2 then val:'+ val)
},function (err) {
    console.log('???p2 then err:'+ err);
})

// ?p1 then err:ReferenceError: foo is not defined
// ?p2 then val:2
// ??p1 then val:undefined
// ??p2 then err:ReferenceError: foo is not defined
// ???p1 then val:1
// ???p2 then val:2

//p1 (1)err进第二个参数，成功但没有return
//   (2)进第一个 因为没得到val 所以为undefined 但return 1
//   (3)进第一个 且得到了val 正常输出

//p2 (1)进第一个参数，输出 报错 且没return
//   (2)err进第二个 得到了err且正常输出err  然后return 2
//   (3)正常进第一个 且得到了val 正常输出

//then的cb是交替执行的
//then第二个参数 处理异常信息 处理完之后 恢复正常(后续不受影响)
