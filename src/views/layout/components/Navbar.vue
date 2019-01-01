<template>
  <div>
    <el-menu class="navbar" mode="horizontal">
      <hamburger v-if="true" class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
      <!--<span>
        <svg t="1492500959545" @click="toggleSideBar" class="svg-icon hamburger" :class="{'is-active':sidebar.opened}" style="" viewBox="0 0 1024 1024"
             version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1691" xmlns:xlink="http://www.w3.org/1999/xlink" width="64" height="64">
          <path d="M966.8023 568.849776 57.196677 568.849776c-31.397081 0-56.850799-25.452695-56.850799-56.850799l0 0c0-31.397081 25.452695-56.849776 56.850799-56.849776l909.605623 0c31.397081 0 56.849776 25.452695 56.849776 56.849776l0 0C1023.653099 543.397081 998.200404 568.849776 966.8023 568.849776z"
                p-id="1692"></path>
          <path d="M966.8023 881.527125 57.196677 881.527125c-31.397081 0-56.850799-25.452695-56.850799-56.849776l0 0c0-31.397081 25.452695-56.849776 56.850799-56.849776l909.605623 0c31.397081 0 56.849776 25.452695 56.849776 56.849776l0 0C1023.653099 856.07443 998.200404 881.527125 966.8023 881.527125z"
                p-id="1693"></path>
          <path d="M966.8023 256.17345 57.196677 256.17345c-31.397081 0-56.850799-25.452695-56.850799-56.849776l0 0c0-31.397081 25.452695-56.850799 56.850799-56.850799l909.605623 0c31.397081 0 56.849776 25.452695 56.849776 56.850799l0 0C1023.653099 230.720755 998.200404 256.17345 966.8023 256.17345z"
                p-id="1694"></path>
        </svg>
      </span>-->
      <breadcrumb v-if="false"></breadcrumb>
      <div class="nav_right">
        <hamburger v-if="true" class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
      </div>
      <lang-select class="set-language"></lang-select>
      <el-dropdown class="el_dropdown avatar-container nav_icon" trigger="click">
        <div class="avatar-wrapper">
          <img class="user-avatar" :src="iconImg">
          <span>应用</span>
          <!--<i class="el-icon-caret-bottom"></i>-->
        </div>
        <el-dropdown-menu class="user-dropdown" slot="dropdown">
          <router-link class="inlineBlock" to="/">
            <el-dropdown-item >
              Home
            </el-dropdown-item>
          </router-link>
          <router-link class="inlineBlock" to="/example/table">
            <el-dropdown-item divided>
              table
            </el-dropdown-item>
          </router-link>
          <router-link class="inlineBlock" to="/card/card">
            <el-dropdown-item divided>
              card
            </el-dropdown-item>
          </router-link>
          <el-dropdown-item divided>
            <span @click="logout" style="display:block;">LogOut</span>
          </el-dropdown-item>
          <el-dropdown-item divided>
            这是一个唯独消息
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-dropdown class="el_dropdown avatar-container nav_icon" trigger="click" v-for="item in listTitle" :key="item.title">
        <div class="avatar-wrapper">
          <img class="user-avatar" :src="iconImg">
          <span>{{token}}</span>
          <!--<i class="el-icon-caret-bottom"></i>-->
        </div>
        <el-dropdown-menu class="user-dropdown" slot="dropdown">
          <router-link class="inlineBlock" to="/" v-for="subItem in item.subList" :key="subItem.title">
            <el-dropdown-item divided>
              {{subItem.title}}
            </el-dropdown-item>
          </router-link>
          <!--<router-link class="inlineBlock" to="/example/table">-->
          <!--<el-dropdown-item>-->
          <!--table-->
          <!--</el-dropdown-item>-->
          <!--</router-link>-->
          <!--<router-link class="inlineBlock" to="/card/card">-->
          <!--<el-dropdown-item>-->
          <!--card-->
          <!--</el-dropdown-item>-->
          <!--</router-link>-->
          <!--<el-dropdown-item divided>-->
          <!--<span @click="logout" style="display:block;">LogOut</span>-->
          <!--</el-dropdown-item>-->


        </el-dropdown-menu>
      </el-dropdown>
    </el-menu>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import langSelect from '@/components/langSelect'
export default {
  components: {
    Breadcrumb,
    Hamburger,
    langSelect
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'token',
      'showSide'
    ]),
  },
  created(){
    this.$root.Bus.$on('doTest',(val)=>{
      this.test=val
    })
    this.$root.Bus.$on('doTest2',(val)=>{
      console.log('doTest2')
      this.test2=val
    })
  },
  mounted(){
    // window.addEventListener('resize',this.foo())
    // console.log('document==',document.body.clientWidth)
  },
  data(){
    return{
      test:'',
      test2:'',
      showBar:false,
      parm:false,
      iconImg:require('@/assets/imgs/weixin.png'),
      listTitle:[
        {
          title:'应用中心',
          iconImg:require('@/assets/imgs/weixin.png'),
          subList:[
            {title:'hhhhhhhhhh0'},
            {title:'hhhhhhhhhh1'},
            {title:'hhhhhhhhhh2'},
            {title:'hhhhhhhhhh3'},
            {title:'hhhhhhhhhh4'},
          ]
        },
      ]
    }
  },
  mounted(){

  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    },
    logout() {
      this.$store.dispatch('LogOut',{token:this.token}).then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    },
  }
}
</script>


<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  position: fixed;
  width: 100%;
  z-index: 100;
  background-color: pink;
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .screenfull {
    position: absolute;
    right: 90px;
    top: 16px;
    color: red;
  }
  .avatar-container {
    float: right;
    height: 50px;
    display: inline-block;
    margin-right: 25px;
    /*position: absolute;*/
    .avatar-wrapper {
      cursor: pointer;
      /*margin-top: 5px;*/
      position: relative;
      .user-avatar {
        width: 40px;
        height: 40px;
        border-radius: 10px;
        vertical-align: middle;
      }
      .el-icon-caret-bottom {
        position: absolute;
        right: -20px;
        top: 25px;
        font-parm: 12px;
      }
    }
  }
  .nav_right{
    float: right;
  }
  .nav_icon:active,.avatar-wrapper {
    background: transparent;
  }
  .icon-var{
    /*display: none;*/
    font-size: 0;
  }
  .svg_bar{
    display: inline-block;
  }
  @media screen and (max-width: 600px) {
    .icon-var{
      font-size: 33px;
    }
  }
}
</style>
<style scoped>
  .hamburger {
    display: inline-block;
    cursor: pointer;
    width: 20px;
    height: 20px;
    transform: rotate(0deg);
    transition: .38s;
    transform-origin: 50% 50%;
  }

  .hamburger.is-active {
    transform: rotate(90deg);
  }
</style>

