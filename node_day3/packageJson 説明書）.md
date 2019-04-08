# package.json （説明書）

```bash
$ npm install --save co
```

在package.json中的"dependencies"里保存加载的package‘s name



``` bash
$ npm install     //安装package.json中的"dependencies"里所有的依存package
```

# package-lock.json

+ 保存node_modules中所有包的信息(版本,下载地址);
+ lock 用来锁定版本
  - 如果没有lock 重新下载时锁不住老版本 会自动升级