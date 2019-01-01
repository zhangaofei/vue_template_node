<template>
  <div class="register">
    <!--<el-row :gutter="20">-->
      <!--<el-col :xs="12" :sm="8" :lg="6" style="position: relative;">-->

      <!--</el-col>-->
      <!--<el-col :xs="12" :sm="8" :lg="6" style="position: relative;">-->

      <!--</el-col>-->
      <!--<el-col :xs="12" :sm="8" :lg="6" style="position: relative;">-->

      <!--</el-col>-->
      <div class="reg-nav">
        <ul class="ul-left">
          <li><router-link to="/flex">增喜</router-link></li>
          <li><router-link to="/login">增喜</router-link></li>
        </ul>
        <ul class="ul-right">
          <li><router-link to="/login">登陆</router-link></li>
        </ul>
      </div>
      <div class="reg-cont">
        <el-form ref="regForm" :model="regForm" label-width="0px" class="reg-form">
          <el-form-item label="">
            <span class="reg-svg "><svg-icon icon-class="user" /></span>
            <el-input  class="el_put" v-model="regForm.name" placeholder="名称"></el-input>
          </el-form-item>
          <el-form-item label="">
            <span class="reg-svg svg-container_login"><svg-icon icon-class="user" /></span>
            <el-input v-model="regForm.psw" class="el_put" placeholder="密码"></el-input>
          </el-form-item>
          <el-form-item label="">
            <span class="reg-svg svg-container_login"><svg-icon icon-class="user" /></span>
            <el-input v-model="regForm.age" class="el_put" placeholder="年龄"></el-input>
          </el-form-item>
          <el-form-item label="">
            <span class="reg-svg svg-container_login"><svg-icon icon-class="user" /></span>
            <el-select v-model="regForm.sex" class="el_sel" placeholder="性别">
              <el-option label="男" value="男"></el-option>
              <el-option label="女" value="女"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="">
            <span class="reg-svg svg-container_login"><svg-icon icon-class="user" /></span>
            <el-input v-model="regForm.tel" class="el_put" placeholder="手机"></el-input>
          </el-form-item>
          <el-form-item label="">
            <span class="reg-svg svg-container_login"><svg-icon icon-class="user" /></span>
            <el-input v-model="regForm.email" class="el_put" placeholder="邮箱"></el-input>
          </el-form-item>
          <!--<el-form-item style="border: 0;">-->
            <!--<el-button type="primary" @click="onSubmit">注册</el-button>-->
          <!--</el-form-item>-->
          <div>
            <el-button type="primary" @click="onSubmit" style="width: 100%;">注册</el-button>
            <el-button style="width: 100%;margin-left: 0;margin-top: 10px">取消</el-button>
          </div>
        </el-form>
        <div>
          <el-form ref="form" :model="form" label-width="80px" class="form_n" :rules="rules">
            <el-form-item label="名称" prop="">
              <!--<span class="reg-svg "><svg-icon icon-class="user" /></span>-->
              <el-input  class="el_put" v-model="form.name" placeholder="名称"></el-input>
            </el-form-item>
          </el-form>
          <!--=======-->
          <div @click="refreshCode">
            <s-identify :identifyCode="identifyCode" />
          </div>

        </div>
      </div>
    <div class="reg-footer">
      <span>Copyright @2018 zaf</span>
    </div>
  </div>
</template>

<script>
  import Identify from '@/views/login/Identify'
  import {userRegister} from '@/api/newLogin'
  export default {
    name: "register",
    components: {
      Identify
    },
    data() {
      return {
        // identifyCodes:'0123456789',
        rules:{
          name: [{ required: true, trigger: 'blur',message:'不为空'}],
        },
        identifyCodes: "1234567890",
        identifyCode: "",
        regForm:{
          name:'',
          psw:'',
          age:'',
          sex:'',
          tel:'',
          email:''
        },
        form:{
          name:''
        }
      }
    },
    created(){
      this.makeCode(4)
    },
    methods:{
      refreshCode(){
        this.identifyCode='';
        this.makeCode(4);
        console.log("gg")
      },
      getRandom(min,max){
       return Math.floor(Math.random()*(max-min)+min)
      },
      makeCode(len){
        for(let i=0;i<len;i++){
          this.identifyCode+=this.identifyCodes[this.getRandom(0,this.identifyCodes.length)]
        }
      },
      onSubmit(){
        userRegister(this.regForm).then(res => {
            console.log('res__',res)
          if(res.status=='success'){
              this.$router.push({path:'/login'})
            this.$message({
              type:'success',
              message:'注册成功！'
            })
          }
        })
      }
    }
  }
</script>

<!--scoped-->
<style rel="stylesheet/scss"  lang="scss">


.register{

  background: url("../../assets/imgs/reg-bg.jpg") no-repeat;
  background-size: cover;
  height: 100%;
  min-height: 550px;
  position: relative;
  .reg-nav{
    position: fixed;
    z-index: 101;
    width: 100%;
    top: 0;
    height: 60px;
    padding: 10px 15px;
    color: #fff;
    font-size: 18px;
    font-weight: 500;
    line-height: 42px;
    background: #5CACEE;
    ul,li{
      padding: 0;
      /*margin: 0;*/
      list-style: none;
    }
    .ul-left{
      margin: 0;
      float: left;
      li{
        display: inline-block;
        padding-right: 10px;
      }
    }
    .ul-right{
      margin: 0;
      float: right;
      display: inline-block;
      padding-right: 10px;
    }
  }
  .reg-cont{
    display: flex;
    justify-content: center;
    /*align-content: center;*/
    align-items: center;
    /*border: 1px solid;*/
    height: 500px;
    /*width: 800px;*/
    margin: auto;
    .reg-form{
      width: 270px;
      min-width: 270px;
      .el-form-item{
        border: 1px solid rgba(255,255,255,0.2);
        border-radius: 4px;
      }
      .el_put,.el_sel{
        width: 85%;

      }
      input{
        border: 0;
        background: transparent;
        color: #fff;
      }
      input::placeholder{
        color: #fff;
      }
      .reg-svg{
        padding: 8px;
        font-size: 20px;
      }
    }
    .form_n{
      .el-form-item .el-form-item__label:before {
        content: '*';
        color: #f56c6c;
        margin-right: 4px;
      }
    }

  }

  .reg-footer{
    position: absolute;
    width: 100%;
    bottom: 0;
    background: #ccc;
    text-align: center;
    font-weight: bold;
    color: #fff;
    height: 50px;
    line-height: 50px;
  }

}
</style>
