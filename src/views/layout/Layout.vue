<template>
  <!--:class="{hideSidebar:!sidebar.opened}"-->
  <div class="app-wrapper" :class="classObj" style="height: 100%;">
    <!--<sidebar class="sidebar-container"></sidebar>-->

    <div class="main-container">
      <!--@showBar="showBar"-->
      <navbar></navbar>
      <app-main style="padding-top: 50px" class="app-main app_main_min" id="app-main"></app-main>
      <div class="sidebar_bar" style="z-index:10">
        <sidebar class="sidebar-container side-bar" id="sidebar"></sidebar>
      </div>
      <div class="draw_bg"></div>
    </div>
  </div>
</template>

<script>

import { Navbar, Sidebar, AppMain } from '@/views/layout/components'
import { mapGetters } from 'vuex'
import ResizeMixin from './mixin/ResizeHandler'
let screenWt;
/*window.addEventListener('resize', function () {
  screenWt=document.body.clientWidth;
  if(screenWt>900){
    document.getElementById('svg-bar').style.display="none"
  }else {
    document.getElementById('svg-bar').style.display="inline-block"
  }
});*/
export default {
  name: 'layout',
  mixins: [ResizeMixin],
  components: {
    Navbar,
    Sidebar,
    AppMain
  },
  computed: {
    ...mapGetters([
      'showSide'
    ]),
    sidebar() {
      return this.$store.state.app.sidebar
    },
    device() {
      return this.$store.state.app.device
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }

},
  data(){
    return{
      isShow:'',
      screenWt:window.screen.availWidth
    }
  },
  mounted(){
    this.isShow=this.showSide;

  },
  watch:{
    /*showSide(newVal,oldVal){
      if(newVal==true){
          // side-bar app-main

          document.getElementsByClassName('side-bar')[0].style.display='block'
          document.getElementsByClassName('app-main')[0].style.marginRight=180+'px'

      }else {
        document.getElementsByClassName('side-bar')[0].style.display='none'
        document.getElementsByClassName('app-main')[0].style.marginRight=0+'px'
      }
    }*/
  },
  methods:{
    // showBar(){
    //   let side=document.getElementById('sidebar').style.display;
    //   console.log("out1", document.getElementById('sidebar').style.display);
    //   if(side=='none'){
    //     document.getElementById('sidebar').style.display='block';
    //   }else {
    //     document.getElementById('sidebar').style.display='none';
    //   }
    //   console.log("out2",document.getElementById('sidebar').style.display)
    // }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
}
.sidebar_bar{
  position: fixed;
  height: 100%;
  right: 0;
  top: 0;
  /*border: 1px solid red;*/
  /*width: 200px;*/
  z-index: 0;
  background: #000;
  transform: rotate(0deg);
  transition: .38s;
}
.sidebar-container{
  /*height: calc(100% - 50px)!important;*/
}
.app-main{
  /*11.4 */
  /*margin-right: 180px;*/
}
@media screen and (max-width: 800px) {
  .side-bar{
    /*display: none;*/
  }
}
@media screen and (max-width: 800px) {
  .sidebar-container {
    /*display: none;*/
  }
  .side_bar{
    display: none;
  }
  .app_main_min{
    margin-right: 0 !important;
  }
}
  .draw_bg{
    position: absolute;
    background-color: #000;
    opacity: 0.3;
    z-index: 999;
  }
</style>
