<template>
  <div class="dashboard-container">
    <!--<div class="dashboard-text">name:{{name}}</div>-->
    <!--<div class="dashboard-text">roles:<span v-for='role in roles' :key='role'>{{role}}</span></div>-->

    <el-tabs v-model="activeName" style="padding-left: 0px;">
      <!--<span>start</span>-->
      <el-tab-pane label="用户" name="" :disabled="true">
       </el-tab-pane>
      <el-tab-pane label="用户管理" name="first">
        <el-row :gutter="20">
          <!--{{realize}}-->
         <!-- <span>
            <svg t="1492500959545" @click="" class="svg-icon hamburger" style="" viewBox="0 0 1024 1024"
                 version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1691" xmlns:xlink="http://www.w3.org/1999/xlink" width="64" height="64">
              <path d="M966.8023 568.849776 57.196677 568.849776c-31.397081 0-56.850799-25.452695-56.850799-56.850799l0 0c0-31.397081 25.452695-56.849776 56.850799-56.849776l909.605623 0c31.397081 0 56.849776 25.452695 56.849776 56.849776l0 0C1023.653099 543.397081 998.200404 568.849776 966.8023 568.849776z"
                    p-id="1692"></path>
              <path d="M966.8023 881.527125 57.196677 881.527125c-31.397081 0-56.850799-25.452695-56.850799-56.849776l0 0c0-31.397081 25.452695-56.849776 56.850799-56.849776l909.605623 0c31.397081 0 56.849776 25.452695 56.849776 56.849776l0 0C1023.653099 856.07443 998.200404 881.527125 966.8023 881.527125z"
                    p-id="1693"></path>
              <path d="M966.8023 256.17345 57.196677 256.17345c-31.397081 0-56.850799-25.452695-56.850799-56.849776l0 0c0-31.397081 25.452695-56.850799 56.850799-56.850799l909.605623 0c31.397081 0 56.849776 25.452695 56.849776 56.850799l0 0C1023.653099 230.720755 998.200404 256.17345 966.8023 256.17345z"
                    p-id="1694"></path>
            </svg>
          </span>-->
          <el-col :xs="12" :sm="8" :lg="6" v-for="(item,index) in imgs" :key="index" style="position: relative;">
           <!--<div>-->
             <img :src="item.img" alt="" class="use_img" >
           <!--</div>-->
           <div class="use_cont" style="">
             <span >{{item.title}}</span>
           </div>
          </el-col>

        </el-row>
        <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;" v-if="'first'==activeName">
          <LineChart :chart-data="lineChartData" v-if="false"></LineChart>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="配置管理" name="second">
        <el-row :gutter="20">
        <el-col :xs="24" :sm="8" :lg="8" class="ul_vh">
          <div>
            <ul>

              <li  v-for="item in JSON.parse(deviceInfo).lgInfoArr.reverse()" style="padding-bottom: 10px">
                <!--<div><span>设备名称：<b>{{JSON.parse(deviceInfo).typed}}</b></span></div>-->
                <!--<div><span>登陆时间：<b>{{Number(JSON.parse(deviceInfo).loginTime)|timeFilter}}</b></span></div>-->
                <!--<br>-->
                <div><span>设备名称：<b>{{item.lgDevice}}</b></span></div>
                <div><span>登陆时间：<b>{{item.lgTime|timeFilter}}</b></span></div>
              </li>
            </ul>
          </div>
        </el-col>
        <el-col :xs="24" :sm="8" :lg="8" class="ul_vh" v-if="'second'==activeName">
          <!--<div>-->
           <!--bbbbbbbb-->
          <!--</div>-->
          <bar1 :chart-data="lineChartData"></bar1>
        </el-col>
        <el-col :xs="24" :sm="8" :lg="8" class="ul_vh">
          <div>
            <div v-for="item in listBox">
              {{item.lable}}<input type="checkbox" ref="firbox" :value="item.id"  @click="firBox($event,$refs.firBox,item.children)">
             <div v-for="subItem in item.children" style="margin-left: 20px">
                {{subItem.lable}}<input type="checkbox" ref="secbox" :value="subItem.id" v-model="subSelected" @click="secBox($event,subItem.children)">

               <div v-for="thirItem in subItem.children" style="margin-left: 40px">
                 {{thirItem.lable}}<input type="checkbox" ref="thirbox" :value="thirItem.id" v-model="thirSelected"  @click="thirBox($event,thirItem.children)">
               </div>
              </div>
            </div>
          </div>
        </el-col>
        </el-row>
        <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;" v-if="'second'==activeName">
          <LineChart :chart-data="lineChartData"></LineChart>
        </el-row>

      </el-tab-pane>
      <el-tab-pane label="角色管理" name="third">
        <div >
          <ul class="box">
            <li class="liImg" v-for="(item,index) in listImg" :key="index">
              <img :src="item.img" alt="">
              <div style="display: inline-block;vertical-align: top">
                <p>{{item.type}}</p>
                <p><span><i class="el-icon-edit"></i></span><span>&nbsp;说明</span></p>
                <p><span><i class="el-icon-edit"></i></span></p>
              </div>
            </li>
          </ul>
        </div>
      </el-tab-pane>
      <el-tab-pane label="定时任务补偿" name="fourth">
      <!--<p class="test_a">-->

        <!--<i class="icon iconfont icon-liaotianduihua-xianxing"></i>-->
        <!--<i class="icon iconfont icon-yonghu"></i>用户-->
        <!--<i class="icon iconfont icon-liaotianduihua"></i>用户-->
        <!--<i class="icon iconfont icon-shangchuandaochu"></i>-->
        <!--<i class="icon iconfont icon-xiazaidaoru"></i>-->
        <!--<svg-icon icon-class="user"></svg-icon>-->

      <!--</p>-->
        <el-container>
          <!--<el-header style="border: 1px solid;">Header</el-header>-->
          <el-main style="border: 1px solid;">
            <el-row :gutter="20">
              <el-col :xs="12" :sm="8" :md="8" :lg="6" :xl="1" v-for="(item,index) in listImg" :key="index">
                <div class="grid-content bg-purple col-par">
                    <img :src="item.img" alt="" style="" class="col_img">
                  <div class="col_div">
                    <span class="spa1">{{item.type}}</span><br>
                    <span class="spa2">{{item.type}}</span>
                  </div>
                </div>
              </el-col>
            </el-row>
          </el-main>
          <el-footer style="border: 1px solid;">Footer</el-footer>
        </el-container>
      </el-tab-pane>
      <el-tab-pane label="flex" name="five">
        <!--<el-container>-->
          <el-main style="border: 1px solid;">
            <div style="display: flex;justify-content: space-between" v-if="false">
              <div style="flex-grow: 1;flex-wrap: wrap;" v-for="(item,index) in listImg" :key="index">
                <div class="grid-content bg-purple col-par">
                  <img :src="item.img" alt="" style="" class="col_img">
                  <div class="col_div">
                    <span class="spa1">{{item.type}}</span><br>
                    <span class="spa2">{{item.type}}</span>
                  </div>
                </div>
              </div>
            </div>
          </el-main>
        <div @click="toUrl($event)">
          <!--<a href="http://www.baidu.com" target="_blank">baidu</a>-->
          <a :href="aUrl" target="_blank">baidu</a>
        </div>
        <div class="block">
          <span class="demonstration">带快捷选项</span>
          <el-date-picker
            v-model="value7"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @blur="chandate(value7)"
          >
            <!--:picker-options="pickerOptions2"-->
          </el-date-picker>
        </div>
        <el-footer style="border: 1px solid;">Footer</el-footer>
        <!--</el-container>-->
        <!--action="https://jsonplaceholder.typicode.com/posts/"-->
        <el-upload
          class="avatar-uploader"
          action="https://httpbin.org/post"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>

      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  // import './demo/font_fpaif57uoit/demo.css'
  // import './demo/font_fpaif57uoit/iconfont.css'
  // import '../../assets/icon/demo.css'
  // import '../../assets/icon/iconfont.css'

