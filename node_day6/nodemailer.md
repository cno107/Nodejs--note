# nodemailer

```
npm install nodemailer --save
```

```javascript
'use strict';

const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    // host: 'smtp.ethereal.email',
    service: 'qq', // 使用了内置传输发送邮件 查看支持列表：https://nodemailer.com/smtp/well-known/
    port: 465, // SMTP 端口
    secureConnection: true, // 使用了 SSL
    auth: {
        user: '376693593@qq.com',
        // 这里密码不是qq密码，是你设置的smtp授权码
        pass: 'vbsmjzyqtswfbibc',   
    }
});

let mailOptions = {
    from: '"裴宏博" <376693593@qq.com>', // sender address
    to: 'peihongbo1998@gmail.com', // list of receivers
    subject: 'tittle-cno107', // Subject line
    // 发送text或者html格式
    // text: 'Hello world?', // plain text body
    html: '<b>Hello world!!!</b>' // html body
};

// send mail with defined transport object
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
    // Message sent: <04ec7731-cc68-1ef6-303c-61b0f796b78f@qq.com>
});
```

+ 参考

  [1]: https://segmentfault.com/a/1190000012251328
  [2]: https://nodemailer.com/about/

  

  