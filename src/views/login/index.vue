<template>
  <div class="login-container">
    <lang-select class="set-language"></lang-select>
    <el-form autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left" label-width="0px"
      class="card-box login-form">
      <!--<h3 class="title">vue-element-admin</h3>-->
      <!--<h3 class="title">{{$t('login.title')}}</h3>-->
      <h3 class="title">{{$t('login.title')}}</h3>
      <el-form-item prop="username">
        <span class="svg-container svg-container_login">
          <svg-icon icon-class="user" />
        </span>
        <el-input name="username" type="text" v-model="loginForm.name" autoComplete="on" placeholder="" />
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password"></svg-icon>
        </span>
        <el-input name="password" :type="pwdType" @keyup.enter.native="handleLogin" v-model="loginForm.psw" autoComplete="on"
          placeholder=""></el-input>
          <span class="show-pwd" @click="showPwd"><svg-icon icon-class="eye" /></span>
      </el-form-item>
      <el-form-item>
        <!--:loading="loading"-->
        <el-button type="primary" style="width:100%;"  @click.native.prevent="handleLogin">
         {{$t('login.signIn')}}
        </el-button>
      </el-form-item>
      <div class="tips">
        <span style="margin-right:20px;">username: admin</span>
        <span> password: admin</span>
        <span>
          <router-link to="register">注册</router-link>
        </span>
      </div>
    </el-form>
  </div>
</template>

<script>
  import langSelect from '@/components/langSelect'
import { isvalidUsername } from '@/utils/validate'
import axios from 'axios'
//new api
import {login} from '@/api/newLogin'


export default {
  name: 'login',
  components:{
    langSelect
  },
  data() {
    // const validateUsername = (rule, value, callback) => {
    //   if (!isvalidUsername(value)) {
    //     callback(new Error('请输入正确的用户名'))
    //   } else {
    //     callback()
    //   }
    // }
    // const validatePass = (rule, value, callback) => {
    //   if (value.length < 5) {
    //     callback(new Error('密码不能小于5位'))
    //   } else {
    //     callback()
    //   }
    // }
    return {
      loginForm: {
        name: 'zaf',
        psw: '123'
      },
      loginRules: {
        // username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        // password: [{ required: true, trigger: 'blur', validator: validatePass }]
      },
      loading: false,
      // pwdType: 'password',
      pwdType: '',
      dataPro:null
    }
  },
  created(){
    //


  },
  methods: {
    showPwd() {
      if (this.pwdType === 'password') {
        this.pwdType = ''
      } else {
        // this.pwdType = 'password'
        this.pwdType = ''
      }
    },
    handleLogin() {
      // console.log('$axios',this.$axios,'====',axios);
      // axios.post('/api/user/login',this.loginForm).then((res) => {
      //   // this.articles = res.data;
      //   // this.articles.map((article) => {
      //   //   article.post_time = this.timeFormat(article.post_time);
      //   // })
      //   console.log('web_res',res)
      // }).catch((err) => {
      //   console.log('err', err);
      // });
          this.$store.dispatch('Login', this.loginForm).then((res) => {
            // this.loading = false
            // this.$router.push({ path: '/' })
            console.log('res=====login',res)
            if(res.status=='success'){
              this.$message({
                type:'success',
                message:'登陆成功！'
              });
              this.$router.push({ path: '/dashboard' });
              this.dataPro=res.data
            }else {
              this.$message({
                type:'warning',
                message:res.message
              })
            }

          }).catch((e) => {
            this.loading = false;
            console.log('err',e)
          })

    }
  },
}




















      // this.$refs.loginForm.validate(valid => {
      //   if (valid) {
      //     this.loading = true
      //     this.$store.dispatch('Login', this.loginForm).then(() => {
      //       this.loading = false
      //       this.$router.push({ path: '/' })
      //     }).catch(() => {
      //       this.loading = false
      //     })
      //   } else {
      //     console.log('error submit!!')
      //     return false
      //   }
      // })


</script>

<style rel="stylesheet/scss" lang="scss">
  $bg:#2d3a4b;
  $dark_gray:#889aa4;
  $light_gray:#eee;

  .login-container {
    /*position: fixed;*/
    height: 100%;
    width:100%;
    /*min-height: 550px;*/
    overflow: hidden;
    margin-bottom: 0;
    background-color: $bg;
    input:-webkit-autofill {
      -webkit-box-shadow: 0 0 0px 1000px #293444 inset !important;
      -webkit-text-fill-color: #fff !important;
    }
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
    }
    .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;
    }
    .tips {
      font-size: 14px;
      color: #fff;
      margin-bottom: 10px;
    }
    .svg-container {
      padding: 6px 5px 6px 15px;
      color: $dark_gray;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
      &_login {
        font-size: 20px;
      }
    }
    .title {
      font-size: 26px;
      font-weight: 400;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
    .login-form {
      position: absolute;
      left: 0;
      right: 0;
      width: 400px;
      padding: 35px 35px 15px 35px;
      margin: 120px auto;
    }
    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }
    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
      user-select:none;
    }
    .thirdparty-button{
      position: absolute;
      right: 35px;
      bottom: 28px;
    }
    .set-language {
      color: #fff;
      position: absolute;
      top: 5px;
      right: 0px;
    }
  }
</style>