import { mapGetters } from 'vuex';
import { formatTime } from '@/utils/index';
import LineChart from '../card/components/LineChart';
import bar1 from '../card/components/bar1';
import {updataDashboard} from '@/api/newLogin'
let arrImg=[
  {img:require('@/assets/imgs/guge.png'),title:'火狐火狐火狐火狐'},
  {img:require('@/assets/imgs/guge.png'),title:'谷歌'},
  {img:require('@/assets/imgs/guge.png'),title:'IE'},
  {img:require('@/assets/imgs/guge.png'),title:'安卓'},
  {img:require('@/assets/imgs/guge.png'),title:'安卓'},
];
const lineChartData = {
  newVisitis: {
    expectedData: [10, 12, 11, 11, 10, 11, 12],
    // actualData: [120, 82, 91, 154, 162, 140, 145]
  },
  messages: {
    expectedData: [200, 192, 120, 144, 160, 130, 140],
    actualData: [180, 160, 151, 106, 145, 150, 130]
  },
  purchases: {
    expectedData: [80, 100, 121, 104, 105, 90, 100],
    actualData: [120, 90, 100, 138, 142, 130, 130]
  },
  shoppings: {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130]
  }
};
// 链接：https://juejin.im/post/5ad718e66fb9a028c22b4d27
export default {
  name: 'dashboard',
  components: {
    LineChart,
    bar1
  },
  computed: {
    ...mapGetters([
      'name',
      'roles',
      'deviceInfo'
    ]),
    // realize(){
    //   window.onresize = function(){
    //     console.log(window.innerWidth)
    //   }
    // },
  },
  data(){
    return{
      value7:[],
      aUrl:'',
      blank:'',
      isShow:true,
      activeName:'first',
      imgs:arrImg,
      lineChartData: lineChartData.newVisitis,
      // data:[1,2,3,4,5,6,7,8,9,10],
      listImg:[
        {
          img:require('@/assets/imgs/guge.png'),
          type:'中国科技大学博物',
        },
        {
          img:require('@/assets/imgs/guge.png'),
          type:'Web',
        },
        {
          img:require('@/assets/imgs/guge.png'),
          type:'Web',
        },
        {
          img:require('@/assets/imgs/guge.png'),
          type:'Web',
        },
        {
          img:require('@/assets/imgs/guge.png'),
          type:'Web',
        },
        {
          img:require('@/assets/imgs/guge.png'),
          type:'Web',
        },
        {img:require('@/assets/imgs/guge.png')},
        {img:require('@/assets/imgs/guge.png')},
        {img:require('@/assets/imgs/guge.png')},
        {img:require('@/assets/imgs/guge.png')},
        {img:require('@/assets/imgs/guge.png')},
        {img:require('@/assets/imgs/guge.png')},
        {img:require('@/assets/imgs/guge.png')},
        {img:require('@/assets/imgs/guge.png')},
      ],
      lgInfo:[],
      subSelected:[],
      thirSelected:[],
      listBox:[
        {
          id:1,
          lable:'1',
          children:[
            {
              id:10,
              lable:'10',
              children:[
                {
                  id:100,
                  lable:'100',
                }
              ]
            },
            {
              id:11,
              lable:'11',
              children:[
                {
                  id:110,
                  lable:'110',
                }
              ]
            }
          ]
        },
        {
          id:2,
          lable:'2',
          children:[
            {
              id:20,
              lable:'20',
              children:[
                {
                  id:200,
                  lable:'200',
                }
              ]
            },
            {
              id:21,
              lable:'21',
              children:[
                {
                  id:210,
                  lable:'210',
                }
              ]
            }
          ]
        },
        {
          id:3,
          lable:'3',
          children:[
            {
              id:30,
              lable:'30',
            }
          ]
        }
      ],
      dataPro:{name:"zaf"},
      imageUrl: ''

    }
  },
  created(){
    // console.log('deviceInfo',this.deviceInfo);
    // console.log('$bus',this.$bus.emit('eventName',this.dataPro))
    updataDashboard().then((res)=>{
      console.log('updataDashboard',res)
    })
    this.$root.Bus.$emit('doTest','fei');
    this.$root.Bus.$emit('doTest2','ali');
    console.log('this.$root',this.$root,this.$root.Bus)
  },
  filters:{
    timeFilter(val){
      return formatTime(val)
    }
  },
  methods:{
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'||png;
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    chandate(val){
      console.log('date',val,val[0]<val[1]);
      if(val[0]>val[1]){
        // val[0]='';
        // this.value7=[]
        // this.$message({
        //   type:'warning',
        //   message:'开始应小于结束！'
        // })
        this.$message({
          type:'warning',
          message:'开始应小于结束！'
        })
      }
      // console.log('val2',val,'value7',this.value7)
    },
    toUrl(e){
      if(1==2){
        this.aUrl='www.baidu.com';
      }else {
        this.aUrl='jsvascript:void(0)';
        // this.blank='';
        e.preventDefault();
        // this.$message({
        //   type:'warning',
        //   message:'别点了，用不了！'
        // })
      }
      // return false
    },
    firBox(e,subChild){
      console.log(e.target,subChild);
      this.subSelected=[];
      this.thirSelected=[];
      if(e.target.checked){
        // this.subSelected.push(10,11,100,101);
        for(let item of subChild){
          this.subSelected.push(item.id);
          for(let subitem of item.children){
            this.thirSelected.push(subitem.id);
          }
        }
      }else{
        this.subSelected=[];
        this.thirSelected=[];
      }
        // for(let i=0;i<subChild.length;i++){
        //   console.log('2222',subChild[i].id,this.$refs.secbox[i].value)
        //   if(subChild[i].id==this.$refs.secbox[i].value){
        //     this.$refs.secbox[i].checked=true;
        //     for(let j=0;j<subChild[i].children.length;j++){
        //       console.log()
        //       if(subChild[i].children[j].id==this.$refs.thirbox[i].value){
        //         this.$refs.thirbox[i].checked=true;
        //       }
        //     }
        //   }
        // }

      // }else {
      //   for(let i=0;i<subChild.length;i++){
      //     if(subChild[i].id==this.$refs.secbox[i].value){
      //       this.$refs.secbox[i].checked=false;
      //       for(let j=0;j<subChild[i].children.length;j++){
      //         console.log()
      //         if(subChild[i].children[j].id==this.$refs.thirbox[i].value){
      //           this.$refs.thirbox[i].checked=false;
      //         }
      //       }
      //     }
      //   }
      // }
    },
    secBox(e,subChild){
      for(let i=0;i<subChild.length;i++){
        // if(subChild[i].id==this.$refs.secbox[i].value){
        //   this.$refs.secbox[i].checked=true;
        if(!this.$refs.secbox[i].checked){
          this.$refs.firbox[i].indeterminate=true
        }

          // for(let j=0;j<subChild[i].children.length;j++){
          //   console.log()
          //   if(subChild[i].children[j].id==this.$refs.thirbox[i].value){
          //     this.$refs.thirbox[i].checked=true;
          //   }
          // }
        // }
      }
    },
    thirBox(e){

    },

    handleClose(e) {
      // console.log('e:',e)
      this.isShow = false;
    },
  },
  beforeDestroy(){
    // this.$bus.emit("eventName",this.dataPro);
    this.$root.Bus.$emit('eventName', this.dataPro)
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    /*margin: 30px;*/
    margin-top: 0;
    margin-left: 0;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
  .ul_vh{
    height: 500px;
    border: 1px solid;
    div{
      /*text-align: center;*/
    }
  }
  *{
    box-sizing: border-box;
  }
  ul,li{
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .box{
    display: flex;
    flex-wrap: wrap;
    .liImg{
      border: 1px solid;
      display: inline-block;
      width: 250px;
      /*flex-grow: 1;*/
      img{
        width: 100px;
      }
    }
  }


.show {
  width: 100px;
  height: 100px;
  background-color: red;
}
.use_img{
  width: 121px;
}
.use_cont{
  position: absolute;
  top: 31px;
  left: 119px;
}
  /*<768*/
.col-par{
  overflow: hidden;
  .col_img{
    width: 100px;
    float: left;
  }
  .col_div{
    float: left;
    font-size: 14px;
    .spa1{
      margin-top: 15px;
      margin-bottom: 5px;
      display: inline-block;
    }
    .spa2{
      margin:5px 0;
      display: inline-block;
    }
  }
}

@media screen and (max-width: 768px) {
  .dashboard-container{
    .use_img{
      width: 80px;
    }
    .use_cont{
      position: absolute;
      top: 23px;
      left: 80px;
      font-size: 12px;
    }
  }
}

@media screen and (max-width: 600px) {
  .dashboard-container{
    .liImg{
      width: 172px;
      /*flex-grow: 1;*/
      font-size: 12px;
      img{
        width: 70px;
      }
    }
  }
}
</style>
<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
<style lang="scss">
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  @media screen and (max-width: 600px) {
    .el-tabs__nav-scroll{
      position: relative;
      #tab-0{
        /*display: none;*/
      }
      .el-tabs__item.is-disabled{
        visibility: hidden;
      }
    }
  }
</style>
