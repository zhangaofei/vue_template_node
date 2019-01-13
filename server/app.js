let express = require('express');  // 加载express模块
let app = express(); // 启动Web服务器
const router = express.Router();
const upload =require('./router/upload')
let path = require('path');
let query = require('./db');
// 引入path模块的作用：因为页面样式的路径放在了bower_components，告诉express，请求页面里所过来的请求中，如果有请求样式或脚本，都让他们去bower_components中去查找
// ****************************=================================
let common= require('./public');

// ****************************=================================
// app.locals.moment = require('moment'); // 载入moment模块，格式化日期
// let serveStatic = require('serve-static');  // 静态文件处理
// app.use(serveStatic('public')); // 路径：public
let joinPath = path.dirname('.' +
  '' +
  '/server/public');
console.log('joinPath',joinPath)
let bodyParser = require('body-parser');
// 因为后台录入页有提交表单的步骤，故加载此模块方法（bodyParser模块来做文件解析），将表单里的数据进行格式化
// app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
let port = process.env.PORT || 3000; // 设置端口号：3000

//login
app.post('/api/user/login', function (req, res) {console.log(req)
  let arrInfo=`select lgInfoArr from userinfo where name='${req.body.name}' `;
  let sql=`select * from userinfo where name='${req.body.name}' `;
  let userAgent=common.checkDevices(req.headers['user-agent']);
  let  timestamp = Date.parse(new Date());

  /*arrInfo*/
  let lgInfoArr;
  query(arrInfo, function (err, result) {
    // console.log('arrInfo',result[0].lgInfoArr);
      lgInfoArr=result[0].lgInfoArr||'[]';
      let arr=JSON.parse(lgInfoArr);
      arr.push({lgDevice:userAgent,lgTime:timestamp});
      console.log('req:',req.headers,'req2:',timestamp,arr,JSON.stringify(arr));
      let loginInfo2=`update userinfo set loginTime='${timestamp}',typed='${userAgent}',lgInfoArr='${JSON.stringify(arr)}' where name='${req.body.name}'`;
      /*添加时间和设备类型*/
      query(loginInfo2, function (err, rows) {
        console.log(loginInfo2,'loginInfo:',rows)
        if (err) {
          console.log('loginInfo_err',err)
        } else {
          query(sql, function (err, result) {
            console.log('==========result',result[0].typed);
            if (err) {
              console.log('err',err);
              res.json({status:'dberr',message:err});
            } else {

              if(result.length>0){
                /* >0用户名存在*/
                return res.json({
                  status:'success',
                  message:'登陆成功',
                  data:{typed:result[0].typed,loginTime:result[0].loginTime,lgInfoArr:JSON.parse(result[0].lgInfoArr)}
                });

              }else if(result.length==0){
                return res.json({status:'01',message:'用户名不存在'});
              } else {
                return res.json({status:'02',message:'db error'});
              }
            }
          })
        }
      });
  });
  // allmodle.usermes.findByNP(nickname, password, function (err, np) {
});
//register
app.post('/api/user/register', function (req, res) {

  let sql=`insert into userinfo(name,psw,age,sex,tel,email) values('${req.body.name}','${req.body.psw}',
  '${req.body.age}','${req.body.sex}','${req.body.tel}','${req.body.email}')`;

  /*查重*/
  query(sql, function (err, rows) {
    if (err) {
      console.log('err',err)
    } else {
      let data={
        status:'success',
        data:req.body
      };
      if(req.body||req.query){
        res.json(data);
      }else {
        res.send('data err')
      }
    }
  })
});
//logout
app.post('/api/user/logout', function (req, res) {
  res.json({message:'scuuess'});
});
// user-agent'
app.post('/api/user/updateLoginInfo', function (req, res) {
  res.json({message:'scuuess'});
});
app.use('/',upload);
// app.listen(port); // 监听 port[3000]端口
app.listen(port,()=>{
  console.log('start on port' + port);
  console.log('router:/n',router)
})

