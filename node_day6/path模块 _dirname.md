# path模块 & _dirname  _filename

+ **path . join( _dirname ,  ' path '  )**   拼串path变为绝对路径

  ```javascript
  console.log(path.join(__dirname,'././aaa.txt'));
  // aaa前面所有的. /都会自动删   所以 aaa  /aaa ./aaa 结果一样
  ```

+ path . basename (  path ,  [ext ]  )

  - path最后的文件名 aaa.txt  
  -  [ext ] 可选填拓展名 ‘txt ’      结果变为aaa

+ path . dirname (  path  )    路径文件名前的部分

+ path . extname (  path  )  最后的拓展名

+ path . parse ( path )  返回一个obj 具体自己看例子

  ```javascript
  { root: '/',
    dir: '/Users/cno.107/Desktop',
    base: '练习',
    ext: '',
    name: '练习' }
  ```

+ path . isAbsolute ( path ) 

<hr>

###_dirname  _filename

+  ``_dirname``**动态获取**   当前文件模块(夹)的绝对路径

+  ``_filename``**动态获取**   当前文件的绝对路径

+ 他俩都不受node命令行所在处的影响

+ 路径拼接 用path. join()

  

  

  

  