var express = require('express') // 加载express模块
var app = express() // 启动Web服务器
var router = express.Router()

var path = require('path')
// 引入path模块的作用：因为页面样式的路径放在了bower_components，告诉express，请求页面里所过来的请求中，如果有请求样式或脚本，都让他们去bower_components中去查找
// ****************************=================================
var mysql = require('mysql') // 加载mysql模块
const common = require('./public')
var pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'dbtest'
})

function query(sql, callback) {
  pool.getConnection(function(err, connection) {
    // Use the connection
    connection.query(sql, function(err, rows) {
      callback(err, rows)
      connection.release()//释放链接
    })
  })
}
// ****************************=================================
// app.locals.moment = require('moment'); // 载入moment模块，格式化日期

// var serveStatic = require('serve-static');  // 静态文件处理
// app.use(serveStatic('public')); // 路径：public

var bodyParser = require('body-parser')
// 因为后台录入页有提交表单的步骤，故加载此模块方法（bodyParser模块来做文件解析），将表单里的数据进行格式化
// app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())
var port = process.env.PORT || 3000 // 设置端口号：3000
app.listen(port) // 监听 port[3000]端口
console.log('start on port' + port)

//login
app.post('/api/user/login', function(req, res) {
  console.log(req)
  const arrInfo = `select lgInfoArr from userinfo where name='${req.body.name}' `
  const sql = `select * from userinfo where name='${req.body.name}' `
  const userAgent = common.checkDevices(req.headers['user-agent'])
  const timestamp = Date.parse(new Date())

  /*arrInfo*/
  let lgInfoArr
  query(arrInfo, function(err, result) {
    console.log('arrInfo_result', result)
    // if(result[0].lgInfoArr!=null){
    lgInfoArr = '[]'||result[0].lgInfoArr
    console.log('zzzzzzzzzzzzzzz', lgInfoArr)
    const arr = JSON.parse(lgInfoArr)
    arr.push({ lgDevice: userAgent, lgTime: timestamp })
    console.log('req:', req.headers, 'req2:', timestamp, arr, JSON.stringify(arr))
    const loginInfo2 = `update userinfo set loginTime='${timestamp}',typed='${userAgent}',lgInfoArr='${JSON.stringify(arr)}' where name='${req.body.name}'`
    /*添加时间和设备类型*/
    query(loginInfo2, function(err, rows) {
      console.log(loginInfo2, 'loginInfo:', rows)
      if (err) {
        console.log('loginInfo_err', err)
      } else {
        query(sql, function(err, result) {
          console.log('==========result', result[0].typed)
          if (err) {
            console.log('err', err)
            res.json({ status: 'dberr', message: err })
          } else {
            if (result.length > 0) {
              /* >0用户名存在*/
              return res.json({
                status: 'success',
                message: '登陆成功',
                data: { typed: result[0].typed, loginTime: result[0].loginTime, lgInfoArr: JSON.parse(result[0].lgInfoArr) }
              })
            } else if (result.length == 0) {
              return res.json({ status: '01', message: '用户名不存在' })
            } else {
              return res.json({ status: '02', message: 'db error' })
            }
          }
        })
      }
    })
    // }
  })

  /**/

  // allmodle.usermes.findByNP(nickname, password, function (err, np) {
  //   if (err) {
  //     console.log(err);
  //     var mes = "请求错误!";
  //     res.json({mes: mes});
  //   } else if (np.length > 0) {
  //     res.json({nickname: np[0].nickname});
  //   } else if (np.length === 0) {
  //     var mes = "用户名或密码错误!";
  //     res.json({mes: mes});
  //   }
  // });
})
//register
app.post('/api/user/register', function(req, res) {
  const sql = `insert into userinfo(name,psw,age,sex,tel,email) values('${req.body.name}','${req.body.psw}',
  '${req.body.age}','${req.body.sex}','${req.body.tel}','${req.body.email}')`

  /*查重*/
  query(sql, function(err, rows) {
    if (err) {
      console.log('err', err)
    } else {
      const data = {
        status: 'success',
        data: req.body
      }
      if (req.body || req.query) {
        res.json(data)
      } else {
        res.send('data err')
      }
    }
  })
})
//logout
app.post('/api/user/logout', function(req, res) {
  // console.log('sql:',sql)
  // query(function (err, rows) {
  //   if (err) {
  //     console.log('err',err)
  //   } else {
  //     res.json({message:'scuuess'});
  //   }
  // })
  res.json({ message: 'scuuess' })
})
// user-agent'
app.post('/api/user/updateLoginInfo', function(req, res) {
  // query(function (err, rows) {
  //   if (err) {
  //     console.log('err',err)
  //   } else {
  //     res.json({message:'scuuess'});
  //   }
  // })
  res.json({ message: 'scuuess' })
})
//
/*app.POST('/api/user/uploadImgs', function (req, res) {
  // query(function (err, rows) {
  //   if (err) {
  //     console.log('err',err)
  //   } else {
  //     res.json({message:'scuuess'});
  //   }
  // })
  res.json({message:'scuuess'});
});*/

