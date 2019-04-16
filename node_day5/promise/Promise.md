# Promise

+ promise内接收的函数是同步

  でも new Promise().then()中then里面的代码是异步的

+ then > conuter  why？

  promise( microtasks )   conter( macrotasks )  事件循环中先执行完所有micro ，

  而且micro执行完还可以一直往里添加 直到所有都执行完 才进行macro

+ **promise.solve()**

  可接受一个值 || 一个promise obj

  ​     返回值                   返回这个promise obj