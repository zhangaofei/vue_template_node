/**
 * Created by renka on 2018/8/13.
 */

//引入express及其路由中间件
let express = require('express');
let router = express.Router();
let query = require('../db');
//nodejs原生文件模块
let fs = require('fs');
//文件上传 npm包
let multer  = require('multer');

// 使用 硬盘存储模式 设置存放接收到的文件的路径以及文件名
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // 接收到文件后输出的保存路径（若不存在则需要创建）
    cb(null, './public/img');
  },
  filename: function (req, file, cb) {
    // 将保存文件名设置为 时间戳 + 文件原始名，比如 151342376785-123.jpg
    cb(null,file.originalname);
  }
});

// 创建文件夹 ，params: path
let createFolder = function(folder){
  try{
    //同步地检查 path 指定的文件或目录是否存在
    fs.accessSync(folder);
  }catch(e){
    // 文件夹不存在，以同步的方式创建文件目录。
    fs.mkdirSync(folder);//同步地创建目录
  }
};

//在public文件夹下，创建img文件夹
let uploadFolder = './public/img';
createFolder(uploadFolder);

// 创建 multer 对象
let upload = multer({ storage: storage });

/* 上传文件的映射*/
router.post('/api/user/uploadImgs', upload.single('file'), function(req, res, next) {
  console.log('upload:\n',req.file);
  let file = req.file;
  // console.log('文件类型：', file.mimetype);
  // console.log('原始文件名：', file.originalname);
  // console.log('文件大小：', file.size);
  // console.log('文件保存路径：', file.path);
  // 接收文件成功后返回数据给前端
  let sql=`update userinfo set imgUrl='/public/img/${req.file.originalname}' where name='zaf'`;
  // let sql=`UPDATE into userInfo (imgUrl) value ('/public/img/${req.file.originalname}')`;
  query(sql,(err,rows)=>{
    if(err){
      console.log('err',err)
    }else {
      res.json({ok: '0',status:'success',msg:'上传成了'});
      res.end('上传成了！');
    }
  })
});
router.post('/api/user/imgList', function(req, res, next) {
  let sql=`select * from userinfo where name='${req.body.name}' `;
  query(sql,(err,rows)=>{
    if(err){
      console.log('err',err)
    }else {
      console.log('rows',rows[0].imgUrl)
      res.json({status:'success',msg:'获取好了',imgList:rows[0].imgUrl.toString()});
    }
  })
});
// 输出模块（在 app.js 中引入）
module.exports = router;
